import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Button, { ButtonStyle } from '@/app/components/Button';

import styles from '@/modules/upload/components/NewUploadButton/styles.module.scss';

function NewUploadButton(): JSX.Element {
  const { t } = useTranslation();

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className={styles.share_container}>
      <Button style={ButtonStyle.GRADIENT} callback={handleReload} name={t('upload.link.new_upload')}>
        {t('upload.link.new_upload')}
      </Button>
    </div>
  );
}

export default NewUploadButton;
