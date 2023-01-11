import FileViewer from '@/modules/download/components/FileViewer';
import CircleWaves from '@/app/components/CircleWaves';
import InstallPwa from '@/app/components/InstallPwa';
import Footer from '@/app/components/Footer';
import useIsMobile from '@/app/hooks/useIsMobile';
import Download from '@/modules/download/components/Download';
import FileHead from '@/modules/download/components/FileHead';
import AnimatedBackground from '@/app/components/AnimatedBackground';

function Preview() {
  const isMobile = useIsMobile();

  return (
    <>
      <FileHead />
      <FileViewer />
      <Footer>{!isMobile && <Download />}</Footer>
      <InstallPwa />
      <AnimatedBackground />
      <CircleWaves />
    </>
  );
}

export default Preview;
