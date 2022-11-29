import { useState, useCallback } from 'react';

import infoIcon from '@/app/assets/svg/info.svg';

import styles from '@/app/components/EcoTooltip/styles.module.scss';

interface IProps {
  children: React.ReactNode;
}

function EcoTooltip({ children }: IProps): JSX.Element {
  const [isShown, setIsShown] = useState<boolean>(false);

  const handleMouseEnter = useCallback(() => {
    setIsShown(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsShown(false);
  }, []);

  return (
    <div className={styles.tooltip}>
      <img src={infoIcon} alt={'info tooltip icon'} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />

      <div style={{ display: isShown ? 'block' : 'none' }} className={styles.tooltipContent}>
        {children}
      </div>
    </div>
  );
}

export default EcoTooltip;
