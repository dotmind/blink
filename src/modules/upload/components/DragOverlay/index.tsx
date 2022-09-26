import { useTranslation } from 'react-i18next';

import styles from '@/modules/upload/components/DragOverlay/styles.module.scss';

function DragOverlay() {
  const { t } = useTranslation();

  return (
    <div className={styles.overlay}>
      <div className={styles.overlayContent}>
        <h3>{t('upload.overlay.title')}</h3>
        <p>{t('upload.overlay.description')}</p>
      </div>
    </div>
  );
}

export default DragOverlay;
