import { useState, useMemo, useEffect } from 'react';

import { useApp } from '@/app/providers/AppProdiver';

import styles from '@/app/components/History.module.css';

function History() {
  const { fingerprint } = useApp();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const rawHistory = JSON.parse(localStorage.getItem(fingerprint) || '[]');
    setHistory(rawHistory);
  }, [fingerprint]);

  useEffect(() => {
    const filteredHistory = history.filter((item: { expiresAt: string }) => new Date(item.expiresAt) > new Date());
    if (filteredHistory.length !== history.length) {
      localStorage.setItem(fingerprint, JSON.stringify(filteredHistory));
      setHistory(filteredHistory);
    }
  }, [history]);

  const renderHistory = useMemo(() => {
    if (!history.length) {
      return null;
    }

    return history.map((item: { filename: string; url: string; expiresAt: string }) => (
      <a className={styles.historyCard} key={item.url} href={item.url} target={'_blank'} rel={'noreferrer'}>
        <li>
          <p>{item.filename}</p>
          <p>Expires at: {item.expiresAt}</p>
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
