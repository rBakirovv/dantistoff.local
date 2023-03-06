define(['swiper'], Swiper => {
  return {
    init(element) {
      const swiper = new Swiper(element, {
        loop: true,
        slideToClickedSlide: true,
        slidesPerView: "auto",
        spaceBetween: 0,
        centeredSlides: true,
        pagination: {
          el: '.doctor-certificates-pagination',
          clickable: true,
          loop: true,
        },
        navigation: {
          nextEl: '.doctor-certificates-slider-next',
          prevEl: '.doctor-certificates-slider-prev',
        },
        breakpoints: {
          600: {
            centeredSlides: true,
            spaceBetween: 30,
            slidesPerView: "auto",
          },
        }
      })
    }
  }
})