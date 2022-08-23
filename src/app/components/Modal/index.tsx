import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from '@/app/components/Modal/styles.module.scss';
import { useModal } from '@/app/providers/ModalProvider';

interface IProps {
  children: ReactNode;
}

function Modal({ children }: IProps) {
  const { isOpen, close } = useModal();

  return (
    <div className={styles.modal} data-isopen={isOpen}>
      <div className={styles.backdrop} />

      <button className={styles.closeModal} onClick={close} type={'button'}>
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <div className={styles.modal_content}>{children}</div>
    </div>
  );
}

export default Modal;
