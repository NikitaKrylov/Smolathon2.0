import { FC } from "react";
import cn from 'classnames'
import cls from './StageBadge.module.scss';
import Label from "../Label/Label";
interface StageBadgeProps {
    number: number
    text: string
    active: boolean
}
const StageBadge: FC<StageBadgeProps> = ({number, text, active = false}) => {
    return (
        <div className={cn(cls.stageBadge , {[cls.active]: active})}>
            <div className={cn(cls.number, {[cls.active_number]: active})}>
                <Label type="l1" className={cn(cls.label, {[cls.active_label]: active})}>{number}</Label>
            </div>
            <Label type="l1m" className={cn(cls.text, {[cls.active_text]: active})}>{text}</Label>
        </div>
    );
};
export default StageBadge