import background from '@/app/assets/images/background.webp';

import styles from '@/app/components/AnimatedBackground/styles.module.scss';

function AnimatedBackground() {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={background} alt={'animated background'} width={'100%'} height={'100%'} />
    </div>
  );
}

export default AnimatedBackground;
