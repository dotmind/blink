import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import Button, { ButtonStyle } from '@/app/components/Button';
import EmptyBox from '@/app/assets/svg/empty_box.svg';

import styles from '@/app/components/NotFound/styles.module.scss';

interface IProps {
  information?: string;
}

function NotFound({ information }: IProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('common.errors.404.title')}</h1>
        <p>{t('common.errors.404.message')}</p>
        {information && <p className={styles.information}>{t(information)}</p>}
        <Button style={ButtonStyle.GLASS} callback={handleClick} name={t('common.errors.404.button')}>
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

NotFound.defaultProps = {
  information: '',
};

export default NotFound;
