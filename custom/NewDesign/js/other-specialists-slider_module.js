define(['swiper'], Swiper => {

  return {

    init(element) {
      const swiper = new Swiper(element, {
        loop: true,
        slideToClickedSlide: true,
        slidesPerView: "auto",
        spaceBetween: 0,
        centeredSlides: true,
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