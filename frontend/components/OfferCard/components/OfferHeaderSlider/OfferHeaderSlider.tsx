import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import styles from './OfferHeaderSlider.module.css';
import 'swiper/css';

export const OfferHeaderSlider = ({ arr }: any) => (
  <Swiper
    tag="div"
    wrapperTag="ul"
    modules={[Pagination]}
    spaceBetween={0}
    slidesPerView={1}
    pagination={{ clickable: true }}
    className={styles.slider}
  >
    {arr.map((item: any) => (
      <SwiperSlide
        key={item.id}
        tag="li"
        className={styles.slider__item}
      >
        <Image src={item.img} alt={item.id} />
      </SwiperSlide>
    ))}
  </Swiper>
);
