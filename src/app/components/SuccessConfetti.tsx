import { useEffect, useRef } from 'react';
import party from 'party-js';

function SuccessConfetti(): JSX.Element {
  const divRef = useRef(null);

  useEffect(() => {
    if (!divRef.current) {
      return;
    }

    party.confetti(divRef.current, {
      count: party.variation.range(20, 40),
    });
  }, []);

  return <div ref={divRef} className={'success-confetti'} />;
}

export default SuccessConfetti;
