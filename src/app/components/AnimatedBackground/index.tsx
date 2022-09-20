import background from '@/app/assets/images/background.webp';

import styles from '@/app/components/AnimatedBackground/styles.module.scss';

function AnimatedBackground() {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={background} alt={'animated background'} />
    </div>
  );
}

export default AnimatedBackground;
