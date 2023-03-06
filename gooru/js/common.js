/*var clsScore = 0;

try {
 var po = new PerformanceObserver(function(list) {
 var entries = list.getEntries();
 for (var i = 0; i < entries.length; i++) {
  if (!entries[i].hadRecentInput) {
	console.log(entries[i])
	clsScore += entries[i].value;
  }
 }
 });

 po.observe({type: 'layout-shift', buffered: true});
} catch (e) {
 // not supported
}
*/

window.addEventListener('popstate', e => {
	if(!e.state)
	{
		let url = e.location || document.location;
		if(url instanceof Location) url = url.href;
		if(url && url.indexOf('#') == -1) window.location.href = url;
	}
	else if(e.state.filter_href)
	{
		require(['Catalog_filter'], module => {
			const filter = module.getActive();
			filter.load_filter_results(e.state.filter_href, {
				by_url: true,
				no_state : true
			});
		});
	}
});

document.addEventListener('DOMContentLoaded', function(){

	//if(document.body.classList.contains('desktop-device')) 
	document.body.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + 'px');

	observe(document.querySelectorAll('.black-menu, .icon-menu, .menu-header, .smart-transition'), element => {
		require(['menu'], module => {
			module.init_no_transition(element)
		});
	});

	observe(document.getElementsByClassName('menu-opener toggler'), element => {
		require(['menu'], module => module.toggle_menu(element));
	});

	const splashes = document.getElementsByClassName('icon-menu-splash');
	if(splashes.length)
	{
		require(['menu'], module => {
			Array.from(splashes).forEach(element => module.init_splash(element));
		});
	}	

	observe(document.getElementsByClassName('footer-header'), element => {
		element.addEventListener('click', e => {
			const c = document.getElementById('footer-menus');
			if(c && window.getComputedStyle(c).flexDirection == 'column')
			{
				e.preventDefault();
				require(['menu'], module => module.toggle_footer_submenu(element));
			}
		});
	});

	observe(document.getElementsByClassName('open-css-online'), element => {
		element.addEventListener('click', e => {
			e.preventDefault();
			require(['moderator'], module => module.init_css_online(element));
		});
	});

	if(document.body.dataset.gototop)
	{
		require(['ui'], module => module.init_gototop());
	}

	if(!document.body.classList.contains('allow-old'))
	{
		let is_old_browser = false;
		if(document.documentMode && document.documentMode <= 11) is_old_browser = 'Internet Explorer ' + document.documentMode;
		else if(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Mac OS') != -1)
		{
			const reg = new RegExp("Version/([0-9]+)\.");
			const preg = reg.exec(navigator.userAgent);
			if(preg && preg[1])
			{
				const safari_version = parseInt(preg[1]);
				if(safari_version <= 9) is_old_browser = 'Safari ' + safari_version;
			}
		}
		if(is_old_browser)
		{
			const str = '<div class="entry-alert"><div class="content">Ваш браузер ' + is_old_browser + ' устарел, рекомендуем обновить до последней версии. Сайт может отображаться некорректно.</div></div>';
			document.body.appendChild(Gooru.createNode(str));
		}
	}

	if('serviceWorker' in navigator)
	{
		if(document.body.dataset.serviceWorker)
		{
			navigator.serviceWorker.register('/sw.js');
		}
		else
		{
			navigator.serviceWorker.getRegistrations().then(registrations => {
				for(let registration of registrations)
				{
					registration.unregister();
				}
			});
		}
	}

	document.querySelectorAll("a[href^='#'], a[href^='" + window.location.pathname + "#']").forEach(a => {
		const hash = a.getAttribute('href').split('#')[1];
		if(hash)
		{
			const element = document.getElementById(hash);
			if(element)
			{
				Gooru.setScrollMargin(element);
			}
		}
	});

	observe(document.getElementsByClassName('sticky'), element => {
		require(['sticky'], function(){
			let condition = element.dataset.condition;
			let bottomSpacing = element.dataset.bottomSpacing || 0;
			let topSpacing = element.dataset.topSpacing || 0;
			if(element.dataset.position == 'bottom')
			{
				topSpacing = document.body.clientHeight - element.offsetHeight - (bottomSpacing || 30);
			}
			const opts = {
				topSpacing: topSpacing,
				bottomSpacing: bottomSpacing,
			};
			element.sticky_handler = e => {
				if(!element.offsetParent) $(element).unstick();
				else if(condition == 'desktop' && Gooru.isMobile() || condition == 'mobile' && !Gooru.isMobile())
				{
					$(element).unstick();
				}
				else
				{
					$(element).sticky(opts);
					if(e) $(element).sticky('update');
				}
			};
			window.addEventListener('resize', element.sticky_handler);
			element.sticky_handler();
		});
	});

	if(document.body.dataset.wasMethod == 'js')
	{
		setCookie('was', 1);
	}

	init();

});

var init_functions = window.init_functions || [];

function init(context)
{
	const d = getContext(context);

	if(document.querySelector("link[rel='preload'][href*='FontAwesome']"))//d.querySelector('.fas, .fab, .fa, .fal') && 
	{
		require(['fontawesome']);
	}

	observe(d.getElementsByClassName('dropdown'), element => {
		if(!element.classList.contains('off'))
		{
			require(['dropdown'], module => module.init_dropdown(element));
		}
	});

	observe(d.getElementsByClassName('open-dd'), element => {
		require(['dropdown'], module => module.init_dd(element));
	});

	const fixlefts = d.getElementsByClassName('fixleft');
	if(fixlefts.length)
	{
		require(['menu'], module => {
			Array.from(fixlefts).forEach(ul => module.fixleft(ul));
			if(d == document)
			{
				const listener = e => {
					Array.from(document.getElementsByClassName('fixleft fixleft-opened')).forEach(ul => {
						module.fixleft(ul);
					});
				};
				window.addEventListener('resize', listener);
				window.addEventListener('scroll', listener);
			}
		});
	}

	observe(d.getElementsByClassName('countdown-dashboard'), element => {
		require(['countdown_module'], module => module.countdown(element));
	});
	
	observe(d.getElementsByClassName('countdown'), element => {
		require(['countdown_module'], module => module.countdownDec(element));
	});

	observe(d.getElementsByClassName('countdown-seconds'), element => {
		require(['countdown_module'], module => module.countdownSeconds(element));
	});

	observe(d.getElementsByClassName('openimage'), element => {
		if(element.title && element.dataset.caption == undefined)
		{
			element.dataset.caption = element.title;
		}
		element.addEventListener('click', e => {
			e.preventDefault();
			require(['fancybox'], module => module.open_image(element));
		});
	});

	observe(d.querySelectorAll('.youtube, .youtube-compact'), element => {
		element.addEventListener('click', e => {
			//e.preventDefault();
			e.stopImmediatePropagation();
			
			const href = element.getAttribute('href') || element.parentElement.getAttribute('href');
			if(href && href.indexOf('#') == -1)
			{
				e.preventDefault();
				require(['fancybox'], module => module.open_youtube(href));
			}
			
		});
	});

	observe(d.getElementsByClassName('open-content'), element => {
		element.addEventListener('click', e => {
			e.preventDefault();
			let c = element.dataset.id ? document.getElementById(element.dataset.id) : element.nextElementSibling;
			if(c)
			{
				Fancybox({
					src: c.innerHTML,
				});
			}
		});
	});

	observe(d.getElementsByClassName('iframe'), element => {
		element.addEventListener('click', e => {
			e.preventDefault();
			require(['fancybox'], module => module.open_iframe(element));
		});
	});

	observe(d.getElementsByClassName('iframe-window'), element => {
		element.addEventListener('click', e => {
			e.preventDefault();
			const src = element.getAttribute('href') || element.dataset.src;
			if(src)
			{
				window.open(src, 'iframe');
			}
		});
	});

	Array.from(d.getElementsByClassName('confirm')).forEach(element => {
		element.addEventListener('click', e => {
			e.preventDefault();
			require(['ui'], module => module.open_confirm(element));
		});
	});

	observe(d.getElementsByClassName('pager'), element => {
		require(['pagenavigator'], module => module.init(element));
	});

	const editable_blocks = d.getElementsByClassName('editable-block-dynamic');
	if(editable_blocks.length)
	{
		require(['moderator'], module => {
			Array.from(editable_blocks).forEach(element => module.init_editable_block(element));
		});
	}
	
	const incrementable = d.getElementsByClassName('incrementable');
	if(incrementable.length)
	{
		require(['card'], module => {
			Array.from(incrementable).forEach(input => module.init_incrementable(input));
		});
	}

	const image_switchers = d.getElementsByClassName('image-switcher');
	if(image_switchers.length)
	{
		require(['image_switcher'], module => {
			Array.from(image_switchers).forEach(image_switcher => module.init(image_switcher));
		});
	}
	
	observe(d.getElementsByClassName('zoom'), element => {
		require(['image_switcher'], module => module.init_zoom(element));
	});

	observe(d.getElementsByClassName('stdtable responsive'), element => {
		require(['content'], module => module.init_table_responsive(element));
	});

	if(!is_mobile_device())
	{
		const full_images = d.querySelectorAll('[data-full-image]');
		if(full_images.length)
		{
			require(['content'], module => {
				full_images.forEach(element => module.init_full_image(element));
			});
		}
	}	

	observe(d.getElementsByClassName('isotope-wrapper'), wrapper => {
		require(['content'], module => module.init_isotope(wrapper));
	});
	
	const address_opener = document.getElementById('address-wh-slide-content-opener');
	if(address_opener) require(['menu'], module => module.init_slide_wh(address_opener));
	
	observe(d.getElementsByClassName('image_carousel'), c => {
		require(['swiper_module'], module => {
			module.init(c);
			window.addEventListener('resize', e => module.init(c));
		});
	});
	
	observe(d.getElementsByClassName('images360'), element => {
		require(['image_switcher'], module => module.init360(element));
	});

	observe(d.getElementsByClassName('twentytwenty'), element => {
		require(['content'], module => module.init_twentytwenty(element));
	});

	observe(d.getElementsByClassName('fix'), element => {
		if(window.getComputedStyle(element).position == 'sticky')
		{
			const top_offset = Gooru.getTopOffset();
			element.style.top = top_offset + 'px';

			element.fix = function(){
				const top = Gooru.offset(element).top - window.scrollY;
				if(top <= top_offset)
				{
					//if(!element.style.maxHeight)
					//{
						const max_height = document.body.clientHeight - top;
						if(max_height > 0)
						{
							element.style.maxHeight = max_height + 'px';
						}
					//}
				}
				else
				{
					element.style.maxHeight = '';
				}
			}
			element.fix();
			window.addEventListener('scroll', e => {
				element.fix();
			});
		}
	});

	Array.from(d.getElementsByClassName('clickable')).forEach(element => {
		element.addEventListener('click', e => {
			if(e.target.tagName != 'A' && e.target.tagName != 'BUTTON')
			{
				const a = element.querySelector('a');
				if(a) a.click();
			}
		});
	});

	observe(d.getElementsByClassName('scroll2site'), element => {
		require(['scroll2site'], module => module.init(element));
	});

	observe(d.getElementsByClassName('video-player'), element => {
		require(['video'], VideoPlayer => {
			const player = new VideoPlayer(element);
		});
	});

	if(window.dataLayer)
	{
		observe(d.querySelectorAll('[data-layer-push]'), element => {
			require(['Seo'], module => module.push_datalayer(element));
		});
	}

	if(window.global_init) global_init(context);
	init_functions.forEach(function(init_function){
		init_function(context);
	});
}

function get_yandex_counter()
{
	for(var prop in window)
	{
		if(prop.indexOf('yaCounter') == 0) return window[prop];
	}
	return false;
}

function track_seo_event(code, params, o)
{
	if(code)
	{
		if(!params) params = {};
		var yandex_counter = get_yandex_counter();
		if(yandex_counter) yandex_counter.reachGoal(code, params);
		if(window.ga)
		{
			params.hitType = code;
			ga('send', params);
		}
		if(window.roistat) roistat.event.send(code, params);
	}
	if(o && window.dataLayer)
	{
		let data_layer = o.dataset.layer;
		if(data_layer)
		{
			let data = JSON.parse(data_layer);
			window.dataLayer.push(data);
		}
	}
	return true;
}