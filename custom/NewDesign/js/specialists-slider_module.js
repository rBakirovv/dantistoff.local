define(['swiper'], Swiper => {

  return {

    init() {
      const specialistsDantistoffSlider = new Swiper('.specialists-dantistoff__slider', {
        loop: true,
        initialSlide: 0,
        slidesPerView: 1,
        loopedSlides: 3,
        navigation: {
          nextEl: '.slider-next',
          prevEl: '.slider-prev',
        },
      });

      const specialistsDantistoffPreview = new Swiper('.specialists-dantistoff__preview-container', {
        loop: true,
        slidesPerView: "auto",
        slideToClickedSlide: true,
        centeredSlides: true,
        spaceBetween: 15,
        navigation: {
          nextEl: '.slider-next',
          prevEl: '.slider-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        breakpoints: {
          750: {
            spaceBetween: 20,
          }
        }
      });

      specialistsDantistoffSlider.controller.control = specialistsDantistoffPreview;
      specialistsDantistoffPreview.controller.control = specialistsDantistoffSlider;
    },

  };

});