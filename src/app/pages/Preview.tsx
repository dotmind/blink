import FileViewer from '@/modules/download/components/FileViewer';
import CircleWaves from '@/app/components/CircleWaves';
import InstallPwa from '@/app/components/InstallPwa';
import Footer from '@/app/components/Footer';
// import useIsMobile from '@/app/hooks/useIsMobile';
// import Download from '@/modules/download/components/Download';
import FileHead from '@/modules/download/components/FileHead';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import DownloadProvider from '@/modules/download/providers/DownloadProvider';

function Preview() {
  return (
    <DownloadProvider>
      <FileHead />
      <FileViewer />
      <Footer />
      <InstallPwa />
      <AnimatedBackground />
      <CircleWaves />
    </DownloadProvider>
  );
}

export default Preview;
