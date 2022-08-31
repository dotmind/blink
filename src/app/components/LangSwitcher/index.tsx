import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

import { availableLanguages } from '@/app/services/i18n';

import styles from '@/app/components/LangSwitcher/styles.module.scss';

function LangSwitcher() {
  const { t, i18n } = useTranslation();

  // const handleSwitchLanguage = useCallback(() => {
  //   const currentLanguage = availableLanguages.indexOf(i18n.language);
  //   const nextLanguage = (currentLanguage + 1) % availableLanguages.length;
  //   i18n.changeLanguage(availableLanguages[nextLanguage]);
  // }, [i18n]);

  const openDropdown = () => {};

  return (
    <div>
      <button className={styles.langSwitcher} type={'button'} onClick={openDropdown}>
        <p className={styles.lang}>{t(`lang.${i18n.language}`)}</p>
        <FontAwesomeIcon icon={faLanguage} />
      </button>
      <div className={styles.lang_dropdown}>
        {availableLanguages
          .filter((lang) => lang !== i18n.language)
          .map((lang) => (
            <button key={lang} type={'button'} onClick={() => i18n.changeLanguage(lang)}>
              {t(`lang.${lang}`)}
            </button>
          ))}
      </div>
    </div>
  );
}

export default LangSwitcher;
