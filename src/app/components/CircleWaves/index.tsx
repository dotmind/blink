import styles from './styles.module.scss';

function CircleWaves() {
  return (
    <div className={styles.circle_container}>
      <div className={styles.circle_waves_base}>
        <div className={styles.animated_circles} />
        <div className={styles.animated_circles} />
        <div className={styles.animated_circles} />
        <div className={styles.animated_circles} />
      </div>
    </div>
  );
}

export default CircleWaves;
