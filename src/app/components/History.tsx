import styles from '@/app/components/History.module.css';

function History() {
  const history = JSON.parse(localStorage.getItem('files_history') || '[]');
  const filteredHistory = history.filter((item: { expiresAt: string }) => new Date(item.expiresAt) > new Date());
  if (filteredHistory.length !== history.length) {
    localStorage.setItem('files_history', JSON.stringify(filteredHistory));
  }

  const dayRemaining = (expiresAt: string): number => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();
    return Math.round((diff / (1000 * 60 * 60 * 24)) * 100) / 100;
  };

  return (
    <div className={styles.history_container}>
      <ul className={styles.historyList}>
        {history.map((item: { filename: string; url: string; expiresAt: string }) => (
          <a className={styles.historyCard} key={item.url} href={item.url} target={'_blank'} rel={'noreferrer'}>
            <li>
              <p>{item.filename}</p>
              <p>Expires in {dayRemaining(item.expiresAt)}d</p>
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
}

export default History;
