import { Player } from '@lottiefiles/react-lottie-player';

import animation from '@/app/assets/lottie/success-confetti.json';

function SuccessConfetti(): JSX.Element {
  return (
    <div className={'success-confetti'}>
      <Player keepLastFrame autoplay src={animation} style={{ width: '404px', height: '404px' }} />
    </div>
  );
}

export default SuccessConfetti;
