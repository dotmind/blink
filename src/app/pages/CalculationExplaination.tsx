import { useTranslation } from 'react-i18next';

import Logo from '@/app/components/Logo';
import LangSwitcher from '@/app/components/LangSwitcher';
import Footer from '@/app/components/Footer';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import CircleWaves from '@/app/components/CircleWaves';
import useIsMobile from '@/app/hooks/useIsMobile';
import EcoImpactTable from '@/app/components/EcoImpactTable';

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
          <div className={'text-center'}>
            <h1 className={'title'}>{t('co2_impact.title')}</h1>
            <p className={'subtitle'}>{t('co2_impact.subtitle')}</p>
          </div>
          <div>
            <div className={'mobile-overflow'}>
              <EcoImpactTable />
            </div>
            <p className={'text-center'}>
              {t('co2_impact.source')}
              <a href={'https://www.impactco2.fr/usagenumerique/email'} target={'_blank'} rel={'noreferrer'}>
                www.impactco2.fr/usagenumerique/email
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <AnimatedBackground />
      <CircleWaves />
    </>
  );
}

export default CalculationExplaination;
