'use strict';
define(['swiper'], function(Swiper){

	let module = {
	
		init(c){
		
			//return;
			if(!c.offsetParent) return this.destroy(c);
			
			let swiper = c.swiper;
			let wrapper = c.firstElementChild;
			if(!c.slides) c.slides = Array.from(wrapper.children);
			let slides = c.slides;
			if(slides.length <= 1) return;
			slides.forEach((slide, index) => {
				slide.classList.add('swiper-slide');
				slide.dataset.index = index;
			});
			c.classList.add('swiper-container');
			wrapper.classList.add('swiper-wrapper');
	
			const pagination_element = wrapper.dataset.pagination || c.querySelector('.pagination, .swiper-pagination') || c.parentNode.querySelector(':scope > .pagination, :scope > .swiper-pagination');
			c.pagination = pagination_element;
			const next = c.querySelector('.next, .swiper-next, .slider-button-next') || c.parentNode.querySelector(':scope > .next, :scope > .swiper-next, :scope > .slider-button-next');
			const prev = c.querySelector('.prev, .swiper-prev, .slider-button-prev') || c.parentNode.querySelector(':scope > .prev, :scope > .swiper-prev, :scope > .slider-button-prev');
			const wrapper_style = window.getComputedStyle(wrapper);
			if(!wrapper_style.flexWrap || wrapper_style.flexWrap == 'wrap')
			{
				return this.destroy(c);
			}

			if(c.classList.contains('centered-on-mobile') && Gooru.isMobile())
			{
				c.classList.add('centered');
			}
			const is_centered = c.classList.contains('centered');
			const dir = !c.classList.contains('vertical') ? 'horizontal' : 'vertical';
			const li = slides[0];
			if(dir == 'horizontal')
			{
				if(wrapper_style.flexDirection == 'column') return this.destroy(c);
				if(!is_centered)
				{
					const total_children_width = slides.reduce((len, item) => { return len + item.offsetWidth; } , 0);
					if(total_children_width <= wrapper.offsetWidth)
					{
						return this.destroy(c);
					}
				}
			}
			else
			{
				if(wrapper_style.flexDirection == 'row') return this.destroy(c);
				const total_children_height = slides.reduce((len, item) => { return len + item.offsetHeight; } , 0);
				if(total_children_height <= wrapper.offsetHeight)
				{
					return this.destroy(c);
				}
			}

			if(swiper)
			{
				swiper.update();
				return;
			}

			let auto_value = wrapper.dataset.auto;
			if(auto_value == undefined)
			{
				auto_value = document.body.dataset.carouselAuto;
				if(auto_value === '') auto_value = 5000;
			}
			if(auto_value)
			{
				auto_value = parseInt(auto_value);
				if(isNaN(auto_value) || auto_value <= 0) auto_value = false;
			}
			if(auto_value) auto_value = {delay: auto_value, disableOnInteraction : true};
	
			const num = wrapper.dataset.num || 'auto';
			let num_scroll = wrapper.dataset.numScroll || -1;
			let calculated_num;
			if(num_scroll == -1)
			{
				num_scroll = 1;
				if(li)
				{
					const style = window.getComputedStyle(li);
					const li_w = style.boxSizing != 'border-box' ? parseFloat(style.width) : li.offsetWidth;
					if(li_w > 0)
					{
						const margin = parseInt(style.marginRight) || 0;
						const w_big = parseInt(c.offsetWidth);
						num_scroll = (w_big - margin) / li_w;
						num_scroll = Math.floor(num_scroll);
						if(num_scroll <= 0) num_scroll = 1;
						calculated_num = num_scroll;
					}
				}
			}
			let opts = {
				observer : true,
				slidesPerView : num,
				slidesPerGroup : num_scroll,
				pagination:
				{
					el: pagination_element,
					clickable: true,
					bulletElement: 'a'
				},
				navigation: {
					nextEl: next,
					prevEl: prev,
				},
				direction: dir,
				speed: 600,
			};
			if(wrapper.dataset.fx == 'crossfade') opts.effect = 'fade';
			if(auto_value) opts.autoplay = auto_value;
			if(c.classList.contains('centered'))//&& calculated_num != 1
			{
				opts.loop = true;
				opts.centeredSlides = true;
				opts.slidesPerGroup = 1;
				if(!wrapper.dataset.noNextClick)
				{
					opts.slideToClickedSlide = true;
				}
				else
				{
					opts.slideToClickedSlide = false;
				}
				opts.on = {
					init : function(){
						wrapper.querySelectorAll('img').forEach(img => do_src(img));
						observe(wrapper.querySelectorAll('.swiper-slide-duplicate .video-player'), element => {
							element.player = null;
							require(['video'], VideoPlayer => {
								const player = new VideoPlayer(element);
							});
						});
					},
					slideChange : function(){
						require(['video'], VideoPlayer => {
							VideoPlayer.stopAll();
						});
					}
				};
			}
			if(c.dataset.params)
			{
				const params = JSON.parse(c.dataset.params);
				if(params && typeof params == 'object')
				{
					opts = Object.assign(opts, params);
				}
			}
			const mySwiper = new Swiper(c, opts);
			if(opts.autoplay)
			{
				c.addEventListener('mouseenter', () => mySwiper.autoplay.stop());
				c.addEventListener('mouseleave', () => mySwiper.autoplay.start());
			}
			if(wrapper.dataset.nextClick)
			{
				slides.forEach(slide => {
					slide.addEventListener('click', e => {
						e.preventDefault();
						mySwiper.slideNext();
					});
				});
			}
			if(c.dataset.controller)
			{
				const controller_c = document.querySelector(c.dataset.controller);
				if(controller_c && controller_c.swiper && controller_c.offsetParent && c.offsetParent)
				{
					controller_c.swiper.controller.control = mySwiper;
					mySwiper.controller.control = controller_c.swiper;
				}
			}
			c.swiper = mySwiper;
		},

		destroy(c){
			if(c.swiper)
			{
				if(c.dataset.controller)
				{
					const controller_c = document.querySelector(c.dataset.controller);
					if(controller_c && controller_c.swiper) controller_c.swiper.controller.control = null;
				}
				c.swiper.controller.control = null;
				c.swiper.destroy(true, true);
				c.swiper = null;
			}
			c.slides = null;
			if(c.pagination)
			{
				c.pagination.innerHTML = '';
				c.pagination.classList.remove('swiper-pagination-clickable');
			}
			//if(c.firstElementChild) c.firstElementChild.classList.remove('swiper-wrapper');
			//c.classList.remove('swiper-container');
			//if(c.slides)
			//{
			//	c.slides.forEach(slide => slide.classList.remove('swiper-slide'));
			//}
		},
	}

	return module;
});