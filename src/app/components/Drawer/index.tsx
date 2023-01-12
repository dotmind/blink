import { useDrawer } from '@/app/providers/DrawerProvider';
import Document from '@/modules/download/components/Document';
import cancelIcon from '@/app/assets/svg/cancel.svg';
import Loader from '@/app/components/Loader';
import { useDownload } from '@/modules/download/providers/DownloadProvider';

import styles from '@/app/components/Drawer/styles.module.scss';

function Drawer() {
  const { isOpen, isClosing, close } = useDrawer();
  const { file, fileName, isLoading, url } = useDownload();

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label  */}
      <div className={styles.closeOverlay} onClick={close} onKeyDown={close} role={'button'} tabIndex={-1} />
      <div className={styles.drawer} data-closing={isClosing}>
        <button type={'button'} className={styles.close} onClick={close}>
          <img src={cancelIcon} alt={'exit cross'} />
        </button>
        {isLoading ? <Loader /> : <Document file={String(file)} fileName={String(fileName)} url={url} />}
      </div>
    </>
  );
}

export default Drawer;
