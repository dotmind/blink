import { lazy } from 'react';

import useIsMobile from '@/app/hooks/useIsMobile';
import UploadProvider from '@/modules/upload/providers/UploadProvider';
import TabSelector from '@/app/components/TabSelector';
import Footer from '@/app/components/Footer';
import InstallPwa from '@/app/components/InstallPwa';
import CircleWaves from '@/app/components/CircleWaves';
import Logo from '@/app/components/Logo';
import LangSwitcher from '@/app/components/LangSwitcher';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import ModalProvider from '@/app/providers/ModalProvider';
import ErrorModal from '@/app/components/ErrorModal';
import HomeTitles from '@/app/components/HomeTitles';
import Drawer from '@/app/components/Drawer';

const History = lazy(() => import('@/app/components/History'));
const Upload = lazy(() => import('@/modules/upload/components/Upload'));
const About = lazy(() => import('@/app/components/About'));

function Home() {
  const isMobile: boolean = useIsMobile();

  return (
    <ModalProvider>
      <UploadProvider>
        <div className={'page-container'}>
          <header className={'main-header'}>
            <Logo />
            {isMobile && <LangSwitcher />}
          </header>
          <div className={'d-flex flex-column align-center grow'}>
            <HomeTitles />
            <TabSelector options={['home.tabs.history', 'home.tabs.upload', 'home.tabs.about']}>
              <History />
              <Upload />
              <About />
            </TabSelector>
          </div>
        </div>
        <Footer />
        <InstallPwa />
        <AnimatedBackground />
        <CircleWaves />
        <ErrorModal />
        <Drawer />
      </UploadProvider>
    </ModalProvider>
  );
}

export default Home;
