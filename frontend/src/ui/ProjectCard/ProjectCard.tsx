import { FC } from 'react';

import cls from './ProjectCard.module.scss';

import Title from '@/ui/Title/Title';
import Label from '../Label/Label';
interface ProjectCardProps {
	title: string;
	creator: string;
	badges: string[];
	img: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ title, creator, badges, img }) => {
	return (
		<div className={cls.card}>
			<img src={`https://open-your-smolensk.ru/api/${img}`} className={cls.photo}/>
			<div className={cls.info}>
				<div className={cls.text}>
					<Label type="l1" className={cls.creator}>
						{creator}
					</Label>
					<Title level="h4" className={cls.title}>
						{title}
					</Title>
				</div>
				<div className={cls.badges}>
					{badges.map((badge, index) => (
						<div key={index} className={cls.badge}>
							{badge}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
