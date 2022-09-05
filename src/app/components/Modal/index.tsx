import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from '@/app/components/Modal/styles.module.scss';
import { useModal } from '@/app/providers/ModalProvider';

interface IProps {
  children: ReactNode;
}

function Modal({ children }: IProps) {
  const { isOpen, close } = useModal();
  const { t } = useTranslation();

  return (
    <div className={styles.modal} data-isopen={isOpen || false}>
      <div className={styles.backdrop} />

      <button className={styles.closeModal} onClick={close} type={'button'} name={t('modal.close')}>
        <FontAwesomeIcon icon={faXmark} />
      </button>

      {children}
    </div>
  );
}

export default Modal;
