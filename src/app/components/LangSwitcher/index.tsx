import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

import { availableLanguages } from '@/app/services/i18n';
import useIsMobile from '@/app/hooks/useIsMobile';

import styles from '@/app/components/LangSwitcher/styles.module.scss';

function LangSwitcher() {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const handleSwitchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  const openDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown_container}>
      <button
        className={styles.langSwitcher}
        type={'button'}
        onClick={openDropdown}
        aria-label={t('lang.choose')}
        name={t('lang.choose')}>
        {!isMobile && <p className={styles.lang}>{t(`lang.${i18n.language}`)}</p>}
        <FontAwesomeIcon icon={faLanguage} />
      </button>

      <div className={styles.lang_dropdown} data-isopen={isOpen}>
        {availableLanguages
          .filter((lang) => lang !== i18n.language)
          .map((lang) => (
            <button
              key={lang}
              type={'button'}
              onClick={() => handleSwitchLanguage(lang)}
              aria-label={t(`lang.${lang}`)}
              name={t(`lang.${lang}`)}>
              {t(`lang.${lang}`)}
            </button>
          ))}
      </div>
    </div>
  );
}

export default LangSwitcher;
