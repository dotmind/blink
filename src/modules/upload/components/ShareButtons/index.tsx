import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

import Button, { ButtonStyle } from '@/app/components/Button';
import { useUpload } from '@/modules/upload/providers/UploadProvider';
import { canUseNativeShare, nativeShare } from '@/app/services/navigator';

import styles from '@/modules/upload/components/ShareButtons/styles.module.scss';

function ShareButtons() {
  const { shareUrl } = useUpload();
  const handleShare = useCallback(() => nativeShare(shareUrl as string), [shareUrl]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(shareUrl as string);
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
      </Button>
    </div>
  );
}

export default ShareButtons;
