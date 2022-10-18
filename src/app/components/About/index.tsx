import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper';

import useIsMobile, { useIsSmallDevice } from '@/app/hooks/useIsMobile';
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
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const isSmallDevice = useIsSmallDevice();

  // eslint-disable-next-line no-nested-ternary
  const slidesPerView: number = useMemo(() => (isMobile ? (isSmallDevice ? 1 : 2) : 4), [isMobile, isSmallDevice]);

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
            <div className={`${styles.card} fade-in d-25`}>
              <div className={'d-flex gap-15'}>
                <img src={openSource} alt={'open source icon'} />
                <h2>{t('about.open_source.title')}</h2>
              </div>
              <p>{t('about.open_source.text')}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styles.card} fade-in d-50`}>
              <div className={'d-flex gap-10'}>
                <img src={clock} alt={'clock icon'} />
                <h2>{t('about.expiration.title')}</h2>
              </div>
              <p>{t('about.expiration.text')}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styles.card} fade-in d-75`}>
              <div className={'d-flex gap-10'}>
                <img src={leaf} alt={'leaf icon'} />
                <h2>{t('about.ecolo.title')}</h2>
              </div>
              <p>{t('about.ecolo.text')}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styles.card} fade-in d-75`}>
              <div className={'d-flex gap-10'}>
                <img src={bolt} alt={'bolt icon'} />
                <h2>{t('about.simple.title')}</h2>
              </div>
              <p>{t('about.simple.text')}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styles.card} fade-in d-50`}>
              <div className={'d-flex gap-10'}>
                <img src={lock} alt={'lock icon'} />
                <h2>{t('about.security.title')}</h2>
              </div>
              <p>{t('about.security.text')}</p>
            </div>
          </SwiperSlide>
        </SwiperComponent>
      </div>
    ),
    [t, isMobile, isSmallDevice, slidesPerView],
  );

  return renderSwiper;
}

export default About;
