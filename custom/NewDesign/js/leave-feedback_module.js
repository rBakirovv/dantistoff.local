define(() => {
  return {
    init(element, d) {
      const doctorReviewsPopup = d.querySelector(".popup-doctor-reviews");

      function openDoctorReviewsPopup() {
        doctorReviewsPopup.classList.add("popup_opened");
      }

      function closeDoctorReviewsPopup() {
        doctorReviewsPopup.classList.remove("popup_opened");
      }

      doctorReviewsPopup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          closeDoctorReviewsPopup();
        }
        if (evt.target.classList.contains('popup__feedback-close')) {
          closeDoctorReviewsPopup();
        }
      })

      element.addEventListener("click", openDoctorReviewsPopup)
    }
  }
})