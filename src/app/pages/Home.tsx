import { useTranslation } from 'react-i18next';

import useIsMobile from '@/app/hooks/useIsMobile';
import useWindowSize from '@/app/hooks/useWindowSize';
import UploadProvider from '@/modules/upload/providers/UploadProvider';
import Upload from '@/modules/upload/components/Upload';
import About from '@/app/components/About';
import TabSelector from '@/app/components/TabSelector';
import Footer from '@/app/components/Footer';
import InstallPwa from '@/app/components/InstallPwa';
import CircleWaves from '@/app/components/CircleWaves';
import History from '@/app/components/History';
import Logo from '@/app/components/Logo';
import LangSwitcher from '@/app/components/LangSwitcher';

function Home() {
  const { t } = useTranslation();
  const isMobile: boolean = useIsMobile();
  const { height } = useWindowSize();

  return (
    <UploadProvider>
      <div className={'page-container'} style={{ height }}>
        <header className={'main-header'}>
          <Logo />
          {isMobile && <LangSwitcher />}
        </header>
        <div className={'d-flex flex-column align-center grow'}>
          <div className={'safe text-center'}>
            <h1 className={'title'}> {t('home.title')} </h1>
            <p className={'subtitle'}> {t('home.subtitle')} </p>
          </div>
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
    </UploadProvider>
  );
}

export default Home;
