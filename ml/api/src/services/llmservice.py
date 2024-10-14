import base64
import requests


from bs4 import BeautifulSoup
from langchain_community.chat_models.gigachat import GigaChat
from langchain.schema import HumanMessage, SystemMessage, AIMessage
from langchain.agents import AgentExecutor, create_gigachat_functions_agent
from langchain_core.tools import tool

from api.src.params import settings


credentials = f"{settings.client_id}:{settings.secret}"
auth = base64.b64encode(credentials.encode('utf-8')).decode('utf-8')

giga = GigaChat(credentials=settings.secret, verify_ssl_certs=False)


def extract_events_data():
    url = "https://gorodzovet.ru/smolensk/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    sections = soup.find_all('section')
    
    sections_data = {}
    for section in sections:
        section_title_element = section.find('h2')
        if not section_title_element:
            continue
        section_title = section_title_element.text.strip()
        
        events = section.find_all('div', class_='event-block')

        events_data = []
        for event in events:
            title_element = event.find('h3')
            date_element = event.find('div', class_='event-date')
            description_element = event.find('div', class_='lines lines4 mb-2')
            
            title = title_element.text.strip() if title_element else 'No Title Found'
            date = date_element.text.strip() if date_element else 'No Date Found'
            # description = description_element.text.strip() if description_element else 'No Description Found'
            
            events_data.append({'event': title, 'date': date})
        if events_data:
            sections_data[section_title] = events_data
        
    return sections_data

data = extract_events_data()

@tool
def smolensk_free_events() -> str:
    """Вывод информации по предстоящим бесплатным мероприятиям в Смоленске. Передает запрос пользователя, возвращает сокращенную афишу.\
    Полученный результат нужно обобщить и передать пользователю"""
    events = data['Бесплатные мероприятия: мероприятия в Смоленске']
    result = giga.invoke(f"Мероприятия в афише: {events}")
    return result.content

@tool
def smolensk_pop_events() -> str:
    """Вывод информации по предстоящим популярным мероприятиям в Смоленске. Передает запрос, возвращает выдачу агрегатора мероприятий.\
    Полученный результат нужно обобщить и передать пользователю"""
    events = data['Популярные мероприятия в Смоленске']
    result = giga.invoke(f"Мероприятия в афише: {events}")
    return result.content


@tool
def smolensk_culture_events() -> str:
    """Вывод информации по предстоящим культурным или мероприятиям в Смоленске. Передает запрос, возвращает выдачу агрегатора мероприятий.\
    Полученный результат нужно обобщить и передать пользователю"""
    events = data['Культура и искусство: мероприятия в Смоленске']
    result = giga.invoke(f"Мероприятия в афише: {events}")
    return result.content

class AIvasovskiyLLM:
    def __init__(self):
        self.history = [
            SystemMessage(content='Ты являешься нейросетью под названием "AIвазовский". С твоей помощью \
                мы стараемся сделать цифровое искусство в Смоленске доступным для всех. Ты вдохновляешь, \
                даешь идеи и помогаешь улучшить работы пользователя, независимо от уровня подготовки. Ты также можешь дать сведения по ближайшим мероприятиям в Смоленске \
                    и мотивировать людей принимать участие в активностях на сайте.'
            )
        ]
        self.tools = [smolensk_free_events, smolensk_pop_events, smolensk_culture_events]
        self.agent = create_gigachat_functions_agent(giga, self.tools)
        self.agent_executor = AgentExecutor(agent=self.agent, tools=self.tools, verbose=False, return_intermediate_steps=True)
    
    def generate(self, user_input):
        result = self.agent_executor.invoke(
            {
                "chat_history": self.history,
                "input": user_input,
            }
        )
        
        model_output = result['output']
        agent_response = result.get('intermediate_steps', None)
        
        if agent_response != []:
            model_output += f"\n{agent_response[-1][-1]}"
        else:
            self.history.append(HumanMessage(content=user_input))
            self.history.append(AIMessage(content=result['output']))
            
        return model_output
        