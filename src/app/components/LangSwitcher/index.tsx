import i18next from 'i18next';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

import { availableLanguages } from '@/app/services/i18n';

import styles from '@/app/components/LangSwitcher/styles.module.scss';

function LangSwitcher() {
  const { t } = useTranslation();

  const handleSwitchLanguage = useCallback(() => {
    const currentLanguage = availableLanguages.indexOf(i18next.language);
    const nextLanguage = (currentLanguage + 1) % availableLanguages.length;
    i18next.changeLanguage(availableLanguages[nextLanguage]);
  }, []);

  return (
    <button className={styles.langSwitcher} type={'button'} onClick={handleSwitchLanguage}>
      <p className={styles.lang}>{t('common.lang')}</p>
      <FontAwesomeIcon icon={faLanguage} />
    </button>
  );
}

export default LangSwitcher;
