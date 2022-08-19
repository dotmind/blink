import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

import Button, { ButtonStyle } from '@/app/components/Button';
import { useUpload } from '@/modules/upload/providers/UploadProvider';

import styles from './styles.module.scss';

function ShareButtons() {
  const { shareUrl } = useUpload();

  const handleCopy = useCallback(() => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
    }
  }, [shareUrl]);

  const handleShare = useCallback(() => {
    // @TODO: share file using native share dialog
  }, [shareUrl]);

  return (
    <div className={styles.share_container}>
      <Button style={ButtonStyle.SECONDARY} callback={handleShare}>
        Partager le lien <FontAwesomeIcon icon={faArrowUpFromBracket} />
      </Button>
      <Button style={ButtonStyle.PRIMARY} callback={handleCopy}>
        Copier le lien <FontAwesomeIcon icon={faCopy} />
      </Button>
    </div>
  );
}

export default ShareButtons;
