import { useMemo } from 'react';

import { useUpload, UploadStatus } from '@/modules/upload/providers/UploadProvider';
import FileInput from '@/modules/upload/components/FileInput';
// import UploadButton from '@/modules/upload/components/UploadButton';

import styles from './styles.module.scss';

function Upload() {
  const { status } = useUpload();

  // const renderShare = useMemo(() => {
  //   if (!shareUrl || status !== UploadStatus.SUCCESS) {
  //     return null;
  //   }

  //   return (
  //     <a href={shareUrl} target={'_blank'} rel={'noreferrer'}>
  //       {shareUrl}
  //     </a>
  //   );
  // }, [shareUrl, status]);

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
    return null;
  }, [status]);

  return (
    <div className={'container'}>
      <header className={styles.header}>{renderHeader}</header>

      <FileInput />
    </div>
  );
}

export default Upload;
