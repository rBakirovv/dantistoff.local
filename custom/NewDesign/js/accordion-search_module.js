define(() => {
  return {
    init(element) {
      const searchRes = element.querySelector(".search__res"),
        searchBtn = element.querySelector(".search__btn"),
        searchInput = element.querySelector(".search__input"),
        searchValue = element.querySelector("#search__value"),
        searchImg = element.querySelector(".search-btn__img"),
        loader = element.querySelector(".loader"),
        cross = element.querySelector(".search-btn__cross"),
        accordions = element.querySelectorAll(".serves__accordion"),
        subaccordions = element.querySelectorAll(".serves-accordion-list__subitem"),
        subcategories = element.querySelectorAll(".accordion__group-container"),
        accordionSubitemList = element.querySelectorAll(
          ".serves-accordion-subitem__list",
        ),
        accordionList = element.querySelectorAll(
          ".serves-accordion__list",
        );

      const insertMark = (string, pos, len) => {
        return pos !== -1 ? string.slice(0, pos) + '<mark>' + string.slice(pos, pos + len) + '</mark>' + string.slice(pos + len) : string;
      };

      const searchFunc = (input) => {
        const searchTitle = element.querySelectorAll(".serves-accordion-text__parent-title");
        let value = input.value.trim();
        searchImg.style.display = "none";
        loader.style.display = "block";
        cross.style.display = "none";
        setTimeout(() => {
          searchImg.style.display = "block";
          loader.style.display = "none";
          if (value !== "") {
            searchRes.style.display = "block";
            searchImg.style.display = "none";
            cross.style.display = "block";
            searchTitle.forEach((title) => {
              const accordionActiveItem = title.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
              const accordionSubcategoryActiveItem = title.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
              const accordionInAccordionActiveItem = title.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

              if (title.innerText.toLowerCase().search(value.toLowerCase()) == -1) {
                title.parentNode.parentNode.parentNode.parentNode.classList.add("hide");
                title.innerHTML = title.innerText;

                accordionList.forEach((accordionListItem, index) => {
                  if (!accordionListItem.querySelector(".serves-accordion-list__subitem")) {
                    if (
                      accordionListItem.querySelectorAll(".price-table-accordion__list-item").length ===
                      accordionListItem.querySelectorAll(".price-table-accordion__list-item.hide").length
                    ) {
                      accordionListItem.parentNode.classList.add("hide");
                    } else {
                      accordionListItem.parentNode.classList.remove("hide");
                    }
                  }
                });

                accordionList.forEach((accordionListItem, index) => {
                  if (
                    accordionListItem.querySelector(".serves-accordion-list__subitem")
                  ) {
                    if (
                      accordionListItem.querySelectorAll(".serves-accordion-list__subitem").length ===
                      accordionListItem.querySelectorAll(".serves-accordion-list__subitem.hide").length
                    ) {
                      accordionListItem.parentNode.classList.add("hide");
                    } else {
                      accordionListItem.parentNode.classList.remove("hide");
                    }
                  }
                });

                accordionSubitemList.forEach((accordionListItem) => {
                  if (
                    accordionListItem.querySelectorAll(".price-table-accordion__list-item").length ==
                    accordionListItem.querySelectorAll(".price-table-accordion__list-item.hide").length
                  ) {
                    accordionListItem.parentNode.classList.add("hide");
                  } else {
                    accordionListItem.parentNode.classList.remove("hide");
                  }
                });

                subcategories.forEach((subcategoryItem) => {
                  if (
                    subcategoryItem.querySelectorAll(".price-table-accordion__list-item").length === subcategoryItem.querySelectorAll(".hide").length
                  ) {
                    subcategoryItem.classList.add("hide");
                  } else {
                    subcategoryItem.classList.remove("hide");
                  }
                })

              } else if (title.innerText.toLowerCase().search(value.toLowerCase()) !== -1) {
                title.parentNode.parentNode.parentNode.parentNode.classList.remove("hide");

                let str = title.innerText;

                title.innerHTML = insertMark(
                  str,
                  title.innerText.toLowerCase().search(value.toLowerCase()),
                  value.length
                );

                // Открывать аккордеоны при поиске
                if (accordionActiveItem.classList.contains("serves-accordion-list__subitem")) {
                  accordionActiveItem.querySelector(".serves-accordion-subitem__list").classList.remove("accordion-disable");
                  accordionActiveItem.querySelector(".serves-accordion-subitem__title").classList.remove("serves-accordion-subitem__title-disable");
                  accordionActiveItem.style.overflow = "visible";
                }

                if (accordionActiveItem.classList.contains("serves__accordion")) {
                  accordionActiveItem.querySelector(".serves-accordion__list").classList.remove("accordion-disable");
                  accordionActiveItem.querySelector(".serve-accordion__title").classList.remove("serve-accordion__title-disable");
                  accordionActiveItem.style.overflow = "visible";

                  accordionInAccordionActiveItem.querySelector(".serves-accordion__list").classList.remove("accordion-disable");
                  accordionInAccordionActiveItem.querySelector(".serve-accordion__title").classList.remove("serve-accordion__title-disable");
                  accordionInAccordionActiveItem.style.overflow = "visible";

                  accordionSubcategoryActiveItem.querySelector(".serves-accordion__list").classList.remove("accordion-disable");
                  accordionSubcategoryActiveItem.querySelector(".serve-accordion__title").classList.remove("serve-accordion__title-disable");
                  accordionSubcategoryActiveItem.style.overflow = "visible";
                }

                if (accordionSubcategoryActiveItem.classList.contains("serves__accordion")) {
                  accordionSubcategoryActiveItem.querySelector(".serves-accordion__list").classList.remove("accordion-disable");
                  accordionSubcategoryActiveItem.querySelector(".serve-accordion__title").classList.remove("serve-accordion__title-disable");
                  accordionSubcategoryActiveItem.style.overflow = "visible";
                }
              }
            });
          } else {
            cross.style.display = "none";
            searchRes.style.display = "none";
            searchTitle.forEach((title) => {
              title.parentNode.parentNode.parentNode.parentNode.classList.remove("hide");
              title.innerHTML = title.innerText;
            });

            accordionList.forEach((accordionList) => {
              accordionList.parentNode.classList.remove("hide");
            });

            accordionSubitemList.forEach((accordionList) => {
              accordionList.parentNode.classList.remove("hide");
            });

            // Вернуть аккордеоны в иходное состояние 
            subaccordions.forEach((item, key) => {
              if (key !== 0) {
                subaccordions[key].querySelector(".serves-accordion-subitem__list").classList.add("accordion-disable");
                subaccordions[key].querySelector(".serves-accordion-subitem__title").classList.add("serves-accordion-subitem__title-disable");
                subaccordions[key].style.overflow = "hidden";
              }
            })

            accordions.forEach((item, key) => {
              if (key !== 0) {
                accordions[key].querySelector(".serves-accordion__list").classList.add("accordion-disable");
                accordions[key].querySelector(".serve-accordion__title").classList.add("serve-accordion__title-disable");
                accordions[key].style.overflow = "hidden";
              }
            })

            subcategories.forEach((subcategory) => {
              subcategory.classList.remove("hide");
            });
          }
        }, 500);
        searchValue.innerHTML = value;
      };

      searchInput.addEventListener("input", () => {
        searchFunc(searchInput);
      });

      searchBtn.addEventListener("click", () => {
        if (searchInput.value != "") {
          searchInput.value = "";
          searchFunc(searchInput);
        }
      });
    }
  }
})