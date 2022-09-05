import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { usePwa } from '@dotmind/react-use-pwa';

import Modal from '@/app/components/Modal';
import useIsMobile from '@/app/hooks/useIsMobile';
import Button, { ButtonStyle } from '@/app/components/Button';
import ModalFrame from '@/app/components/ModalFrame';
import background from '@/app/assets/images/placeholder.webp';
import background_2 from '@/app/assets/images/placeholder_2.webp';

import styles from '@/app/components/About/styles.module.scss';

function About() {
  const { isStandalone } = usePwa();
  const isMobile = useIsMobile();
  const [frameIndex, setFrameIndex] = useState(0);
  const { t } = useTranslation();

  const handleNext = useCallback(() => {
    if (frameIndex < 1) {
      setFrameIndex(frameIndex + 1);
    }
  }, [frameIndex]);

  const handlePrevious = useCallback(() => {
    if (frameIndex > 0) {
      setFrameIndex(frameIndex - 1);
    }
  }, [frameIndex]);

  const canPrevious = useMemo(() => frameIndex > 0, [frameIndex]);
  const canNext = useMemo(() => frameIndex < 1, [frameIndex]);

  const renderMobile = useMemo(
    () => (
      <Modal>
        <div className={styles.modal_content}>
          {frameIndex === 0 && (
            <ModalFrame title={'No Shit, un outil libre et securiser pour partager vos fichiers'} image={background}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut arcu orci sed tristique enim quis tristique eu.
              Pellentesque nisi, viverra aliquet quisque enim posuere aliquam augue. Congue at senectus sit sagittis varius nullam
              scelerisque tortor. Sit sapien in ac vel dolor vestibulum. Ultricies purus faucibus imperdiet consectetur pulvinar
              a. Eu.
            </ModalFrame>
          )}

          {frameIndex === 1 && (
            <ModalFrame title={'Une securité haut niveau grâce au E2E'} image={background_2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut arcu orci sed tristique enim quis tristique eu.
              Pellentesque nisi, viverra aliquet quisque enim posuere aliquam augue. Congue at senectus sit sagittis varius nullam
              scelerisque tortor. Sit sapien in ac vel dolor vestibulum. Ultricies purus faucibus imperdiet consectetur pulvinar
              a. Eu.
            </ModalFrame>
          )}

          <div className={styles.frame_controls}>
            <Button style={ButtonStyle.WHITE} callback={handleNext} disabled={!canNext} name={t('modal.nextPage')}>
              {t('modal.nextPage')} <FontAwesomeIcon icon={faArrowRight} />
            </Button>

            <Button style={ButtonStyle.WHITE} callback={handlePrevious} disabled={!canPrevious} name={t('modal.previousPage')}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
          </div>
        </div>
      </Modal>
    ),
    [frameIndex, canNext, canPrevious, handleNext, handlePrevious],
  );

  const renderDesktop = (
    <div className={styles.about}>
      <img src={background} alt={'landscape'} width={'100%'} height={'350px'} />

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

  if (isStandalone) {
    return null;
  }

  return isMobile ? renderMobile : renderDesktop;
}

export default About;
