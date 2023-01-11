import { MouseEvent, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useDrawer } from '@/app/providers/DrawerProvider';
import { timeRemaining } from '@/app/utils/time';
import useHistory from '@/app/hooks/useHistory';
import { deleteFile } from '@/app/services/api';
import { useApp } from '@/app/providers/AppProdiver';
import { extractFilePath } from '@/app/services/file';
import trashIcon from '@/app/assets/svg/trash.svg';
import shareIcon from '@/app/assets/svg/share_2.svg';

import styles from '@/app/components/History/styles.module.scss';
import { useDownload } from '@/modules/download/providers/DownloadProvider';

function History(): JSX.Element | null {
  const { fingerprint } = useApp();
  const { isOpen, open, close } = useDrawer();
  const { isLoading } = useDownload();
  const { history, removeFromHistory } = useHistory();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleDelete: (url: string, index: number) => (e: MouseEvent<HTMLButtonElement>) => Promise<void> = useCallback(
    (url: string, index: number) => async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      await deleteFile(fingerprint, extractFilePath(url));
      removeFromHistory(index);
    },
    [fingerprint, removeFromHistory],
  );

  const handleOpenPreview = useCallback(
    (url: string) => {
      if (!isOpen) {
        open(url);
      }
    },
    [isOpen, open, close],
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
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <li
        className={styles.historyCard}
        key={item.url}
        onClick={() => handleOpenPreview(item.url)}
        onKeyDown={() => handleOpenPreview(item.url)}
        data-loading={isLoading}>
        <div>
          <div>
            <p className={styles.filename}>{item.filename}</p>
            <p className={styles.expiresIn}>
              {t('common.history.expiresin')} {timeRemaining(item.expiresAt)}
            </p>
          </div>
          <div className={'d-flex align-center gap-10'}>
            <button
              className={'d-flex align-center'}
              type={'button'}
              name={'delete history item'}
              aria-label={'delete history item'}
              onClick={handleDelete(item.url, i)}>
              <img src={trashIcon} alt={'trash'} />
            </button>
            <a className={styles.openLink} href={item.url} onClick={(e) => e.stopPropagation()}>
              <img src={shareIcon} alt={'eye'} />
            </a>
          </div>
        </div>
      </li>
    ));
  }, [history, t, isLoading, currentLanguage, handleOpenPreview]);

  return (
    <div className={`${styles.history_container} safe self-center fade-in`}>
      <h3>{t('common.history.title')}</h3>
      <ul className={styles.historyList}>{renderList}</ul>
    </div>
  );
}

export default History;
