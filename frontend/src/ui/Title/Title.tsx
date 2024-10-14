import { FC, HTMLAttributes } from 'react'
import cn from 'classnames'

import cls from './Title.module.scss'

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
	level: 'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Title: FC<TitleProps> = ({ level, className, children, ...props }) => {
	const TitleLevel = level === 'h0' ? 'h1' : level // 'h0' отображается как 'h1'

	return (
		<TitleLevel className={cn(cls.title,{ [cls.h0]: level === 'h0' }, className)} {...props}>
			{children}
		</TitleLevel>
	)
}

export default Title