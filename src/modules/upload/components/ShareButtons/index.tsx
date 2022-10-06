import { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

import Button, { ButtonStyle } from '@/app/components/Button';
import { useUpload } from '@/modules/upload/providers/UploadProvider';
import { canUseNativeShare, nativeShare } from '@/app/services/navigator';
import Tooltip, { TooltipPosition } from '@/app/components/Tooltip';
import HomeButton from '@/app/components/HomeButton';

import styles from '@/modules/upload/components/ShareButtons/styles.module.scss';
import ShareIcon from '@/app/assets/svg/share_w.svg';

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

  return (
    <div className={styles.share_container}>
      <HomeButton />
      {canUseNativeShare() && (
        <Button style={ButtonStyle.SECONDARY} callback={handleShare} name={t('upload.link.share')}>
          {t('upload.link.share')} <img src={ShareIcon} alt={t('upload.link.share')} />
        </Button>
      )}
      <Button style={ButtonStyle.PRIMARY} callback={handleCopy} name={t('upload.link.copy')}>
        {t('upload.link.copy')} <FontAwesomeIcon icon={faCopy} />
        {isCopied && <Tooltip position={TooltipPosition.right}>{t('common.tooltip.copied')}</Tooltip>}
      </Button>
    </div>
  );
}

export default ShareButtons;
