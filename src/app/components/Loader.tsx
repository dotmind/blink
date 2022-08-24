import { Player } from '@lottiefiles/react-lottie-player';

import animation from '@/app/assets/lottie/loader.json';

function Loader() {
  return <Player autoplay loop src={animation} style={{ width: '64px', height: '64px' }} />;
}

export default Loader;
