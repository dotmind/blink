import { useTranslation } from 'react-i18next';

import useIsMobile from '@/app/hooks/useIsMobile';
import UploadProvider from '@/modules/upload/providers/UploadProvider';
import Upload from '@/modules/upload/components/Upload';
import About from '@/app/components/About';
import TabSelector from '@/app/components/TabSelector';
import Footer from '@/app/components/Footer';
import InstallPwa from '@/app/components/InstallPwa';
import CircleWaves from '@/app/components/CircleWaves';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import History from '@/app/components/History';
import Logo from '@/app/components/Logo';
import LangSwitcher from '@/app/components/LangSwitcher';

function Home() {
  const { t } = useTranslation();
  const isMobile: boolean = useIsMobile();

  return (
    <UploadProvider>
      <div className={'page-container'}>
        <header className={'main-header'}>
          <Logo />
          {isMobile && <LangSwitcher />}
        </header>
        <div className={'d-flex flex-column align-center grow'}>
          <h1 className={'title'}> {t('home.title')} </h1>
          <p className={'subtitle'}> {t('home.subtitle')} </p>
          <TabSelector options={['home.tabs.history', 'home.tabs.upload', 'home.tabs.about']}>
            <History />
            <Upload />
            <About />
          </TabSelector>
        </div>
      </div>
      <Footer />
      <InstallPwa />
      <CircleWaves />
      <AnimatedBackground />
    </UploadProvider>
  );
}

export default Home;
