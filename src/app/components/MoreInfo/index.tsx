import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';

function MoreInfo() {
  return (
    <div className={styles.moreInfo}>
      <FontAwesomeIcon icon={faCircleInfo} />
    </div>
  );
}

export default MoreInfo;
