define(() => {

  return {

    init(element, d) {
      window.addEventListener("scroll", () => {
        let scrollDistance = window.scrollY;
        const container = d.querySelector("#container");

        if (scrollDistance >= d.querySelector(".level0").clientHeight + d.querySelector(".icon-menu").clientHeight) {
          element.classList.add("doctor-nav_active")
        } else {
          element.classList.remove("doctor-nav_active")
        }

        container.querySelectorAll("section").forEach((el, index) => {
          if (el.offsetTop - element.clientHeight - d.querySelector("header").clientHeight <= scrollDistance) {
            d.querySelectorAll(".doctor-nav__link").forEach((el) => {
              if (el.classList.contains("doctor-nav__link_active")) {
                el.classList.remove("doctor-nav__link_active")
              }
            })

            d.querySelectorAll(".doctor-nav__link").forEach((linkEl) => {
              if (linkEl.getAttribute("href").includes(el.id)) {
                element.querySelector(`[href="${linkEl.getAttribute("href")}"]`).classList.add("doctor-nav__link_active")
              }
            })
          }
        })
      })
    }
  }
})