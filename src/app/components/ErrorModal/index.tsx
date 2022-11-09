import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

import { useModal } from '@/app/providers/ModalProvider';
import { useUpload, UploadStatus } from '@/modules/upload/providers/UploadProvider';
import Button, { ButtonStyle } from '@/app/components/Button';
import errorSVG from '@/app/assets/svg/error.svg';

import styles from '@/app/components/ErrorModal/styles.module.scss';

function ErrorModal() {
  const { t } = useTranslation();
  const { isOpen, close } = useModal();
  const { setStatus, error } = useUpload();
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (el.current) {
      el.current.style.opacity = '1';
    }
  }, []);

  const handleRetry = () => {
    close();
    setStatus(UploadStatus.IDLE);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.backdrop} />

      <div ref={el} className={styles.modal_content}>
        <img src={errorSVG} alt={'error icon'} />

        <div>
          <div>
            <h4>{t('upload.errors.upload_failed.title')}</h4>
            <p>{t('upload.errors.upload_failed.description')}</p>
            {error && <p className={styles.error}>{t(error.message)}</p>}
          </div>

          <div className={styles.controls}>
            <Button callback={handleRetry} style={ButtonStyle.PRIMARY} name={t('upload.errors.upload_failed.retry')}>
              {t('upload.errors.upload_failed.retry')}
              <FontAwesomeIcon icon={faRotateRight} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
