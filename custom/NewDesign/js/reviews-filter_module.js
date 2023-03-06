define(['isotope'], Isotope => {

  return {

    init(element, d) {
      const filterPoints = d.querySelectorAll(".filter-point");
      const doctorsListItem = d.querySelectorAll(".list_doctors");
      const worksListItem = d.querySelectorAll(".list_works");
      const doctorsReviewsDropdown = d.querySelector(".doctors-dropdown_doctors-reviews");
      const doctorsWorksDropdown = d.querySelector(".doctors-dropdown_doctors-works");
      const resetFilterButtons = d.querySelectorAll(".doctors-list__sorting-title-delete");

      var doctorsFilter = new Isotope(element, {
        itemSelector: '.doctor-reviews__card-container',
        layoutMode: 'masonry'
      });

      doctorsListItem.forEach((item) => {
        item.addEventListener("click", () => {
          doctorsListItem.forEach((el) => {
            el.classList.remove("doctors-list__sorting-list_doctors_active");
            el.classList.remove("doctors-list__sorting-list-item_active");
          })
        })
      })

      doctorsListItem.forEach((item) => {
        item.addEventListener("click", () => {
          item.classList.add("doctors-list__sorting-list_doctors_active");
          item.classList.add("doctors-list__sorting-list-item_active");
        })
      })

      worksListItem.forEach((item) => {
        item.addEventListener("click", () => {
          worksListItem.forEach((el) => {
            el.classList.remove("doctors-list__sorting-list_works_active");
            el.classList.remove("doctors-list__sorting-list-item_active");
          })
        })
      })

      worksListItem.forEach((item) => {
        item.addEventListener("click", () => {
          item.classList.add("doctors-list__sorting-list_works_active");
          item.classList.add("doctors-list__sorting-list-item_active");
        })
      })

      let doctorsReviews = !d.querySelector(".doctors-list__sorting-list_doctors_active") ? "" : d.querySelector(".doctors-list__sorting-list_doctors_active").dataset.filter;
      let doctorsWorks = !d.querySelector(".doctors-list__sorting-list_works_active") ? "" : d.querySelector(".doctors-list__sorting-list_works_active").dataset.filter;

      filterPoints.forEach(el => {
        resetFilterButtons.forEach((resetItem) => {
          resetItem.addEventListener("click", (e) => {

            if (e.target.closest(".doctors-dropdown_doctors-reviews")) {
              doctorsReviews = "";
              doctorsReviewsDropdown.querySelector(".doctors-dropdown__text-span").textContent = "Все врачи";

              doctorsListItem.forEach((el) => {
                el.classList.remove("doctors-list__sorting-list_doctors_active");
                el.classList.remove("doctors-list__sorting-list-item_active");
              })
            }

            if (e.target.closest(".doctors-dropdown_doctors-works")) {
              doctorsWorks = "";
              doctorsWorksDropdown.querySelector(".doctors-dropdown__text-span").textContent = "Все работы";

              worksListItem.forEach((el) => {
                el.classList.remove("doctors-list__sorting-list_works_active");
                el.classList.remove("doctors-list__sorting-list-item_active");
              })
            }

            doctorsFilter.arrange({
              filter: `${doctorsReviews}${doctorsWorks}`
            });
          })
        })

        el.addEventListener("click", (e) => {
          if (e.target.closest(".list_doctors")) {
            doctorsReviews = e.currentTarget.dataset.filter;

            if (doctorsReviewsDropdown) {
              doctorsReviewsDropdown.querySelector(".doctors-dropdown__text-span").textContent = e.currentTarget.querySelector(".singe-work__service-doctor-name").textContent;
            }
          }

          if (e.target.closest(".list_works")) {
            doctorsWorks = e.currentTarget.dataset.filter;

            if (doctorsWorksDropdown) {
              doctorsWorksDropdown.querySelector(".doctors-dropdown__text-span").textContent = e.currentTarget.querySelector(".doctors-list-works-text").textContent;
            }
          }

          doctorsFilter.arrange({
            filter: `${doctorsReviews}${doctorsWorks}`
          });
        })
      })

      doctorsReviewsDropdown.addEventListener("click", () => {
        doctorsWorksDropdown.classList.remove("doctors-dropdown_active");
      })

      doctorsWorksDropdown.addEventListener("click", () => {
        doctorsReviewsDropdown.classList.remove("doctors-dropdown_active");
      })
    }
  }
})