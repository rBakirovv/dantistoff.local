'use strict';
define(() => {
	let module = {

		init_dd(opener){
			let dd = opener.dataset.dd ? document.querySelector(opener.dataset.dd) : opener.previousElementSibling;
			if(!dd) return;

			const opts = {
				element : opener,
			};
			if(opener.dataset.event) opts.event = opener.dataset.event;
			Gooru.delayEvent(opts, e => {
				if(is_mobile_device() && e.target.closest('.no-dd')) { }
				else if(dd.classList.contains('opened'))
				{
					if(is_mobile_device()) this.close_dd(dd, opener);
				}
				else
				{
					if(is_mobile_device()) e.preventDefault();
					this.show_dd(dd, opener, opts);
				}
			});
			if(!is_mobile_device())
			{
				opener.addEventListener('click', e => {
					/*if(!dd.classList.contains('opened') || opener.getAttribute('href') == '#') e.preventDefault();
					else 
					*/
					if(opener.dataset.href)
					{
						opener.stopDelayEvent = true;
						window.location.href = opener.dataset.href;
					}
				})
			}
		},

		clear_dd(dd){
			dd.preloaded = false;
			dd.innerHTML = '';
		},
		
		show_dd(dd, opener, opts = {})
		{
			if(!dd) return;
			if(!opener) opener = dd.parentElement.querySelector('.open-dd');
			let callback;
			if(typeof opts == 'function') callback = opts;
			else if(opts.callback) callback = opts.callback;
			if(dd.dataset.ajax && !dd.preloaded)
			{
				reload_url(dd, dd.dataset.ajax, { hide_loading : true }).then(data => {
					dd.preloaded = true;
					this.show_dd(dd, opener, opts);
				});
				return;
			}
			let min_width = opener.dataset.ddWidth;
			let min_height = opener.dataset.ddHeight;
			if(min_width != 'no')
			{
				if(!min_width || min_width.indexOf('%') == -1) min_width = parseInt(min_width) || opener.offsetWidth;
				if(min_width < 120) min_width = 120;
				if(min_width < opener.offsetWidth) min_width = opener.offsetWidth;
				let max_width = Math.round(opener.offsetWidth * 2);
				if(max_width < min_width) max_width = min_width;
				dd.style.minWidth = min_width + 'px';
				dd.style.maxWidth = max_width + 'px';
			}
			if(!isNaN(min_height) && min_height > 0) dd.style.height = min_height + 'px';

			if(!dd.resize)
			{
				dd.resize = function(opener){
					let t = opener.offsetTop + opener.offsetHeight;
					let l = opener.offsetLeft;
					let diff = Gooru.offset(opener).left + dd.offsetWidth - document.body.clientWidth;
					if(diff > 0)
					{
						l -= diff;
						if(l < 0) l = 0;
					}
					let max_height = document.documentElement.clientHeight || 0;
					if(window.getComputedStyle(dd).position != 'fixed') max_height -= t;
					if(max_height > 0) dd.style.maxHeight = max_height + 'px';
					dd.style.top = t + 'px';
					dd.style.left = l + 'px';
				}
				dd.resize(opener);
				window.addEventListener('resize', e => dd.resize(opener));
			}
			
			dd.classList.add('opened');
			opener.classList.add('selected');
			if(dd.classList.contains('adaptive-menu'))
			{
				document.body.classList.add('sandwitch-opened');
				document.body.classList.add('sandwitch-started');
				Gooru.onSwipe(dd, dd.classList.contains('position-left') ? 'left' : 'right', () => this.close_dd(dd, opener));
			}
			const event = opts.event || 'auto';
			closeOutside(dd, opener, event, () => this.close_dd(dd, opener));
			if(callback) callback.call(dd, dd);
			if(opts.delay)
			{
				setTimeout(() => {
					if(!dd.matches(':hover'))
					{
						this.close_dd(dd, opener);
					}
				}, opts.delay);
			}
			const close_button = dd.querySelector('.big-close');
			if(close_button && !close_button.close_dd_event)
			{
				close_button.close_dd_event = e => this.close_dd(dd, opener);
				close_button.addEventListener('click', close_button.close_dd_event);
			}
		},

		close_dd(dd, opener, opts = {}){
			if(!dd) return;
			let callback;
			if(typeof opts == 'function') callback = opts;
			else if(opts.callback) callback = opts.callback;
			const classes = dd.classList;
			if(!classes.contains('opened')) return;
			if(!opener) opener = dd.nextElementSibling;
			if(opener)
			{
				opener.classList.remove('selected');
				opener.blur();
			}
			classes.remove('opened');
			if(classes.contains('adaptive-menu'))
			{
				document.body.classList.remove('sandwitch-started');
				const duration = parseFloat(document.body.dataset.sandwitchDuration) * 1000 || 0;
				setTimeout(() => document.body.classList.remove('sandwitch-opened'), duration);
			}
			if(callback) callback.call(dd, dd);
		},

		init_dropdown(dd){
			Gooru.delayEvent(dd, e => {
				if(dd.classList.contains('dropdown-active'))
				{
					this.close_dropdown(dd);
				}
				else
				{
					const td = dd.closest('td');
					if(td) td.style.position = 'relative';
					const a = dd.querySelector('.selected > a');
					let t = dd.offsetTop;
					let l = dd.offsetLeft;
					const d = Gooru.createNode('<span class="dropdown-splash"></span>');
					if(a)
					{
						Object.assign(d.style, {
							display: window.getComputedStyle(a).display,
							width: a.offsetWidth + 'px',
							height: a.offsetHeight + 'px',
						});
					}
					dd.parentElement.insertBefore(d, dd);
					dd.classList.add('dropdown-active');
					if(a)
					{
						t -= a.offsetTop;
						l -= a.offsetLeft;
					}
					dd.style.left = l + 'px';
					dd.style.top = t + 'px';
					closeOutside(dd, () => {
						this.close_dropdown(dd);
					});
				}
			});
		},

		close_dropdown(dd){
			dd.classList.remove('dropdown-active');
			delete dd.style.top;
			delete dd.style.left;
			const td = dd.closest('td');
			if(td) delete td.style.position;
			const prev = dd.previousElementSibling;
			if(prev && prev.classList.contains('dropdown-splash')) prev.remove();
		},

	}
	return module;
});