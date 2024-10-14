import { FC, useEffect, useState } from "react";
import cls from './LoginPage.module.scss';
import Icon from "@/ui/Icon/Icon";
import Title from "@/ui/Title/Title";
import Text from "@/ui/Text/Text";
import Label from "@/ui/Label/Label";
import AuthInputField from "@/ui/AuthInputField/AuthInputField";
import { Link, useNavigate } from "react-router-dom";
import { useAuthMutation } from "@/store/api/auth.api";
import cn from 'classnames'
const LoginPage: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validEmail, setValidEmail] = useState(true);
    const [emailTouched, setEmailTouched] = useState(false);
    const navigate = useNavigate();
    // Вызов мутации для авторизации
    const [auth, { data, error, isLoading, isSuccess }] = useAuthMutation();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [ready, setReady] = useState(false);
    // Валидация email
    const validateEmail = (email: string) => {
        const expression =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return expression.test(String(email).toLowerCase());
    };

    // Валидация при изменении email
    useEffect(() => {
        if (emailTouched && !validateEmail(email) && email !== "") {
            setValidEmail(false);
        } else {
            setValidEmail(true);
        }
    }, [email, emailTouched]);

    // Обработчик изменения email
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailTouched(true); // отмечаем, что поле было изменено
    };

    // Обработчик нажатия на кнопку входа
    const handleButtonClick = () => {
        if (validEmail && password) {
            auth({ username: email, password });
        }
    };
    useEffect(() => {
        if (isSuccess && email && password && data.access_token.length > 0) { 
            navigate('/')
        }
    },[isSuccess, email, password, auth]);
    // Проверка ошибки авторизации и вывод сообщения
    useEffect(() => {
        if (error) {
            const err = error as { data?: { detail?: string } }; // Типизация ошибки
            const errorMessage = err?.data?.detail ? err.data.detail : 'Произошла неизвестная ошибка';
            setErrorMessage(errorMessage);
        }
    }, [error]);
    useEffect(() => {
        if(validEmail && password){
            setReady(true)
        }
        else{
            setReady(false)
        }
    }, [password, email])

    return (
        <div className={cls.loginpage}>
            <div className={cls.content}>
                <Icon id="logo" width={287} height={86} className={cls.logo} />
                <div className={cls.motto}>
                    <Title level="h1" className={cls.motto_title}>На волнах цифрового искусства</Title>
                    <Text type="t2" className={cls.motto_text}>
                        Сервис, который объединяет коллекционеров<br />
                        и творцов в цифровом мире.
                    </Text>
                </div>
            </div>
            <div className={cls.activity}>
                <div className={cls.login}>
                    <div className={cls.login_title}>
                        <Title level="h1" className={cls.title}>Войти в аккаунт</Title>
                        <Label type="l1" className={cls.subtitle}>Войдите в аккаунт и вдохновитесь новыми цифровым шедеврами</Label>
                    </div>
                    <div className={cls.inp_fields}>
                        <AuthInputField
                            type="email"
                            label="Почта"
                            placeholder="Введите вашу почту"
                            onChange={handleEmailChange}
                            error={!validEmail}
                            errorText="Поле заполнено неверно"
                        />
                        <AuthInputField
                            type="password"
                            label="Пароль"
                            placeholder="Введите ваш пароль"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cls.tools}>
                    <button className={cn(cls.submitBtn, {[cls.submitBtn_ready]:ready})} onClick={handleButtonClick} disabled={!ready}>
                        <Label type="l1m" className={cls.submit}>
                            {isLoading ? 'Загрузка...' : 'Войти'}
                        </Label>
                    </button>
                    {errorMessage && !isLoading && (
                        <Label type="l2" className={cls.error}>
                            {errorMessage}
                        </Label>
                    )}
                    <div className={cls.noAcc}>
                        <Label type="l2" className={cls.noAcc_text}>Eще нет аккаунта?</Label>
                        <Link to="/register" className={cls.noAcc_link}>Создать</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
