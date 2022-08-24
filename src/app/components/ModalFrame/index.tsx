import { ReactNode, useEffect, useRef } from 'react';

import styles from '@/app/components/ModalFrame/styles.module.scss';

interface IProps {
  children: ReactNode;
  title: string;
  image: string;
}

function ModalFrame({ children, title, image }: IProps) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (el.current) {
      el.current.style.opacity = '1';
    }

    return () => {
      if (el.current) {
        el.current.style.opacity = '0';
      }
    };
  }, [el]);

  return (
    <div ref={el} className={styles.modal_frame}>
      <img src={image} alt={'Paragraph illustration'} />

      <div className={styles.paragraph}>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
    </div>
  );
}

export default ModalFrame;
