import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import cls from './Text.module.scss';
interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
	type: 't1' | 't2';
}
const Text: FC<TextProps> = ({ className, children, type, ...props }) => {
	return (
		<p
			className={cn(
				cls.text,
				{
					[cls.t1]: type === 't1', // Применение стилей для t1
					[cls.t2]: type === 't2' // Применение стилей для t2
				},
				className
			)}
			{...props}
		>
			{children}
		</p>
	);
};

export default Text;
