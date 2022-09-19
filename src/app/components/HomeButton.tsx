import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import Button, { ButtonStyle } from '@/app/components/Button';

function HomeButton() {
  const handleBackToHome = useCallback(() => {
    window.location.href = '/';
  }, []);

  return (
    <div className={'homeButton'}>
      <Button style={ButtonStyle.WHITE} callback={handleBackToHome} name={'return to home'}>
        <FontAwesomeIcon icon={faHouse} />
      </Button>
    </div>
  );
}

export default HomeButton;
