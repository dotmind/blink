import { useEffect, useMemo } from 'react';

import { useUpload } from '@/app/providers/UploadProvider';
import { timeRemaining } from '@/app/utils/time';

import styles from '@/app/components/History.module.css';

function History() {
  const { history, setHistory } = useUpload();

  useEffect(() => {
    const filteredHistory = history.filter((item) => new Date(item.expiresAt) > new Date());
    if (filteredHistory.length !== history.length) {
      setHistory(filteredHistory);
    }
  }, [history]);

  const renderHistory = useMemo(() => {
    if (!history.length) {
      return null;
    }

    return history.map((item) => (
      <a className={styles.historyCard} key={item.url} href={item.url} target={'_blank'} rel={'noreferrer'}>
        <li>
          <p>{item.filename}</p>
          <p>Expires in {timeRemaining(item.expiresAt)}</p>
        </li>
      </a>
    ));
  }, [history]);

  return (
    <div className={styles.history_container}>
      <ul className={styles.historyList}>{renderHistory}</ul>
    </div>
  );
}

export default History;
