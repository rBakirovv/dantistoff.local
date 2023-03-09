define(() => {
  return {
    init(element, d) {
      window.addEventListener("scroll", () => {
        const content = d.querySelector("#content");
        const main = d.querySelector(".main");

        if (content && element && window.scrollY > content.offsetTop) {
          element.style.maxHeight = "none";
        }

        if (content && element && window.scrollY <= content.offsetTop) {
          element.style.maxHeight = "550px";
        }

        if (content && element && window.scrollY > main.offsetTop) {
          element.style.paddingTop = "30px";
        } else {
          element.style.paddingTop = "0px";
        }
      })
    }
  }
})