import React, { useRef, useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper modules
import { Navigation, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// You might need to import core Swiper styles if not already included
// import 'swiper/css/bundle';

import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import styles from './Carousel.module.css'; // For custom styling of container/arrows

function Carousel({ data, renderComponent }) {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Swiper configuration settings for responsiveness
  const swiperParams = {
    modules: [Navigation, A11y],
    spaceBetween: 20, // Space between slides
    slidesPerView: 'auto', // Auto-adjusts based on slide width, or you can use numbers
    navigation: {
      prevEl: `.${styles.leftArrow}`, // Use CSS module class for prev button
      nextEl: `.${styles.rightArrow}`, // Use CSS module class for next button
    },
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 7, // Adjust based on your card width and desired number of visible cards
        spaceBetween: 20,
      },
    },
    onSwiper: (swiper) => {
      swiperRef.current = swiper;
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    },
    onSlideChange: (swiper) => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    },
    onReachBeginning: () => setIsBeginning(true),
    onReachEnd: () => setIsEnd(true),
    onFromEdge: () => { // When moving away from an edge
        setIsBeginning(false);
        setIsEnd(false);
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <Swiper {...swiperParams}>
        {data.map((item) => (
          <SwiperSlide key={item.id} className={styles.swiperSlide}>
            {/* Render the component passed via renderComponent prop */}
            {renderComponent(item)}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className={styles.navigationWrapper}>
        {!isBeginning && ( // Only show left arrow if not at the beginning
          <div className={styles.leftArrow}>
            <LeftArrow onClick={() => swiperRef.current?.slidePrev()} />
          </div>
        )}
        {!isEnd && ( // Only show right arrow if not at the end
          <div className={styles.rightArrow}>
            <RightArrow onClick={() => swiperRef.current?.slideNext()} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Carousel;
