import { FC } from "react";

import cls from './Badge.module.scss';
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    
}
const Badge: FC<BadgeProps> = ({ children }) => {
    return (
        <div className={cls.badge}>
            {children}
        </div>
    )
}
export default Badge