import { useDrawer } from '@/app/providers/DrawerProvider';
import Document from '@/modules/download/components/Document';
import cancelIcon from '@/app/assets/svg/cancel.svg';
import Loader from '@/app/components/Loader';
import { useDownload } from '@/modules/download/providers/DownloadProvider';

import styles from '@/app/components/Drawer/styles.module.scss';

function Drawer() {
  const { isOpen, close, ref } = useDrawer();
  const { file, isLoading } = useDownload();

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label  */}
      <div className={styles.closeOverlay} onClick={close} onKeyDown={close} role={'button'} tabIndex={-1} />
      <div className={styles.drawer} ref={ref}>
        <button type={'button'} className={styles.close} onClick={close}>
          <img src={cancelIcon} alt={'exit cross'} />
        </button>
        {isLoading ? <Loader /> : <Document file={String(file)} />}
      </div>
    </div>
  );
}

export default Drawer;
