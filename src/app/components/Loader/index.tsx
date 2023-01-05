import styles from '@/app/components/Loader/styles.module.scss';

function Loader(): JSX.Element {
  return (
    <div className={'d-flex justify-center align-center grow'}>
      <span className={styles.loader} />
    </div>
  );
}

export default Loader;
