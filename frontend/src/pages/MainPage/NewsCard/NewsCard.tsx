import { FC } from 'react';
import Title from '@/ui/Title/Title';
import Label from '@/ui/Label/Label';
import cls from './NewsCard.module.scss';
interface NewsCardProps {
	img: string;
	title: string;
	desription: string;
    badges: string[];
}
const NewsCard: FC<NewsCardProps> = ({ img, title, desription, badges }) => {
	return (
		<div className={cls.card}>
			<div className={cls.info}>
				<div className={cls.text}>
					<Title level="h3" className={cls.title}>
						{title}
					</Title>
					<Label type="l1" className={cls.desription}>
						{desription}
					</Label>
				</div>
                <div className={cls.badges}>
                {badges.map((badge, index) => (
                        <div key={index} className={cls.badge}>
                            {badge}
                        </div>
                ))}
               </div>
			</div>
			<img src={img} width={173} height={118} style={{ borderRadius: '16px' }} />
		</div>
	);
};
export default NewsCard;
