import { useMemo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import { timeRemaining } from '@/app/utils/time';
import useHistory from '@/app/hooks/useHistory';
import { deleteFile } from '@/app/services/api';
import { useApp } from '@/app/providers/AppProdiver';

import styles from '@/app/components/History/styles.module.scss';

function History() {
  const { fingerprint } = useApp();
  const { history, removeFromHistory } = useHistory();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleDelete = useCallback((e: React.MouseEvent<HTMLButtonElement>, url: string, index: number) => {
    e.preventDefault();
    const path = url.split('/').slice(3).join('/').split('#')[0];
    deleteFile(fingerprint, path).then(() => removeFromHistory(index));
  }, []);

  const renderList = useMemo(
    () =>
      history.map((item, i) => (
        <a className={styles.historyCard} key={item.url} href={item.url} target={'_blank'} rel={'noreferrer'}>
          <li>
            <div>
              <p className={styles.filename}>{item.filename}</p>
              <p className={styles.expiresIn}>
                {t('common.history.expiresin')} {timeRemaining(item.expiresAt)}
              </p>
            </div>
            <div className={'d-flex'} style={{ gap: '10px' }}>
              <button type={'button'} onClick={(e) => handleDelete(e, item.url, i)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </div>
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
