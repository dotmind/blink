import { ReactNode } from 'react';

import styles from '@/app/components/Tooltip/styles.module.scss';

export enum TooltipPosition {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

interface IProps {
  children: ReactNode;
  position: TooltipPosition;
}

function Tooltip({ children, position }: IProps) {
  return (
    <div className={styles.tooltip} data-position={position}>
      {children}
    </div>
  );
}

export default Tooltip;
