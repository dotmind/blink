import { useMemo } from 'react';

import { timeRemaining } from '@/app/utils/time';
import useHistory from '@/app/hooks/useHistory';

import styles from '@/app/components/History.module.scss';

function History() {
  const { history } = useHistory();

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
