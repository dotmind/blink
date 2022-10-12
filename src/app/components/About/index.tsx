import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper';

import openSource from '@/app/assets/svg/open-source.svg';
import leaf from '@/app/assets/svg/leaf.svg';
import clock from '@/app/assets/svg/clock.svg';
import bolt from '@/app/assets/svg/bolt.svg';
import lock from '@/app/assets/svg/lock.svg';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/mousewheel';
import styles from '@/app/components/About/styles.module.scss';

function About() {
  const { t } = useTranslation();

  return (
    <div className={'self-center w100 h100 pt-2'}>
      <Swiper
        className={`${styles.swiper} fade-in`}
        spaceBetween={20}
        slidesPerView={4}
        centeredSlides
        mousewheel
        loop
        pagination={{ clickable: true }}
        modules={[Pagination, Mousewheel]}>
        <SwiperSlide>
          <div className={`${styles.card} fade-in d-25`}>
            <h2>
              <img src={openSource} alt={'clock icon'} /> {t('about.open_source.title')}
            </h2>
            <p>{t('about.open_source.text')}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.card} fade-in d-50`}>
            <h2>
              <img src={clock} alt={'clock icon'} /> {t('about.expiration.title')}
            </h2>
            <p>{t('about.expiration.text')}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.card} fade-in d-75`}>
            <h2>
              <img src={leaf} alt={'clock icon'} /> {t('about.ecolo.title')}
            </h2>
            <p>{t('about.ecolo.text')}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.card} fade-in d-75`}>
            <h2>
              <img src={bolt} alt={'clock icon'} /> {t('about.simple.title')}
            </h2>
            <p>{t('about.simple.text')}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.card} fade-in d-50`}>
            <h2>
              <img src={lock} alt={'clock icon'} /> {t('about.security.title')}
            </h2>
            <p>{t('about.security.text')}</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default About;
