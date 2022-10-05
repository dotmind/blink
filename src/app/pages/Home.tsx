import UploadProvider from '@/modules/upload/providers/UploadProvider';
import Upload from '@/modules/upload/components/Upload';
import About from '@/app/components/About';
import Footer from '@/app/components/Footer';
import InstallPwa from '@/app/components/InstallPwa';
import CircleWaves from '@/app/components/CircleWaves';
import AnimatedBackground from '@/app/components/AnimatedBackground';

function Home() {
  return (
    <UploadProvider>
      <Upload />
      <About />
      <Footer />
      <InstallPwa />
      <CircleWaves />
      <AnimatedBackground />
    </UploadProvider>
  );
}

export default Home;
