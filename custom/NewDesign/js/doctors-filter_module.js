define(['isotope'], Isotope => {

  return {

    init(element, d) {
      const clinicsList = d.querySelectorAll(".doctors-list__clinic-item");
      const specializationsList = d.querySelectorAll(".doctors-list__specialization-lsit-item");
      const filterPoints = d.querySelectorAll(".filter-point");
      const clinicsDropdown = d.querySelector(".doctors-dropdown_clinics");
      const specializationsDropdown = d.querySelector(".doctors-dropdown_specializations");

      var doctorsFilter = new Isotope(element, {
        itemSelector: '.other-specialists__slider-item',
        layoutMode: 'masonry'
      });

      clinicsList.forEach(el => {
        el.addEventListener("click", () => {
          clinicsList.forEach(el => {
            el.classList.remove('doctors-list__clinic-item_active');
            el.classList.remove('doctors-list__clinic-item_active-purple');
            el.classList.remove('doctors-list__clinic-item_active-orange');
            el.classList.remove('doctors-list__clinic-item_active-yellow');
            el.classList.remove('doctors-list__clinic-item_active-white');
          })
        })
      })

      clinicsList.forEach(el => {
        el.addEventListener("click", (e) => {
          el.classList.toggle('doctors-list__clinic-item_active');

          if (e.target.closest(".doctors-list__clinic-item").classList.contains("doctors-list__clinic-item_purple")) {
            el.classList.toggle("doctors-list__clinic-item_active-purple")
          }

          if (e.target.closest(".doctors-list__clinic-item").classList.contains("doctors-list__clinic-item_orange")) {
            el.classList.toggle("doctors-list__clinic-item_active-orange")
          }

          if (e.target.closest(".doctors-list__clinic-item").classList.contains("doctors-list__clinic-item_yellow")) {
            el.classList.toggle("doctors-list__clinic-item_active-yellow")
          }

          if (e.target.closest(".doctors-list__clinic-item").classList.contains("doctors-list__clinic-item_white")) {
            el.classList.toggle("doctors-list__clinic-item_active-white")
          }
        })
      });

      specializationsList.forEach(el => {
        el.addEventListener("click", () => {
          specializationsList.forEach(el => {
            el.classList.remove('doctors-list__specialization-lsit-item_active');
          })
        })
      })

      specializationsList.forEach(el => {
        el.addEventListener("click", (e) => {
          el.classList.toggle('doctors-list__specialization-lsit-item_active');
        })
      })

      filterPoints.forEach(el => {
        el.addEventListener("click", (e) => {
          let filterClinic = d.querySelector(".doctors-list__clinic-item_active").dataset.filter === "*" ? "" : d.querySelector(".doctors-list__clinic-item_active").dataset.filter;
          let filterDocPosition = d.querySelector(".doctors-list__specialization-lsit-item_active").dataset.filter === "*" ? "" : d.querySelector(".doctors-list__specialization-lsit-item_active").dataset.filter;

          if (e.target.closest(".doctors-list__clinic-item")) {
            if (e.currentTarget.dataset.filter === "*") {
              filterClinic = "";
            } else {
              filterClinic = e.currentTarget.dataset.filter;
            }

            if (clinicsDropdown) {
              clinicsDropdown.querySelector(".doctors-dropdown__text").textContent = e.currentTarget.textContent;
            }
          }

          if (e.target.closest(".doctors-list__specialization-lsit-item")) {
            if (e.currentTarget.dataset.filter === "*") {
              filterDocPosition = "";
            } else {
              filterDocPosition = e.currentTarget.dataset.filter;
            }

            if (specializationsDropdown) {
              specializationsDropdown.querySelector(".doctors-dropdown__text").textContent = e.currentTarget.textContent;
            }
          }

          doctorsFilter.arrange({
            filter: `${filterClinic}${filterDocPosition}`
          });
        })
      })

      clinicsDropdown.addEventListener("click", () => {
        specializationsDropdown.classList.remove("doctors-dropdown_active");
      })

      specializationsDropdown.addEventListener("click", () => {
        clinicsDropdown.classList.remove("doctors-dropdown_active");
      })
    }
  }
})