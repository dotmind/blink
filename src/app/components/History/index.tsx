import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import { timeRemaining } from '@/app/utils/time';
import useHistory from '@/app/hooks/useHistory';

import styles from '@/app/components/History/styles.module.scss';

function History() {
  const { history } = useHistory();

  const renderHistory = useMemo(() => {
    const renderList = history.map((item) => (
      <a className={styles.historyCard} key={item.url} href={item.url} target={'_blank'} rel={'noreferrer'}>
        <li>
          <div>
            <p className={styles.filename}>{item.filename}</p>
            <p className={styles.expiresIn}>Expire dans {timeRemaining(item.expiresAt)}</p>
          </div>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </li>
      </a>
    ));

    return (
      <div className={styles.history_container}>
        <h3>Historique des transferts</h3>
        <ul className={styles.historyList}>{renderList}</ul>
      </div>
    );
  }, [history]);

  return renderHistory;
}

export default History;
