import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { availableLanguages } from '@/app/services/i18n';
import useIsMobile from '@/app/hooks/useIsMobile';
import translate from '@/app/assets/svg/translate.svg';

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
        {!isMobile && <p className={styles.lang}>{t(`lang.full.${i18n.language}`)}</p>}
        <img className={'icons'} src={translate} alt={t('lang.choose')} />
      </button>

      <div className={styles.lang_dropdown} data-isopen={isOpen}>
        {availableLanguages
          .filter((lang) => lang !== i18n.language)
          .map((lang) => (
            <button
              key={lang}
              type={'button'}
              onClick={() => handleSwitchLanguage(lang)}
              aria-label={t(`lang.full.${lang}`)}
              name={t(`lang.full.${lang}`)}>
              {isMobile ? t(`lang.short.${lang}`) : t(`lang.full.${lang}`)}
            </button>
          ))}
      </div>
    </div>
  );
}

export default LangSwitcher;
