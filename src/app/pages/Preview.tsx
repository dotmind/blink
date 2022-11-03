import DownloadProvider from '@/modules/download/providers/DownloadProvider';
import FileViewer from '@/modules/download/components/FileViewer';
import CircleWaves from '@/app/components/CircleWaves';
import InstallPwa from '@/app/components/InstallPwa';
import Footer from '@/app/components/Footer';
import useIsMobile from '@/app/hooks/useIsMobile';
import Download from '@/modules/download/components/Download';
import FileHead from '@/modules/download/components/FileHead';

function Preview() {
  const isMobile = useIsMobile();

  return (
    <DownloadProvider>
      <FileHead />
      <FileViewer />
      <CircleWaves />
      <Footer>{!isMobile && <Download />}</Footer>
      <InstallPwa />
    </DownloadProvider>
  );
}

export default Preview;
