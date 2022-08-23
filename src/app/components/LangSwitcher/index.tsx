import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

import styles from '@/app/components/LangSwitcher/styles.module.scss';

// @TODO: Switch lang on click

function LangSwitcher() {
  return (
    <div className={styles.langSwitcher}>
      <p className={styles.lang}>Français</p>
      <FontAwesomeIcon icon={faLanguage} />
    </div>
  );
}

export default LangSwitcher;
