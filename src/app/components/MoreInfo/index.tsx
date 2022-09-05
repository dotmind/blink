import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import { useModal } from '@/app/providers/ModalProvider';

import styles from '@/app/components/MoreInfo/styles.module.scss';

function MoreInfo() {
  const { open } = useModal();
  const { t } = useTranslation();

  return (
    <button
      className={styles.moreInfo}
      onClick={open}
      type={'button'}
      aria-label={t('modal.moreInfo')}
      name={t('modal.moreInfo')}>
      <FontAwesomeIcon icon={faCircleInfo} />
    </button>
  );
}

export default MoreInfo;
