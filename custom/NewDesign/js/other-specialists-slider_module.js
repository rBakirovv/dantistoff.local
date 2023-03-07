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
          el: '.slider-doctor-pagination',
          clickable: true,
          loop: true,
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