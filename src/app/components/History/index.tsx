import { MouseEvent, useMemo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { usePwa } from '@dotmind/react-use-pwa';

import { timeRemaining } from '@/app/utils/time';
import useHistory from '@/app/hooks/useHistory';
import { deleteFile } from '@/app/services/api';
import { useApp } from '@/app/providers/AppProdiver';
import { extractFilePath } from '@/app/services/file';

import styles from '@/app/components/History/styles.module.scss';

function History(): JSX.Element | null {
  const { fingerprint } = useApp();
  const { history, removeFromHistory } = useHistory();
  const { t, i18n } = useTranslation();
  const { isStandalone } = usePwa();
  const currentLanguage = i18n.language;

  const handleDelete: (url: string, index: number) => (e: MouseEvent<HTMLButtonElement>) => Promise<void> = useCallback(
    (url: string, index: number) => async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await deleteFile(fingerprint, extractFilePath(url));
      removeFromHistory(index);
    },
    [fingerprint, removeFromHistory],
  );

  const renderList: JSX.Element[] | JSX.Element = useMemo(() => {
    if (!history.length) {
      return (
        <li className={styles.historyCard}>
          <p className={'text-center'}>{t('common.history.no_history')}</p>
        </li>
      );
    }

    return history.map((item, i) => (
      <li className={styles.historyCard} key={item.url}>
        <a href={item.url} target={isStandalone ? '_self' : '_blank'} rel={'noreferrer'}>
          <div>
            <p className={styles.filename}>{item.filename}</p>
            <p className={styles.expiresIn}>
              {t('common.history.expiresin')} {timeRemaining(item.expiresAt)}
            </p>
          </div>
          <div className={'d-flex gap-10'}>
            <button
              type={'button'}
              name={'delete history item'}
              aria-label={'delete history item'}
              onClick={handleDelete(item.url, i)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </div>
        </a>
      </li>
    ));
  }, [history, t, currentLanguage]);

  return (
    <div className={`${styles.history_container} fade-in`}>
      <h3>{t('common.history.title')}</h3>
      <ul className={styles.historyList}>{renderList}</ul>
    </div>
  );
}

export default History;
