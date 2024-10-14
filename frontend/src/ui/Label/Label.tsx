import { FC, HTMLAttributes } from 'react'
import cn from 'classnames'

import styles from './Label.module.scss'

interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
    type: 'l1m' | 'l1' | 'l2' | 'l2m' | 'l3m'  // Все возможные типы
}

const Label: FC<LabelProps> = ({ type, className, children, ...props }) => {
    return (
        <span
            className={cn(
                styles.label,        // Общие стили для всех текстовых элементов
                {
                    [styles.l1m]: type === 'l1m',
                    [styles.l1]: type === 'l1',
                    [styles.l2]: type === 'l2',
                    [styles.l2m]: type === 'l2m',
                    [styles.l3m]: type === 'l3m',
                },
                className            // Дополнительные классы
            )}
            {...props}
        >
            {children}
        </span>
    )
}

export default Label
