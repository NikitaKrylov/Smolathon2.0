import { FC } from 'react';
import cls from './Step1.module.scss';
import Label from '@/ui/Label/Label';
import Title from '@/ui/Title/Title';
import AuthInputField from '@/ui/AuthInputField/AuthInputField';
import { useAppDispatch } from '@/hooks/useAppStore';
import { actions } from '@/store/user/user.slice.ts';
import Switcher from '@/ui/Switcher/Switcher';

const Step1: FC = () => {
    const dispatch = useAppDispatch();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setEmail(e.target.value)); // Отправляем новое значение email
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setPassword(e.target.value)); // Отправляем новое значение пароля
    };
    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setFullName(e.target.value)); // Отправляем новое значение пароля
    };
    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setAge(Number(e.target.value))); // Отправляем новое значение пароля
    };
    return (
        <div className={cls.register}>
            <div className={cls.login_title}>
                <Title level="h1" className={cls.title}>
                    Создать аккаунт
                </Title>
                <Label type="l1" className={cls.subtitle}>
                    Создайте аккаунт и приоткройте завесу цифровых шедевров
                </Label>
            </div>
            <div className={cls.inp_fields}>
                <Switcher/>
                <AuthInputField
                    type='text'
                    label='ФИО'
                    placeholder='Введите ваше ФИО'
                    onChange={handleFullNameChange}
                />
                <AuthInputField
                    type='text'
                    label='Возраст'
                    placeholder='Введите ваш возраст'
                    onChange={handleAgeChange}
                />
                <AuthInputField
                    type="email"
                    label="Почта"
                    placeholder="Введите вашу почту"
                    onChange={handleEmailChange}
                />
                <AuthInputField
                    type="password"
                    label="Пароль"
                    placeholder="Введите ваш пароль"
                    onChange={handlePasswordChange}
                />
            </div>
        </div>
    );
};

export default Step1;
