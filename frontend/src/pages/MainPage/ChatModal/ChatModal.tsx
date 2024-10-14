import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ChatModal.module.scss';
import Icon from '@/ui/Icon/Icon';

interface ChatMessage {
	sender: 'user' | 'bot';
	text?: string;
	image?: string;
}

interface ChatModalProps {
	onClick: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ onClick }) => {
	const [messages, setMessages] = useState<ChatMessage[]>([
		{
			sender: 'bot',
			text: 'Приветствую! Я — ваш виртуальный помощник, созданный, чтобы сделать ваше взаимодействие на платформе гладким и вдохновляющим. Если у вас есть вопросы о цифровом искусстве, креативной экономике или вы просто хотите пообщаться, я всегда готов помочь. Давайте вместе открывать новые горизонты творчества!'
		}
	]);
	const [inputValue, setInputValue] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [chatId, setChatId] = useState<number | null>(null);
	const [mode, setMode] = useState<'llm' | 'images'>('llm');

	// Инициализация чата при монтировании компонента
	useEffect(() => {
		const initializeChat = async () => {
			try {
				const response = await axios.post(`https://open-your-smolensk.ru/ml/v1/ml/llm/initializechat?user_id=1`);
				setChatId(response.data.chat_id);
			} catch (error) {
				console.error('Ошибка при инициализации чата:', error);
			}
		};

		initializeChat();
	}, []);

	const handleSendMessage = async () => {
		if (!inputValue.trim() || chatId === null) return;

		const userMessage: ChatMessage = { sender: 'user', text: inputValue };
		setMessages((prevMessages) => [...prevMessages, userMessage]);

		setInputValue('');
		setIsLoading(true);

		if (mode === 'images') {
			try {
				const response = await axios.post('https://open-your-smolensk.ru/ml/v1/ml/images/generate', {
					text: inputValue
				});

				const botMessage: ChatMessage = {
					sender: 'bot',
					image: `data:image/jpeg;base64,${response.data.images[0]}`
				};
				setMessages((prevMessages) => [...prevMessages, botMessage]);
			} catch (error) {
				const botMessage: ChatMessage = {
					sender: 'bot',
					text: 'Произошла ошибка, попробуйте снова.'
				};
				setMessages((prevMessages) => [...prevMessages, botMessage]);
			} finally {
				setIsLoading(false);
			}
		} else {
			try {
				const response = await axios.post('https://open-your-smolensk.ru/ml/v1/ml/llm/chat?user_id=1', {
					text: inputValue
				});

				const botMessage: ChatMessage = {
					sender: 'bot',
					text: response.data.message
				};
				setMessages((prevMessages) => [...prevMessages, botMessage]);
			} catch (error) {
				const botMessage: ChatMessage = {
					sender: 'bot',
					text: 'Произошла ошибка, попробуйте снова.'
				};
				setMessages((prevMessages) => [...prevMessages, botMessage]);
			} finally {
				setIsLoading(false);
			}
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSendMessage();
		}
	};

	return (
		<div className={styles.chatModal}>
			<button className={styles.closeButton} onClick={onClick}>
				✕
			</button>

			<Icon id="logo2" width={116} height={40} className={styles.logo} />
			<div className={styles.chatBody}>
				{messages.map((message, index) => (
					<div key={index} className={`${styles.chatMessage} ${message.sender === 'user' ? styles.userMessage : styles.botMessage}`}>
						{message.text && <p>{message.text}</p>}
						{message.image && <img src={message.image} alt="Ответ бота" />}
					</div>
				))}
				{isLoading && <div className={`${styles.chatMessage} ${styles.botMessage}`}>Бот печатает...</div>}
			</div>
			<div className={styles.chatFooter}>
				<button className={styles.sendButton} onClick={() => setMode(mode === 'llm' ? 'images' : 'llm')}>
					Сменить режим <br /> (текущий: {mode})
				</button>
				<input
					type="text"
					placeholder="Напишите ваш запрос"
					value={inputValue}
					className={styles.inp}
					onChange={handleInputChange}
					onKeyPress={handleKeyPress}
					disabled={isLoading || chatId === null}
				/>
				<button onClick={handleSendMessage} disabled={isLoading || chatId === null} className={`${styles.sendButton} ${isLoading ? styles.buttonDisabled : ''}`}>
					Отправить
				</button>
			</div>
		</div>
	);
};

export default ChatModal;
