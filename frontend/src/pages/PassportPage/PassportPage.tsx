import { FC } from 'react';
import cls from './PassportPage.module.scss';
import Icon from '@/ui/Icon/Icon';
import Badge from '@/ui/Badge/Badge';
import Title from '@/ui/Title/Title';
import Label from '@/ui/Label/Label';
import { useNavigate } from 'react-router-dom';
const PassportPage: FC = () => {
	const navigate = useNavigate();
	return (
		<div className={cls.passportpage}>
			<div className={cls.header}>
				<Icon id="logo" width={116} height={40} className={cls.logo} />
				<Icon id="burger" width={48} height={48} className={cls.burger} />
			</div>
			<div className={cls.profile}>
				<div className={cls.info}>
					<div className={cls.top}>
                        <img src='/img/project/author.png' className={cls.photo}/>
                        <img src='/img/pasport/verify.svg' className={cls.icon} />
                        <div className={cls.info}>
                            <div className={cls.block}>
                                <Title level='h4' className={cls.number}>8</Title>
                                <Label type="l2" className={cls.text}>Работ</Label>
                            </div>
                            <div className={cls.block}>
                                <Title level='h4' className={cls.number}>1129</Title>
                                <Label type="l2" className={cls.text}>Подписчики</Label>
                            </div>
                            <div className={cls.block}>
                                <Title level='h4' className={cls.number}>3</Title>
                                <Label type="l2" className={cls.text}>Локации</Label>
                            </div>
                        </div>
                    </div>
					<div className={cls.mid}>
                        <Title level="h3" className={cls.name}>
                             Тимофей Костров
                        </Title>
                        <Label type="l1" className={cls.tag}>@timkoskos</Label>
                        <div className={cls.heartBadge}></div>
                    </div>
					<div className={cls.bottom}>
						Искусство — это не просто отражение реальности,<br/> а возможность создать мир, где мечты и фантазии сливаются в одно целое
					</div>
				</div>
				<div className={cls.activeBtns}>
					<div className={cls.rowBtns}>
						<button className={cls.btn1}>Подписаться</button>
						<button className={cls.btn2}>Написать</button>
					</div>
					<a className={cls.supportAuthor} href='https://www.tinkoff.ru/rm/kostrov.timofey10/uzk2o34106'>
						<Title level="h5" style={{ color: '#fff' }}>
							Поддержать автора
						</Title>
						<Icon id="finance" width={22} height={22} />
					</a>
				</div>
			</div>
			<div className={cls.interests}>
				<div className={cls.block}>
					<h3 className={cls.title}>Интересы</h3>
					<div className={cls.badges}>
						<Badge>Генеративное искусство</Badge>
						<Badge>AI-generation</Badge>
						<Badge>Анимация</Badge>
						<Badge>Цифровая живопись</Badge>
						<Badge>AR/VR</Badge>
					</div>
				</div>
				<div className={cls.block}>
					<h3 className={cls.title}>Инструменты</h3>
					<div className={cls.badges}>
						<Badge>
							<img src="/img/pasport/ai.svg" width={8} height={8} />
							Illustrator
						</Badge>
						<Badge>
							<img src="/img/pasport/blender.svg" width={8} height={8} />
							Blender
						</Badge>
						<Badge>
							<img src="/img/pasport/ps.svg" width={8} height={8} />
							Procreate
						</Badge>
						<Badge>
							<img src="/img/pasport/figma.svg" width={8} height={8} />
							Figma
						</Badge>
						<Badge>
							<img src="/img/pasport/ae.svg" width={8} height={8} />
							After Effects
						</Badge>
					</div>
				</div>
			</div>
			<div className={cls.projects}>
				<Title level="h3" className={cls.title}>
					Работы
				</Title>
				<div className={cls.cardsgrid}>
					<img src="/img/pasport/1.png" onClick={() => navigate('/project')}/>
					<img src="/img/pasport/2.png" onClick={() => navigate('/project')}/>
					<img src="/img/pasport/3.png" onClick={() => navigate('/project')}/>
					<img src="/img/pasport/4.png" onClick={() => navigate('/project')}/>
					<img src="/img/pasport/5.png" onClick={() => navigate('/project')}/>
					<img src="/img/pasport/6.png" onClick={() => navigate('/project')}/>
					<img src="/img/pasport/7.png" onClick={() => navigate('/project')}/>
					<img src="/img/pasport/8.png" onClick={() => navigate('/project')}/>
				</div>
			</div>
		</div>
	);
};

export default PassportPage;
