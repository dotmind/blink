import { ReactNode } from 'react';

import styles from '@/app/components/Tooltip/styles.module.scss';

interface IProps {
  children: ReactNode;
}

function Tooltip({ children }: IProps) {
  return <div className={styles.tooltip}>{children}</div>;
}

export default Tooltip;
