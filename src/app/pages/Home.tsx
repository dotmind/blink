import UploadProvider from '@/modules/upload/providers/UploadProvider';
import Upload from '@/modules/upload/components/Upload';
import About from '@/app/components/About';
import Footer from '@/app/components/Footer';
import InstallPwa from '@/app/components/InstallPwa';

function Home() {
  return (
    <UploadProvider>
      <Upload />
      <About />
      <Footer />
      <InstallPwa />
    </UploadProvider>
  );
}

export default Home;
