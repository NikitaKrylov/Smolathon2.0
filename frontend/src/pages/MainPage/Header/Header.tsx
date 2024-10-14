import { FC } from 'react';

import cls from './Header.module.scss';
import Icon from '@/ui/Icon/Icon';
import Title from '@/ui/Title/Title';
import { Link, useNavigate } from 'react-router-dom';
const Header: FC = () => {
	const navigate = useNavigate();
	return (
		<div className={cls.header}>
			<div className={cls.mainheader}>
				<Icon id='logo' width={192} height={84} className={cls.logo} />
				<div className={cls.searchField}>
					<input className={cls.searchInput} type="text" placeholder="Введите ваш запрос" />
					<Icon id="search" width={40} height={41} className={cls.searchIcon} />
				</div>
                <ul>
                    <li>Главная</li>
                    <li>Работы</li>
                    <li>События</li>
                    <li>Сообщества</li>
                </ul>
			</div>
			<button className={cls.authBtn} onClick={()=> navigate('/login')}>
				<Title level="h4" className={cls.authBtnText}>
					Войти
				</Title>
			</button>
		</div>
	);
};

export default Header;
