define(() => {
  return {
    init(element, d) {
      const popup = d.querySelector(".popup-elements");
      const popupImage = popup.querySelector(".popup__img-full-size");

      function openImagePopup(imageItem) {
        popupImage.src = imageItem.src;
        popup.classList.add("popup_opened");
      }

      function closePopup() {
        popup.classList.remove("popup_opened");
        popupImage.src = "";
      }

      popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          closePopup();
        }
        if (evt.target.classList.contains('popup__button-clouse')) {
          closePopup();
        }
      })

      element.addEventListener("click", () => openImagePopup(element));
    }
  }
})