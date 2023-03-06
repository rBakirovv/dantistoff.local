define(() => {

	return {

		init(element) {
			const title = element.querySelector(".serve-accordion__title");
			const list = element.querySelector(".serves-accordion__list");
			title.addEventListener("click", e => {
				e.preventDefault();
				if (!title.classList.contains("serve-accordion__title-disable")) {
					element.style.overflow = "hidden";
				} else {
					setTimeout(() => element.style.overflow = "visible", 200);
				}
				list.classList.toggle('accordion-disable');
				title.classList.toggle('serve-accordion__title-disable');
			});
		},

	};

});