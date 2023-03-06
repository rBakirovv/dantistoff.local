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
          el: '.doctor-rewiev-pagination',
          clickable: true,
          loop: true,
        },
        navigation: {
          nextEl: '.doctor-rewiev-slider-next',
          prevEl: '.doctor-rewiev-slider-prev',
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