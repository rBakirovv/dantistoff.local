define(() => {

  return {

    init(element, d) {
      const popupReviews = d.querySelector(".popup-reviews");
      const popupReviewsCardReview = popupReviews.querySelector(".doctor-reviews__card-review-container");
      const popupReviewsCardTitle = popupReviews.querySelector(".doctor-reviews__card-title");
      const popupReviewsCardSubtitle = popupReviews.querySelector(".doctor-reviews__card-subtitle");
      const popupImageButtons = d.querySelectorAll(".doctor-reviews__card-more");

      function openReviewsPopup(e) {
        popupReviewsCardReview.innerHTML = e.target.closest(".doctor-reviews__card-container").querySelector(".doctor-reviews__card-review-container").innerHTML;
        popupReviewsCardTitle.innerHTML = e.target.closest(".doctor-reviews__card-container").querySelector(".doctor-reviews__card-title").innerHTML;
        popupReviewsCardSubtitle.textContent = e.target.closest(".doctor-reviews__card-container").querySelector(".doctor-reviews__card-subtitle").textContent;
        popupReviews.classList.add("popup_opened");
      }

      function closeReviewsPopup() {
        popupReviews.classList.remove("popup_opened");
        popupReviewsCardReview.innerHTML = "";
        popupReviewsCardTitle.innerHTML = "";
        popupReviewsCardSubtitle.textContent = "";
      }

      popupReviews.addEventListener("click", (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          closeReviewsPopup();
        }
        if (evt.target.classList.contains('popup-reviews-close')) {
          closeReviewsPopup();
        }
      })

      popupImageButtons.forEach(element => {
        element.addEventListener("click", openReviewsPopup);
      });
    }
  }
})