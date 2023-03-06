define(function(){return {

	init_no_transition(element){
		element.querySelectorAll('.level1').forEach(c => {
			c.classList.add('fixleft');
			const a = c.previousElementSibling;
			if(a && a.tagName == 'A')
			{
				a.addEventListener('click', e => {
					if(window.getComputedStyle(c).position == 'static')
					{
						e.preventDefault();
						c.classList.toggle('selected');
						a.classList.toggle('selected');
					}
				});
			}
		});
		element.addEventListener('mouseenter', e => {
			const style = window.getComputedStyle(element);
			let delay = parseFloat(style.transitionDelay) || 0.05;
			let duration = parseFloat(style.transitionDuration) || delay;
			delay = (delay + duration) * 1000;
			setTimeout(function(){
				if(element.matches(':hover'))
				{
					element.classList.add('no-transition');
				}
			}, delay);
		});
		element.addEventListener('mouseleave', e => {
			element.classList.remove('no-transition');
		});
	},

	toggle_menu(element){
		element.addEventListener('click', e => {
			e.preventDefault();
			const siblings = Array.from(element.parentElement.children);
			if(!element.classList.contains('selected'))
			{
				element.classList.add('selected');
				siblings.forEach(s => {
					s.classList.remove('adaptive-hidden');
					s.classList.add('adaptive-visible');
				});
			}
			else
			{
				element.classList.remove('selected');
				siblings.forEach(s => {
					s.classList.add('adaptive-hidden');
					s.classList.remove('adaptive-visible');
				});
			}
		});
	},

	init_splash(element){
		const menu = element.previousElementSibling;
		if(menu)
		{
			const ul = menu.querySelector('.level0');
			if(ul)
			{
				ul.addEventListener('mouseenter', e => menu.classList.add('splashed'));
				ul.addEventListener('mouseleave', e => menu.classList.remove('splashed'));
			}
		}
	},

	toggle_footer_submenu(element){
		const ul = element.nextElementSibling;
		if(ul) ul.style.display = ul.offsetParent ? 'none' : 'block';
	},

	fixleft(ul){
		if(ul.fixleft_listener)
		{
			ul.fixleft_listener();
			return;
		}
		const p = ul.parentElement;
		ul.fixleft_listener = function(){
			const x = Gooru.offset(p).left + ul.offsetWidth - document.documentElement.clientWidth;
			ul.style.left = x > 0 ? -x + 'px' : '';
			if(window.getComputedStyle(ul).overflowY == 'auto')
			{
				ul.style.maxHeight = document.body.clientHeight + window.scrollY - Gooru.offset(ul).top + 'px';
			}
			ul.classList.add('fixleft-opened');
		}
		p.addEventListener('mouseenter', ul.fixleft_listener);
		p.addEventListener('mouseleave', e => {
			ul.classList.remove('fixleft-opened');
		});
	},

	init_slide_wh(element){
		element.addEventListener('click', e => {
			e.preventDefault();
			if(!element.c)
			{
				element.c = document.getElementById('address-wh-slide-content');
				if(element.c)
				{
					element.c.resize_handler = function(){
						const top = document.getElementById('top');
						element.c.style.top = (top ? top.offsetHeight : Gooru.getTopOffset()) + 'px';
					}
					window.addEventListener('resize', element.c.resize_handler);
					element.c.resize_handler();
				}
			}
			if(element.c) element.c.classList.toggle('selected');
		});
	},


}})