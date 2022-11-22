import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper';
import { WebsiteCarbonBadge } from 'react-websitecarbon-badge';

import { useIsMediumDevice, useIsSmallDevice } from '@/app/hooks/useIsMobile';
import openSource from '@/app/assets/svg/open-source.svg';
import leaf from '@/app/assets/svg/leaf.svg';
import clock from '@/app/assets/svg/clock.svg';
import bolt from '@/app/assets/svg/bolt.svg';
import lock from '@/app/assets/svg/lock.svg';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/mousewheel';
import styles from '@/app/components/About/styles.module.scss';

function About(): JSX.Element {
  const { t, i18n } = useTranslation();
  const isMediumDevice = useIsMediumDevice();
  const isSmallDevice = useIsSmallDevice();

  // eslint-disable-next-line no-nested-ternary
  const slidesPerView: number = useMemo(() => (isMediumDevice ? (isSmallDevice ? 1 : 2) : 4), [isMediumDevice, isSmallDevice]);

  const renderSwiper: JSX.Element = useMemo(
    () => (
      <div className={'self-center w100 h100 pt-2'}>
        <SwiperComponent
          className={`${styles.swiper} fade-in`}
          loop
          spaceBetween={20}
          slidesPerView={slidesPerView}
          centeredSlides
          mousewheel
          slideToClickedSlide
          pagination={{ clickable: true }}
          modules={[Pagination, Mousewheel]}>
          <SwiperSlide>
            <div className={`${styles.card} fade-in`}>
              <div className={'d-flex align-center gap-5'}>
                <h2>
                  <img src={openSource} alt={'open source icon'} />
                  {t('about.open_source.title')}
                </h2>
              </div>
              <p>{t('about.open_source.text')}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styles.card} fade-in d-25`}>
              <div className={'d-flex align-center gap-5'}>
                <h2>
                  <img src={clock} alt={'clock icon'} />
                  {t('about.expiration.title')}
                </h2>
              </div>
              <p>{t('about.expiration.text')}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styles.card} fade-in d-50`}>
              <div className={'d-flex align-center gap-5'}>
                <h2>
                  <img src={leaf} alt={'leaf icon'} />
                  {t('about.ecolo.title')}
                </h2>
              </div>
              <p>{t('about.ecolo.text')}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styles.card} fade-in d-50`}>
              <div className={'d-flex align-center gap-5'}>
                <h2>
                  <img src={bolt} alt={'bolt icon'} />
                  {t('about.simple.title')}
                </h2>
              </div>
              <p>{t('about.simple.text')}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styles.card} fade-in d-25`}>
              <div className={'d-flex align-center gap-5'}>
                <h2>
                  <img src={lock} alt={'lock icon'} />
                  {t('about.security.title')}
                </h2>
              </div>
              <p>{t('about.security.text')}</p>
            </div>
          </SwiperSlide>
        </SwiperComponent>
      </div>
    ),
    [t, isMediumDevice, isSmallDevice, slidesPerView],
  );

  return (
    <>
      {renderSwiper}
      <div className={styles.carbonBadge}>
        <WebsiteCarbonBadge url={'https://inablink.io'} lang={i18n.language} />
      </div>
    </>
  );
}

export default About;
