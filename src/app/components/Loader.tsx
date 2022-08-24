import { Player } from '@lottiefiles/react-lottie-player';

import animation from '@/app/assets/lottie/loader.json';

function Loader() {
  return (
    <div className={'d-flex justify-center align-center'} style={{ width: '100vw', height: '100vh' }}>
      <Player autoplay loop src={animation} style={{ width: '128px', height: '128px' }} />
    </div>
  );
}

export default Loader;
