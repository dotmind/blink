import { useState, useMemo, useEffect } from 'react';

import { useApp } from '@/app/providers/AppProdiver';

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
      <li key={item.url}>
        <p>{item.filename}</p>
        <a href={item.url} target={'_blank'} rel={'noreferrer'}>
          {item.url}
        </a>
        <p>Expires at {item.expiresAt}</p>
      </li>
    ));
  }, [history]);

  return (
    <>
      <div>Historique : </div>
      <ul>{renderHistory}</ul>
    </>
  );
}

export default History;
