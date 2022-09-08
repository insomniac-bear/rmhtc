import Image from 'next/image';
import { nanoid } from '@reduxjs/toolkit';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import styles from './OfferSlider.module.css';

export const OfferSlider = ({ arr, outerСlassName = '' }: any) => {
  const pagination = {
    clickable: true,
    horizontalClass: styles.slider__pagination,
    bulletClass: styles.slider__bullet,
    bulletActiveClass: styles.slider__bullet_active,
    renderBullet(i: number, className: string) {
      return `<span class="${className} ${i}"></span>`;
    },
  };

  return (
    <Swiper
      tag="div"
      wrapperTag="ul"
      modules={[Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={arr.length > 1 && pagination}
      className={`${styles.slider} ${outerСlassName}`}
    >
      {arr.map((item: any) => (
        <SwiperSlide
          key={nanoid()}
          tag="li"
          className={styles.slider__item}
        >
          <Image src={item.url} alt={item.description} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
