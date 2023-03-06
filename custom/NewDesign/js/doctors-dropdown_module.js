define(() => {

  return {

    init(element) {
      function handleDropdownClick(e) {
        if (!e.target.classList.contains("doctors-list__sorting-title-delete")) {
          element.classList.toggle("doctors-dropdown_active");
        }
      }
      element.addEventListener("click", handleDropdownClick)
    }
  }
})