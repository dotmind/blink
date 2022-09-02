import { useMemo } from 'react';

import DownloadProvider from '@/modules/download/providers/DownloadProvider';
import FileViewer from '@/modules/download/components/FileViewer';
import CircleWaves from '@/app/components/CircleWaves';
import InstallPwa from '@/app/components/InstallPwa';
import Footer from '@/app/components/Footer';
import About from '@/app/components/About';
import useIsMobile from '@/app/hooks/useIsMobile';
import Download from '@/modules/download/components/Download';

function Preview() {
  const isMobile = useIsMobile();

  const renderAbout = useMemo(() => {
    if (!isMobile) {
      return null;
    }

    return <About />;
  }, [isMobile]);

  return (
    <DownloadProvider>
      <FileViewer />
      <CircleWaves />
      {renderAbout}
      <Footer>
        <Download />
      </Footer>
      <InstallPwa />
    </DownloadProvider>
  );
}

export default Preview;
