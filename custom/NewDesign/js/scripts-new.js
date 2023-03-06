function NewDesign_init(context) {
	const d = getContext(context);

	observe(d.querySelectorAll(".serves__accordion"), element => {
		require(['/custom/NewDesign/js/accordion_module.js'], module => module.init(element));
	});

	observe(d.querySelectorAll(".serves-accordion-list__subitem"), element => {
		require(['/custom/NewDesign/js/subaccordion_module.js'], module => module.init(element));
	});

	observe(d.querySelectorAll(".serves__search-container"), element => {
		require(['/custom/NewDesign/js/accordion-search_module.js'], module => module.init(element));
	});

	observe(d.querySelectorAll(".pricing__accordion"), element => {
		require(['/custom/NewDesign/js/accordion-price-article_module.js'], module => module.init(element));
	});

	observe(d.querySelectorAll(".specialists-dantistoff__slider"), () => {
		require(['/custom/NewDesign/js/specialists-slider_module.js'], module => module.init());
	});

	observe(d.querySelectorAll(".doctor-rewiev-slider"), element => {
		require(['/custom/NewDesign/js/doctor-rewiev-slider_module.js'], module => module.init(element));
	});

	observe(d.querySelectorAll(".accordion-more"), element => {
		require(['/custom/NewDesign/js/accordion-article_module.js'], module => module.init(element));
	});

	observe(d.querySelectorAll(".doctor-nav"), element => {
		require(['/custom/NewDesign/js/doctor-nav_module.js'], module => module.init(element, d));
	});

	observe(d.querySelectorAll(".doctor-works__slider-container"), element => {
		require(['/custom/NewDesign/js/doctor-before-after-slider_module.js'], module => module.init(element));
	});

	observe(d.querySelectorAll(".slider-before-after"), element => {
		require(['/custom/NewDesign/js/before-after_module.js'], module => module.init(element));
	});

	observe(d.querySelectorAll(".image-thumbnail"), element => {
		require(['/custom/NewDesign/js/image-popup_module.js'], module => module.init(element, d));
	});

	observe(d.querySelectorAll(".doctor-certificates__slider-container"), element => {
		require(['/custom/NewDesign/js/doctor-certificates-slider_module.js'], module => module.init(element));
	});

	observe(d.querySelectorAll(".pricing-sidebar"), element => {
		require(['/custom/NewDesign/js/pricing-sidebar_module.js'], module => module.init(element, d));
	});

	observe(d.querySelectorAll(".other-specialists__slider"), element => {
		require(['/custom/NewDesign/js/other-specialists-slider_module.js'], module => module.init(element));
	});

	observe(d.querySelectorAll(".singe-work__service-image-container"), element => {
		require(['/custom/NewDesign/js/single-work_module.js'], module => module.init(element));
	});

	observe(d.querySelectorAll(".doctors-list__cards-container"), element => {
		require(['/custom/NewDesign/js/doctors-filter_module.js'], module => module.init(element, d));
	});

	observe(d.querySelectorAll(".doctors-dropdown"), element => {
		require(['/custom/NewDesign/js/doctors-dropdown_module.js'], module => module.init(element));
	});

	observe(d.querySelectorAll(".doctor-reviews__card-container"), element => {
		require(['/custom/NewDesign/js/doctor-reviews-popup_module.js'], module => module.init(element, d));
	});

	observe(d.querySelectorAll(".doctor-reviews__cards-container"), element => {
		require(['/custom/NewDesign/js/reviews-filter_module.js'], module => module.init(element, d));
	});
}

if (window.init_functions) {
	init_functions.push(NewDesign_init);
}