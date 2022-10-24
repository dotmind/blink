import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Button, { ButtonStyle } from '@/app/components/Button';
import { useUpload } from '@/modules/upload/providers/UploadProvider';
import { canUseNativeShare, nativeShare } from '@/app/services/navigator';
import ShareIcon from '@/app/assets/svg/share_white.svg';

import styles from '@/modules/upload/components/ShareButtons/styles.module.scss';

function ShareButtons(): JSX.Element {
  const { shareUrl } = useUpload();
  const { t } = useTranslation();
  const handleShare: () => Promise<void> = useCallback(() => nativeShare(shareUrl as string), [shareUrl]);

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className={styles.share_container}>
      {canUseNativeShare() && (
        <Button style={ButtonStyle.SECONDARY} callback={handleShare} name={t('upload.link.share')}>
          {t('upload.link.share')} <img className={'icons'} src={ShareIcon} alt={t('upload.link.share')} />
        </Button>
      )}
      <Button style={ButtonStyle.GRADIENT} callback={handleReload} name={t('upload.link.new_upload')}>
        {t('upload.link.new_upload')}
      </Button>
    </div>
  );
}

export default ShareButtons;
