import { ReactNode } from 'react';

import styles from '@/app/components/Tooltip/styles.module.scss';

export enum TooltipPosition {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  topLeft = 'top-left',
  topRight = 'top-right',
  bottomLeft = 'bottom-left',
  bottomRight = 'bottom-right',
}

interface IProps {
  children: ReactNode;
  position: TooltipPosition;
}

function Tooltip({ children, position }: IProps) {
  return (
    <div className={`${styles.tooltip} fade-in d-500`} data-position={position}>
      {children}
    </div>
  );
}

export default Tooltip;
