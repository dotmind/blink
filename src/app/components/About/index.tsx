import background from '@/app/assets/images/placeholder.png';

import styles from './styles.module.scss';

function About() {
  return (
    <div className={styles.about}>
      <img src={background} alt={'landscape'} />

      <div className={styles.container}>
        <div className={styles.paragraph}>
          <h2>No Shit, un outil libre et securiser pour partager vos fichiers</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut arcu orci sed tristique enim quis tristique eu.
            Pellentesque nisi, viverra aliquet quisque enim posuere aliquam augue. Congue at senectus sit sagittis varius nullam
            scelerisque tortor. Sit sapien in ac vel dolor vestibulum. Ultricies purus faucibus imperdiet consectetur pulvinar a.
            Eu.
          </p>
        </div>

        <div className={styles.paragraph}>
          <h2>Une securité haut niveau grâce au E2E</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut arcu orci sed tristique enim quis tristique eu.
            Pellentesque nisi, viverra aliquet quisque enim posuere aliquam augue. Congue at senectus sit sagittis varius nullam
            scelerisque tortor. Sit sapien in ac vel dolor vestibulum. Ultricies purus faucibus imperdiet consectetur pulvinar a.
            Eu.
          </p>
        </div>

        <div className={styles.paragraph}>
          <h2>Une empreinte carbonne plus faible</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut arcu orci sed tristique enim quis tristique eu.
            Pellentesque nisi, viverra aliquet quisque enim posuere aliquam augue. Congue at senectus sit sagittis varius nullam
            scelerisque tortor. Sit sapien in ac vel dolor vestibulum. Ultricies purus faucibus imperdiet consectetur pulvinar a.
            Eu.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
