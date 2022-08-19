import { useMemo, useRef } from 'react';

import { useUpload, UploadStatus } from '@/modules/upload/providers/UploadProvider';

import styles from './styles.module.scss';

function UploadHeader() {
  const { status } = useUpload();
  const container = useRef(null);

  const renderHeader = useMemo(() => {
    switch (status) {
      case UploadStatus.UPLOADING:
        return (
          <>
            <h1>Compression et envoi en cours...</h1>
            <p>Les fichiers que vous partager sont protégés par en chiffrement E2E</p>
          </>
        );

      case UploadStatus.SUCCESS:
        return (
          <>
            <h1>C’est terminé ! Bravo ✨</h1>
            <p>Partager ce fichier représente 80.7 g de CO2, c’est -54% de moins que sur Google Drive 🌱</p>
          </>
        );

      case UploadStatus.IDLE:
      default:
        return (
          <>
            <h1>Déposer vos fichier ici...</h1>
            <p>Partager facilement des fichiers en toute sécurité.</p>
          </>
        );
    }
  }, [status]);

  return (
    <header ref={container} className={styles.header}>
      {renderHeader}
    </header>
  );
}

export default UploadHeader;
