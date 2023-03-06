define(() => {
  return {
    init(element) {
        pricingAccordionTitle = element.querySelector(".pricing-accordion__title"),
        pricingAccordionContent = element.querySelector(".accordion__content"),
        collapsBtn = element.querySelector(".accordion-item__collaps");

      // Accordion List Switch

      const switchAccordionList = (accordion) => {
        accordion.classList.toggle("accordion-disable")
      };

      const switchArrow = (btn, selector) => {
        btn.classList.toggle(selector)
      };

      pricingAccordionTitle.addEventListener("click", function () {
        switchAccordionList(pricingAccordionContent);
        switchArrow(pricingAccordionTitle, "pricing-accordion__title-disabled");
      });

      collapsBtn.addEventListener("click", function () {
        switchAccordionList(pricingAccordionContent);
        switchArrow(pricingAccordionTitle, "pricing-accordion__title-disabled");
      });
    }
  }
})