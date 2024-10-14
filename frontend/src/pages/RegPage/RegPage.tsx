import { FC, useState } from 'react';

import cls from './RegPage.module.scss';
import Icon from '@/ui/Icon/Icon';
import Text from '@/ui/Text/Text';
import Title from '@/ui/Title/Title';
import StageBadge from '@/ui/StageBadge/StageBadge';
import Label from '@/ui/Label/Label';
import Step1 from './Creator/Step1/Step1';
const RegPage: FC = () => {
    const [step, setStep] = useState<number>(1);
    const renderSteps = (step: number) => {
        switch (step) {
            case 1:
                return <Step1 />;
            default:
                return <Step1 />;
        }
    }
	return (
		<div className={cls.regpage}>
			<div className={cls.leftside}>
				<div className={cls.content}>
					<div className={cls.motto_wrap}>
						<Icon id="logo" width={192} height={84} className={cls.logo} />
						<div className={cls.motto}>
							<Title level="h1" className={cls.motto_title}>
                                Погрузись в цифровое искусство
							</Title>
							<Text type="t2" className={cls.motto_text}>
                                Создай  мост между воображением <br />
                                и действительностью
							</Text>
						</div>
					</div>
					<div className={cls.stageViewer}>
                        <StageBadge number={1} text="Заполни поля регистрации" active={true} />
                        <StageBadge number={2} text="Выбери предпочтения" active={false} />
                        <StageBadge number={3} text="Начни пользоваться платформой" active={false} />
                    </div>
				</div>
			</div>
            <div className={cls.rightside}>
                {renderSteps(step)}
                <div className={cls.tools}>
                    <button className={cls.submitBtn} >
                        <Label type="l1m" className={cls.submit}>
                            Далее
                        </Label>
                    </button>
                </div>
            </div>
		</div>
	);
};

export default RegPage;
