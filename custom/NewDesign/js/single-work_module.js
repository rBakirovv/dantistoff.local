define(() => {

  return {

    init(element) {
      const singleWorkMore = element.querySelector(".singe-work__service-image-more-container");
      const singleWorkKT = element.querySelector(".singe-work__service-image_kt");
      const singleWorkText = element.querySelector(".singe-work__service-image-more-text");
      const singleWorkMark = element.querySelector(".singe-work__service-image-mark");
      const singleWorkImage = element.querySelector(".singe-work__service-image");
      const singleWorkImageMore = element.querySelector(".singe-work__service-image-more");
      if (element.querySelector(".singe-work__service-image-more-container")) {
        singleWorkMore.addEventListener("click", () => {
          if (singleWorkKT.classList.contains("singe-work__service-image_kt-active")) {
            singleWorkText.textContent = "Смотреть снимок КТ";
            singleWorkImageMore.src = singleWorkKT.src;
          }

          if (!singleWorkKT.classList.contains("singe-work__service-image_kt-active") && (singleWorkMark.textContent === "До" || singleWorkMark.textContent === "ДО")) {
            singleWorkText.textContent = "Смотреть снимок до";
            singleWorkImageMore.src = singleWorkImage.src;
          }

          if (!singleWorkKT.classList.contains("singe-work__service-image_kt-active") && (singleWorkMark.textContent === "После" || singleWorkMark.textContent === "ПОСЛЕ")) {
            singleWorkText.textContent = "Смотреть снимок после";
            singleWorkImageMore.src = singleWorkImage.src;
          }
          singleWorkKT.classList.toggle("singe-work__service-image_kt-active");
        })
      }
    },

  };

});