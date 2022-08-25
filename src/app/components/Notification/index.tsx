import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleInfo, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import styles from '@/app/components/Notification/styles.module.scss';

export enum NotificationType {
  INFORMATION = 'information',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

interface IProps {
  children: React.ReactNode;
  type: NotificationType;
}

function Notification({ children, type }: IProps) {
  const icon = useMemo(() => {
    switch (type) {
      case NotificationType.ERROR:
        return <FontAwesomeIcon icon={faCircleXmark} />;
      case NotificationType.SUCCESS:
        return <FontAwesomeIcon icon={faCircleCheck} />;
      case NotificationType.INFORMATION:
      case NotificationType.WARNING:
      default:
        return <FontAwesomeIcon icon={faCircleInfo} />;
    }
  }, [type]);

  return (
    <div className={styles.notification} data-type={type}>
      {icon} {children}
    </div>
  );
}

export default Notification;
