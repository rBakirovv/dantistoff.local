define(() => {
  return {
    init(element, d) {
      window.addEventListener("scroll", () => {
        const content = d.querySelector("#content");

        if (content && element && window.scrollY > content.offsetTop) {
          element.style.maxHeight = "none";
        }

        if (content && element && window.scrollY <= content.offsetTop) {
          element.style.maxHeight = "550px";
        }
      })
    }
  }
})