import { FC, useState } from "react";
import cls from './Switcher.module.scss';

const Switcher: FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Творец');

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <div className={cls.swithcer}>
            <div 
                className={`${cls.category} ${selectedCategory === 'Творец' ? cls.active : ''}`} 
                onClick={() => handleCategoryClick('Творец')}
            >
                Творец
            </div>
            <div 
                className={`${cls.category} ${selectedCategory === 'Исследователь' ? cls.active : ''}`} 
                onClick={() => handleCategoryClick('Исследователь')}
            >
                Исследователь
            </div>
            <div 
                className={`${cls.category} ${selectedCategory === 'Бизнес' ? cls.active : ''}`} 
                onClick={() => handleCategoryClick('Бизнес')}
            >
                Бизнес
            </div>
        </div>
    );
};

export default Switcher;
