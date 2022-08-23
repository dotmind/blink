import { useMemo } from 'react';
import classNames from 'classnames';

import { useUpload, UploadStatus } from '@/modules/upload/providers/UploadProvider';

import styles from '@/app/components/CircleWaves/styles.module.scss';

function CircleWaves() {
  const { status } = useUpload();

  const css = useMemo(() => {
    switch (status) {
      case UploadStatus.UPLOADING:
        return classNames(styles.circle_waves_base, styles.uploading);
      case UploadStatus.SUCCESS:
        return classNames(styles.circle_waves_base, styles.success);
      case UploadStatus.IDLE:
      default:
        return styles.circle_waves_base;
    }
  }, [status]);

  return (
    <div className={styles.circle_container}>
      <div className={css}>
        <div className={styles.animated_circles} />
        <div className={styles.animated_circles} />
        <div className={styles.animated_circles} />
        <div className={styles.animated_circles} />
        <div className={styles.animated_circles} />
        <div className={styles.animated_circles} />
      </div>
    </div>
  );
}

export default CircleWaves;
