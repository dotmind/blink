import { useTranslation } from 'react-i18next';

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

function Home() {
  const { t } = useTranslation();

  return (
    <UploadProvider>
      <div className={'page-container'}>
        <header className={'p-2'}>
          <Logo />
        </header>
        <div className={'d-flex flex-column align-center grow'}>
          <h1> {t('home.title')} </h1>
          <p> {t('home.subtitle')} </p>
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
