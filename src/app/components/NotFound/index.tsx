import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import Button, { ButtonStyle } from '@/app/components/Button';
import EmptyBox from '@/app/assets/svg/empty_box.svg';

import styles from '@/app/components/NotFound/styles.module.scss';

function NotFound() {
  const { t } = useTranslation();

  const handleClick = () => {
    window.location.href = '/';
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('common.errors.404.title')}</h1>
        <p>{t('common.errors.404.message')}</p>
        <Button style={ButtonStyle.SECONDARY} callback={handleClick}>
          {t('common.errors.404.button')}
          <FontAwesomeIcon icon={faHouse} />
        </Button>
      </div>

      <div className={styles.image}>
        <img src={EmptyBox} alt={'Empty box'} />
      </div>
    </div>
  );
}

export default NotFound;
