import { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

import Button, { ButtonStyle } from '@/app/components/Button';
import { useUpload } from '@/modules/upload/providers/UploadProvider';
import { canUseNativeShare, nativeShare } from '@/app/services/navigator';
import Tooltip from '@/app/components/Tooltip';

import styles from '@/modules/upload/components/ShareButtons/styles.module.scss';

function ShareButtons() {
  const { shareUrl } = useUpload();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { t } = useTranslation();
  const handleShare = useCallback(() => nativeShare(shareUrl as string), [shareUrl]);

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
      {canUseNativeShare() && (
        <Button style={ButtonStyle.SECONDARY} callback={handleShare}>
          Partager le lien <FontAwesomeIcon icon={faArrowUpFromBracket} />
        </Button>
      )}
      <Button style={ButtonStyle.PRIMARY} callback={handleCopy}>
        Copier le lien <FontAwesomeIcon icon={faCopy} />
        {isCopied && <Tooltip>{t('common.tooltip.copied')}</Tooltip>}
      </Button>
    </div>
  );
}

export default ShareButtons;
