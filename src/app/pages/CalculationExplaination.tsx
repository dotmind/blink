import { useTranslation } from 'react-i18next';

import Logo from '@/app/components/Logo';
import LangSwitcher from '@/app/components/LangSwitcher';
import Footer from '@/app/components/Footer';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import CircleWaves from '@/app/components/CircleWaves';
import useIsMobile from '@/app/hooks/useIsMobile';

function CalculationExplaination() {
  const { t } = useTranslation();
  const isMobile: boolean = useIsMobile();

  return (
    <>
      <div className={'page-container'}>
        <header className={'main-header'}>
          <Logo />
          {isMobile && <LangSwitcher />}
        </header>
        <div className={'safe'}>
          <h1 className={'title'}> {t('co2_impact.title')} </h1>
          <p>{t('co2_impact.text')}</p>
        </div>
      </div>
      <Footer />
      <AnimatedBackground />
      <CircleWaves />
    </>
  );
}

export default CalculationExplaination;
