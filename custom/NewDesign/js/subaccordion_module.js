define(() => {

  return {

    init(element) {
      const title = element.querySelector(".serves-accordion-subitem__title");
      const list = element.querySelector(".serves-accordion-subitem__list");
      title.addEventListener("click", e => {
        e.preventDefault();
        if (!title.classList.contains("serves-accordion-subitem__title-disable")) {
          element.style.overflow = "hidden";
        } else {
          setTimeout(() => element.style.overflow = "visible", 200);
        }
        list.classList.toggle('accordion-disable');
        title.classList.toggle('serves-accordion-subitem__title-disable');
      });
    }
  }
});