define(['swiper'], Swiper => {
  return {
    init(element) {
      const swiper = new Swiper(element, {
        loop: true,
        allowTouchMove: true,
        slideToClickedSlide: false,
        slidesPerView: "auto",
        spaceBetween: 0,
        centeredSlides: true,
        pagination: {
          el: '.doctor-works-pagination',
          clickable: true,
          loop: true,
        },
        navigation: {
          nextEl: '.doctor-works-slider-next',
          prevEl: '.doctor-works-slider-prev',
        },
        breakpoints: {
          600: {
            allowTouchMove: false,
            slideToClickedSlide: false,
            centeredSlides: false,
            spaceBetween: 30,
            slidesPerView: "auto",
          },
        }
      })
    }
  }
})