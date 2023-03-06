define(() => {
  return {
    init(element) {
      const moreButton = element.querySelector(".accordion-more-button") ? element.querySelector(".accordion-more-button") : element.parentNode.querySelector(".accordion-more-button");

      moreButton.addEventListener("click", () => openArticle(element))

      function openArticle(article) {
        article.classList.add("accordion-more-active");
        moreButton.style.display = "none";
      }
    }
  }
})