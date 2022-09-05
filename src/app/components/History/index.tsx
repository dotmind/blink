import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import { timeRemaining } from '@/app/utils/time';
import useHistory from '@/app/hooks/useHistory';

import styles from '@/app/components/History/styles.module.scss';

function History() {
  const { history } = useHistory();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const renderList = useMemo(
    () =>
      history.map((item) => (
        <a className={styles.historyCard} key={item.url} href={item.url} target={'_blank'} rel={'noreferrer'}>
          <li>
            <div>
              <p className={styles.filename}>{item.filename}</p>
              <p className={styles.expiresIn}>
                {t('common.history.expiresin')} {timeRemaining(item.expiresAt)}
              </p>
            </div>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </li>
        </a>
      )),
    [history, t, currentLanguage],
  );

  const renderHistory = useMemo(() => {
    if (!history.length) {
      return null;
    }

    return (
      <div className={styles.history_container}>
        <h3>{t('common.history.title')}</h3>
        <ul className={styles.historyList}>{renderList}</ul>
      </div>
    );
  }, [history, t, currentLanguage]);

  return renderHistory;
}

export default History;
