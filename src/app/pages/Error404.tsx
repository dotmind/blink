import NotFound from '@/app/components/NotFound';
import Footer from '@/app/components/Footer';
import InstallPwa from '../components/InstallPwa';
import CircleWaves from '../components/CircleWaves';

function Error404() {
  return (
    <>
      <InstallPwa />
      <NotFound />
      <CircleWaves />
      <Footer />
    </>
  );
}

export default Error404;
