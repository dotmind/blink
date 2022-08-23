import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import { useModal } from '@/app/providers/ModalProvider';

import styles from '@/app/components/MoreInfo/styles.module.scss';

function MoreInfo() {
  const { open } = useModal();

  return (
    <button className={styles.moreInfo} onClick={open} type={'button'}>
      <FontAwesomeIcon icon={faCircleInfo} />
    </button>
  );
}

export default MoreInfo;
