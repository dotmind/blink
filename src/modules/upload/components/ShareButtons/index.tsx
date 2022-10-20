import { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

import Button, { ButtonStyle } from '@/app/components/Button';
import { useUpload } from '@/modules/upload/providers/UploadProvider';
import { canUseNativeShare, nativeShare } from '@/app/services/navigator';
import Tooltip, { TooltipPosition } from '@/app/components/Tooltip';
import ShareIcon from '@/app/assets/svg/share_white.svg';
import reloadIcon from '@/app/assets/svg/reload.svg';

import styles from '@/modules/upload/components/ShareButtons/styles.module.scss';

function ShareButtons(): JSX.Element {
  const { shareUrl } = useUpload();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { t } = useTranslation();
  const handleShare: () => Promise<void> = useCallback(() => nativeShare(shareUrl as string), [shareUrl]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 3000);
    }
  }, [isCopied]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(shareUrl as string);
    setIsCopied(true);
  }, [shareUrl]);

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
      <Button style={ButtonStyle.PRIMARY} callback={handleCopy} name={t('upload.link.copy')}>
        {t('upload.link.copy')} <FontAwesomeIcon icon={faCopy} />
        {isCopied && <Tooltip position={TooltipPosition.left}>{t('common.tooltip.copied')}</Tooltip>}
      </Button>

      <Button style={ButtonStyle.NONE} name={t('upload.link.reload')} callback={handleReload}>
        <img className={'icons'} src={reloadIcon} alt={t('upload.link.reload')} />
      </Button>
    </div>
  );
}

export default ShareButtons;
