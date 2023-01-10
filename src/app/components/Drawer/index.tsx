import { useMemo } from 'react';

import { useDrawer } from '@/app/providers/DrawerProvider';
import Document from '@/modules/download/components/Document';
import cancelIcon from '@/app/assets/svg/cancel.svg';

import styles from '@/app/components/Drawer/styles.module.scss';

function Drawer() {
  const { isOpen, close, file, fileName } = useDrawer();

  const render = useMemo(() => {
    if (!isOpen) {
      return null;
    }

    return (
      <div className={styles.drawer}>
        <button type={'button'} className={styles.close} onClick={close}>
          <img src={cancelIcon} alt={'exit cross'} />
        </button>
        <Document file={file} fileName={fileName} />
      </div>
    );
  }, [isOpen, close, file, fileName]);

  return render;
}

export default Drawer;
