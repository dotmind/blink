import { ReactNode } from 'react';

import styles from '@/app/components/ModalFrame/styles.module.scss';

interface IProps {
  children: ReactNode;
  title: string;
  image: string;
}

function ModalFrame({ children, title, image }: IProps) {
  return (
    <div className={styles.modal_frame}>
      <img src={image} alt={'Paragraph illustration'} />

      <div className={styles.paragraph}>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
    </div>
  );
}

export default ModalFrame;
