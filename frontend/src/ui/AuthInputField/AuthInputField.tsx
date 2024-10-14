import { FC } from "react";
import Label from '@/ui/Label/Label';
import cls from "./AuthInputField.module.scss";
import cn from 'classnames'
interface AuthInputFieldProps {
    type: string;
    label: string;
    placeholder: string;
    error?: boolean;
    errorText?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthInputField: FC<AuthInputFieldProps> = ({
    type,
    label,
    placeholder,
    onChange,
    error,
    errorText
}) => {
    return (
        <div className={cls.input_field}>
            <Label type="l1" className={cls.label}>{label}</Label>
            <input type={type} className={cn(cls.input, {[cls.err_inp]: error})} placeholder={placeholder} onChange={onChange}/> 
            {error && <Label type="l2" className={cls.error}>{errorText}</Label>}
        </div>
    );
};

export default AuthInputField;