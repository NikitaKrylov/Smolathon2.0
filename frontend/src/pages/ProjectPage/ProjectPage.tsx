import { FC } from 'react';
import cls from './ProjectPage.module.scss';
import Icon from '@/ui/Icon/Icon';
import Text from '@/ui/Text/Text';
import Title from '@/ui/Title/Title';
import Label from '@/ui/Label/Label';
import { useNavigate } from 'react-router-dom';
const ProjectPage: FC = () => {
	const navigate = useNavigate();
	return (
		<div className={cls.projectpage}>
			<div className={cls.header}>
				<Icon id="logo" width={116} height={40} className={cls.logo} />
				<Icon id="burger" width={48} height={48} className={cls.burger} />
			</div>
			<div className={cls.project}>
				<div className={cls.photo_wrap}>
					<img src="/img/project/main.png" className={cls.photo} />
					<div className={cls.photoBadge}>
						<Icon id="expand" width={16} height={16} className={cls.expand} />
					</div>
				</div>
				<div className={cls.project_info}>
					<div className={cls.main_info}>
						<div className={cls.text}>
							<div className={cls.namings}>
								<Title level="h3" className={cls.title}>
									Малая Венеция
								</Title>
								<Text type="t2" className={cls.subtitle}>
									Улица Зои Космедемьянской
								</Text>
							</div>
							<Icon id='like' width={35} height={35} className={cls.like} />
						</div>
						<div className={cls.badges}>
							<div className={cls.badge}>Генеративное искусство</div>
							<div className={cls.badge}>AI-generation</div>
							<div className={cls.badge}>Illustrator</div>
							<div className={cls.badge}>Procreate</div>
							<div className={cls.badge}>Photoshop</div>
						</div>
					</div>
					<div className={cls.description}>
						<Text type="t1" className={cls.title}>
							Описание работы
						</Text>
						<Text type="t1" className={cls.description_text}>
							В процессе создания работы я хотел передать ощущение умиротворения, которое испытываешь, гуляя по тихим улицам Венеции.
							Теплый свет заката окутывает улицы, создавая мягкие тени, а зажатые в посадках деревья и цветы добавляют живость и
							контраст в композицию. Звуки воды, переходящие в шепот кафе с нарастающими сложными ароматами свежесваренного кофе и
							выпечки, словно проникают сквозь холст, приглашая зрителя окунуться в уникальную атмосферу спокойствия и умиротворения.
						</Text>
					</div>
				</div>
				<div className={cls.author}>
					<div className={cls.authorCard} onClick={() => navigate('/passport')}>
						<div className={cls.authorInfo}>
							<img src="/img/project/author.png" className={cls.authorPhoto} />
							<div className={cls.authorText}>
								<Title level="h5" style={{ color: '#fff' }}>
									Тимофей Костров
								</Title>
								<Label type="l2" style={{ color: '#fff', opacity: '0.5' }}>
									@timkoskos
								</Label>
							</div>
						</div>
						<Icon id="arrowRight" width={24} height={24} />
					</div>
					<a className={cls.supportAuthor} href='https://www.tinkoff.ru/rm/kostrov.timofey10/uzk2o34106'>
						<Title level="h5" style={{ color: '#fff' }}>
							Поддержать автора
						</Title>
						<Icon id="finance" width={22} height={22} />
					</a>
				</div>
			</div>
			<div className={cls.others}>
				<Title level="h3" className={cls.title}>
                	Работы других художников
				</Title>
				<div className={cls.othersProjects}>
					<div className={cls.anotherProject}>
						<img src="/img/project/ap1.png" />
						<div className={cls.text}>
							<Text type="t2" className={cls.tag}>@mcvarenya</Text>
							<Label type="l1m" className={cls.name}>Туманный фейерверк</Label>
						</div>
					</div>
                    <div className={cls.anotherProject}>
						<img src="/img/project/ap2.png" />
						<div className={cls.text}>
							<Text type="t2" className={cls.tag}>@papajhon</Text>
							<Label type="l1m" className={cls.name}>Лонитотто</Label>
						</div>
					</div>
                    <div className={cls.anotherProject}>
						<img src="/img/project/ap3.png" />
						<div className={cls.text}>
							<Text type="t2" className={cls.tag}>@lyamus</Text>
							<Label type="l1m" className={cls.name}>Песочный замок</Label>
						</div>
					</div>
				</div>
				<button className={cls.others_btn}>
					<Title level="h4" className={cls.btn_text}>
						Смотреть все работы
					</Title>
					<Icon id="arrowRight" width={24} height={24} />
				</button>
			</div>
		</div>
	);
};

export default ProjectPage;
