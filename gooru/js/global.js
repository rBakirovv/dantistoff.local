if(window.requirejs)
{
	const version = document.documentElement.dataset.cacheVersion || Math.random();	
	requirejs.config({
		urlArgs: 'v' + version,
		baseUrl: '/gooru/js',
	    paths: {
			jquery				: '/gooru/libplugins/jquery/jquery',
			migrate				: '/gooru/libplugins/jquery/jquery-migrate-3.0.0.min',
			threesixty			: '/gooru/libplugins/jquery.threesixty/jquery.threesixty.min',
			cookie				: '/gooru/libplugins/js.cookie/js.cookie.min',
			jqueryFancybox		: '/gooru/libplugins/fancybox/jquery.fancybox.min',
			swiper				: '/gooru/libplugins/swiper/js/swiper.min',
			axios				: '/gooru/libplugins/axios/axios.min',
			qtip				: '/gooru/libplugins/jquery.qtip/jquery.qtip.min',
			mask				: '/gooru/libplugins/jquery.mask/jquery.mask.min',
			countdown			: '/gooru/libplugins/jquery.lwtCountdown/jquery.lwtCountdown.min',
			nouislider			: '/gooru/libplugins/jquery.nouislider/nouislider.min',
			wnumb				: '/gooru/libplugins/jquery.nouislider/wNumb.min',
			select2				: '/gooru/libplugins/select2/js/select2.min',
			datepicker			: '/gooru/libplugins/datepicker/datepicker.min',
			autocomplete		: '/gooru/libplugins/auto-complete/auto-complete.min',
			picker				: '/gooru/libplugins/picker/vanilla-picker.min',
			ace					: '/gooru/libplugins/ace-builds/src-min-noconflict/ace',
			ckeditor			: '/gooru/libplugins/ckeditor/ckeditor',
			twentytwenty		: '/gooru/libplugins/twentytwenty/js/jquery.twentytwenty',
			jqueryEventMove		: '/gooru/libplugins/twentytwenty/js/jquery.event.move',
			isotope				: '/gooru/libplugins/isotope/isotope.pkgd.min',
			sticky				: '/gooru/libplugins/jquery.sticky/jquery.sticky.min',
			'swipe-listener'	: '/gooru/libplugins/swipe-listener/swipe-listener.min',
			printjs				: '/gooru/libplugins/printjs/print.min',
			
			ymaps				: '//api-maps.yandex.ru/2.1/?lang=ru_RU&amp;coordorder=longlat',
			suggestions			: '//cdn.jsdelivr.net/jquery.suggestions/16.6/js/jquery.suggestions.min',
			ulogin				: '//ulogin.ru/js/ulogin',

			Adv					: '/gooru/modules/Adv/js/Adv_module',
			Core				: '/gooru/modules/Core/js/Core_module',
			Localization		: '/gooru/modules/Localization/js/Localization_module',
			Subscribe			: '/gooru/modules/Subscribe/js/Subscribe_module',
			Search				: '/gooru/modules/Search/js/Search_module',
			Likes				: '/gooru/modules/Web20/js/Likes_module',
			Rating				: '/gooru/modules/Web20/js/Rating_module',
			Comments			: '/gooru/modules/Web20/js/Comments_module',
			CommentsAuto		: '/gooru/modules/Web20/js/CommentsAuto_module',
			Form				: '/gooru/modules/Form/js/Form_module',
			Feedback			: '/gooru/modules/Form/js/Feedback_module',
			Seo					: '/gooru/modules/Page/js/Seo_module',
			User				: '/gooru/modules/User/js/User_module',
			PhoneValidation		: '/gooru/modules/Mail/js/PhoneValidation_module',
			MailValidation		: '/gooru/modules/Mail/js/MailValidation_module',

			Pay_account			: '/gooru/modules/Pay/js/Pay_account_module',
	
			Shop_cart			: '/gooru/modules/Shop/js/Shop_cart_module',
			Shop_cart_add		: '/gooru/modules/Shop/js/Shop_cart_add_module',
			Shop_history		: '/gooru/modules/Shop/js/Shop_history_module',

			Catalog_list_tile	: '/gooru/modules/Catalog/js/Catalog_list_tile_module',
			Catalog_main		: '/gooru/modules/Catalog/js/Catalog_main_module',
			Catalog_blocks		: '/gooru/modules/Catalog/js/Catalog_blocks_module',
			Catalog_model		: '/gooru/modules/Catalog/js/Catalog_model_module',
			Catalog_ads			: '/gooru/modules/Catalog/js/Catalog_ads_module',
			Catalog_colors		: '/gooru/modules/Catalog/js/Catalog_colors_module',
			Catalog_search		: '/gooru/modules/Catalog/js/Catalog_search_module',
			Catalog_all_catalog	: '/gooru/modules/Catalog/js/Catalog_all_catalog_module',
			Catalog_compare		: '/gooru/modules/Catalog/js/Catalog_compare_module',
			Catalog_tile		: '/gooru/modules/Catalog/js/Catalog_tile_module',
			Catalog_filter		: '/gooru/modules/Catalog/js/Catalog_filter_module',

			scroll2site			: '/gooru/modules/Core/js/Core_scroll2site_module',
			video				: '/gooru/modules/Res/js/Video_module',
		},
		shim: {
			fancybox: [
				'jquery',
				'jqueryFancybox',
			],
			jqueryFancybox: [
				'jquery',
				'css!/gooru/libplugins/fancybox/jquery.fancybox.min.css',
			],
			swiper: [
				'css!/gooru/libplugins/swiper/css/swiper.min.css',
			],
			threesixty: [
				'jquery',
			],
			migrate: [
				'jquery',
			],
			qtip: [
				'migrate',
				'css!/gooru/libplugins/jquery.qtip/jquery.qtip.min.css',
			],
			countdown: [
				'jquery',
			],
			nouislider: [
				'wnumb',
				'css!/gooru/libplugins/jquery.nouislider/nouislider.min.css',
			],
			select2: [
				'jquery',
				'css!/gooru/libplugins/select2/css/select2.min.css',
				'css!/gooru/libplugins/select2/css/select2-bootstrap4.min.css',
			],
			datepicker: [
				'css!/gooru/libplugins/datepicker/datepicker-bs4.min.css',
			],
			autocomplete: [
				'css!/gooru/libplugins/auto-complete/auto-complete.css',
			],
			suggestions: [
				'css!//cdn.jsdelivr.net/jquery.suggestions/16.6/css/suggestions.css',
			],
			fontawesome: [
				'css!/gooru/css/fonts/FontAwesome/css/all.min.css',
			],
			jqueryEventMove: [
				'jquery',
			],
			twentytwenty: [
				'jquery',
				'jqueryEventMove',
				'css!/gooru/libplugins/twentytwenty/css/twentytwenty.css',
			],
			printjs: [
				'css!/gooru/libplugins/printjs/print.min.css',
			],
		},
		map: {
			'*': {
				'css': '/gooru/libplugins/requirejs/css.min.js',
			}
		},
	});
}

function grequire(requires)
{
	if(typeof requires == 'string') requires = [requires];
	return new Promise(resolve => {
		require(requires, resolve);
	});
}

function observe(o, handler, opts = {})
{
	if(!o || isIterable(o) && !o.length) return;
	if('IntersectionObserver' in window)
	{
		const observer = new IntersectionObserver(collection => {
			collection.forEach((entry, index) => {
				if(entry.intersectionRatio > 0)
				{
					if(!opts.multiple) observer.unobserve(entry.target);
					handler.call(entry.target, entry.target, index, entry);
					if(opts.any)
					{
						if(window.jQuery && o instanceof jQuery) o.each(function(){ observer.unobserve(this); });
						else if(isIterable(o))
						{
							if(HTMLCollection.prototype.isPrototypeOf(o)) Array.from(o).forEach(element => observer.unobserve(element));
							else o.forEach(element => observer.unobserve(element));
						}
						else observer.unobserve(o);
					}
				}
			});
		}, {
			rootMargin: '0px 0px 0px 0px',
			threshold: 0.01,
		});
		if(window.jQuery && o instanceof jQuery) o.each(function(){ observer.observe(this); });
		else if(isIterable(o))
		{
			if(HTMLCollection.prototype.isPrototypeOf(o)) Array.from(o).forEach(element => observer.observe(element));
			else o.forEach(element => observer.observe(element));
		}
		else observer.observe(o);
	}
	else
	{
		if(!isIterable(o)) handler.call(o, o, 0);
		else
		{
			Array.from(o).forEach((entry, index) => {
				handler.call(entry, entry, index);
			});
		}
	}
}

function observe_mutation(target, handler, config = {attributes: true})
{
	const observer = new MutationObserver(handler);
	observer.observe(target, config);
}

function do_src(target)
{
	if(target.classList.contains('loaded')) return;
	if(target instanceof HTMLImageElement)
	{
		if(target.dataset.src)
		{
			target.src = target.dataset.src;
			target.removeAttribute('data-src');
			target.classList.add('loaded');
			if(window.is_safari_now)
			{
				const style = getComputedStyle(target);
				if(style.maxWidth && style.maxHeight && style.maxWidth == '100%' && style.maxHeight == '100%')
				{
					target.parentNode.appendChild(target.cloneNode());
					target.parentNode.removeChild(target);
				}
			}
			//target.addEventListener('load', e => {
				//target.style.removeProperty('max-width');
				//target.style.removeProperty('max-height');
			//});
		}
	}
	else if(target.dataset.background) target.style.backgroundImage = 'url(' + target.dataset.background + ')';
}

function Fancybox()
{
	const args = arguments;
	return new Promise(resolve => {
		if(!args.length) resolve();
		const opts = args[1] || args[0];
		var cb = opts.afterShow;
		opts.afterShow = (instance, current) => {
			const c = instance.$refs.inner.get(0);
			if(cb)
			{
				cb(instance);
			}
			else init(c);
			resolve(c);
		};
		if(args[1]) args[1] = opts;
		else args[0] = opts;
		require(['fancybox'], function(){
			$.fancybox.open.apply(null, args);
		});
	});
}

function FancyboxIfNotExists(opts, data = '')
{
	if(window.$ && $.fancybox)
	{
		const instance = $.fancybox.getInstance();
		if(instance)
		{
			if(!data) instance.close();
			else
			{
				const c = instance.$refs.inner.get(0).querySelector('.fancybox-content');
				const node = Gooru.createNode(data);
				if(node.id && node.id == c.id)
				{
					reload_unwrap(c, data);
				}
				else
				{
					c.innerHTML = data;
					init(c);
				}
				instance.update();
			}
		}
		else
		{
			return Fancybox(opts);
		}
	}
	else
	{
		return Fancybox(opts);
	}	
}

function FancyboxUpdate(data = null)
{
	if(window.$ && $.fancybox)
	{
		const instance = $.fancybox.getInstance();
		if(instance)
		{
			instance.update();
		}
	}
}

function FancyboxClose()
{
	if(window.$ && $.fancybox)
	{
		$.fancybox.close();
	}
}

function Autocomplete(element, opts = {})
{
	require(['autocomplete'], () => {

		if(element.autoCompleteObject)
		{
			if(element.autoCompleteObject.listener) element.removeEventListener('click', element.autoCompleteObject.listener);
			element.autoCompleteObject.destroy();
		}

		const url = opts.url || element.dataset.autocomplete;
		const name = opts.name || element.dataset.autocompleteName || 'term';
		const delay = opts.delay || parseInt(element.dataset.delay) || 150;
		const minChars = opts.minChars != undefined ? opts.minChars : 1;
		const params = opts.params || {};
		const menuClass = opts.menuClass || element.dataset.autocompleteClass || '';
		if(element.dataset.add)
		{
			element.dataset.add.split('&').forEach(row => { 
				const tmp = row.split('=');
				params[tmp[0]] = tmp[1] || '';
			});
		}
		let onSelect;
		if(opts.onSelect) onSelect = opts.onSelect;
		else
		{
			onSelect = (event, term, item) => {
				if(item.dataset.href)
				{
					window.location.href = item.dataset.href;
				}
				else if(item.dataset.name)
				{
					element.value = item.dataset.name;
					const prev = element.previousElementSibling;
					if(prev && prev.getAttibute('type') == 'hidden') prev.value = item.dataset.id || item.dataset.name; //if(next.hasClass('formlocationregion')) next.remove();
					if(element.dataset.autocompleteSubmit)
					{
						window[element.dataset.autocompleteSubmit].call(element, element);
					}
				}
				if(opts.afterOnSelect) opts.afterOnSelect.call(item, event, term, item);
			};
		}
		
		//if(element.dataset.withLog) params.log = 1;
		let xhr;
		const options = {
			selector: element,
			delay: delay,
			minChars: minChars,
			cache: false,
			menuClass: menuClass,
			source: (term, response) => {
				if(xhr && xhr.abort) xhr.abort();
				params[name] = term;
				xhr = Gooru.get(url, {params: params}).then(data => response(data));
			},
			renderItem: (item, search) => {
				let str = '<div class="autocomplete-suggestion' + (item.cls ? ' ' + item.cls : '') + '"';
				for(let key in item)
				{
					if(key == 'label') continue;
					const value = item[key].toString();
					str += ' data-' + key + '="' + value.replace(new RegExp('"', 'g'), '&quot;') + '"';
				}
				str += '>' + item.label + '</div>';
				return str;
			},
			onSelect: onSelect,
		};
		const autoCompleteObject = new autoComplete(options);
		autoCompleteObject.listener = e => {
			element.last_val = '';
			Gooru.trigger(element, 'keyup');
		};
		element.autoCompleteObject = autoCompleteObject;
		element.addEventListener('click', autoCompleteObject.listener);
	});
}

async function Select2(callback){
	const path = '/gooru/libplugins/select2/js/i18n/' + Gooru.getLang() + '.js';
	await grequire(['select2']);
	await grequire([path]);
	if(callback) callback.call(null);
}

function setCookie(name, value, opts = {})
{
	if(!setCookie.defaults)
	{
		setCookie.defaults = {
			expires: 180,
			domain: window.location.hostname,
			path : '/',
		};
	}
	opts = Object.assign({}, setCookie.defaults, opts);

	if(typeof value == 'array' || typeof value == 'object') value = JSON.stringify(value);

	const promise = new Promise((resolve, reject) => {
		require(['cookie'], function(cookie){
			if(value === false) cookie.remove(name, opts);
			else cookie.set(name, value, opts);
			delete getCookie.cookies;
			resolve();
		});
	});
	return promise;
}


function getCookie(name, to)
{
	if(!getCookie.cookies)
	{
		getCookie.cookies = {};
		const reg = new RegExp("(?:^|; )");
		document.cookie.split(reg).forEach(item => {
			let [key, ...value] = item.split('=');
			value = decodeURIComponent(value.join('='));
			getCookie.cookies[key] = value;
		});
	}
	let value;
	if(getCookie.cookies[name] && getCookie.cookies[name] !== undefined) value = getCookie.cookies[name];
	else value = false;
	if(to == 'json')
	{
		if(!isJsonLike(value)) value = '{}';
		value = JSON.parse(value);
	}
	else if(to == ',')
	{
		value = value ? value.split(',') : [];
	}
	return value;
}

function isJsonLike(str)
{
	if(!str || typeof str != 'string') return false;
	const jsonStart = str.match(/^\[|^\{(?!\{)/);
	const JSON_ENDS = {'[': /]$/, '{': /}$/};
	return jsonStart && JSON_ENDS[jsonStart[0]].test(str);
}

function isIterable(obj)
{
	if (obj == null || typeof obj == 'string' || typeof obj == 'number') return false;
	return typeof obj[Symbol.iterator] === 'function' || obj instanceof Array;
}

var Gooru = {

	isCp(){
		return window.CP_DIR != undefined;
	},

	getLang(){
		return document.body.getAttribute('lang') || 'ru';
	},

	getTopOffset(){
		if(this.top_offset == undefined)
		{
			let h = 0;
			Array.from(document.getElementsByClassName('top-header')).forEach(header => {
				const position = window.getComputedStyle(header).position;
				if(position == 'fixed' || position == 'sticky') h += header.offsetHeight;
			});
			const top = document.getElementById('top');
			if(top)
			{
				const position = window.getComputedStyle(top).position;
				if(position == 'fixed' || position == 'sticky') h += top.offsetHeight;
				else
				{
					top.querySelectorAll('.fix').forEach(element => {
						h += element.offsetHeight;
					});
				}
			}
			this.top_offset = h;
			if(!this.offset_listener)
			{
				this.offset_listener = window.addEventListener('resize', e => {
					delete this.top_offset;
				});
			}
		}
		return this.top_offset;
	},

	scrollTo(element, opts = {}){
		if(Gooru.offset(element).top >= window.scrollY + this.getTopOffset() && !opts.force) return;
		opts = Object.assign({block: 'start', inline: 'nearest', behavior: 'instant'}, opts);
		this.setScrollMargin(element);
		element.scrollIntoView(opts);
	},

	setScrollMargin(element){
		const offsetTop = this.getTopOffset();
		if(offsetTop > 0) element.style.scrollMarginTop = offsetTop + 20 + 'px';
	},

	isVisible(element){
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
			rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
		);
	},

	get(url, opts = {}){
		return this.ajax(url, opts);
	},

	post(url, data, opts = {}){
		if(!data) data = {};
		opts.method = 'post';
		if(data.nodeName && data.nodeName == 'FORM') data = this.serializeArray(data);
		opts.data = new FormData();
		for(let key in data){
			if(data[key] != undefined)
			{
				if(data[key].name != undefined && data[key].value != undefined) opts.data.append(data[key].name, data[key].value);
				else opts.data.append(key, data[key]);
			}
		}
		return this.ajax(url, opts);
	},

	async ajax(url, opts = {}){
		if(opts.loading) this.drawLoading();

		if(!this.sources) this.sources = new Map();
		const axios = await this.getAxios();
		opts = Object.assign(opts, {url : url});
		let sourceUrl = opts.sourceUrl;// || url;
		if(sourceUrl === 'auto')
		{
			if(sourceUrl.indexOf('http') !== 0)
			{
				url = window.location.protocol + '//' + window.location.host + url;
			}
			sourceUrl = new URL(url);
			sourceUrl = sourceUrl.pathname;
		}
		if(sourceUrl)
		{
			if(this.sources.has(sourceUrl))
			{
				this.sources.get(sourceUrl).cancel();
				this.sources.delete(sourceUrl);
			}
			const source = this.axios.CancelToken.source();
			this.sources.set(sourceUrl, source);
			opts.cancelToken = source.token;
		}

		let r;
		try {
			r = await axios(opts);
		}
		catch(err) {
			console.log(err);
		}
		//delete source;
		//this.sources.delete(sourceUrl);
		if(opts.loading) this.removeLoading();
		return r ? r.data : null;
	},

	getAxios(){
		if(!this.ajaxLibPromise)
		{
			this.ajaxLibPromise = new Promise((resolve, reject) => {
				require(['axios'], axios => {
					this.axios = axios;
					const lang = this.getLang();
					const is_webp = document.body.dataset.webp;
					const domain_code = document.body.dataset.domainCode;
					const params = {};
					if(lang) params.lang = lang;
					if(is_webp) params.is_webp = is_webp;
					if(domain_code) params.domain_code = domain_code;
					const instance = this.axios.create({
						headers: {'X-Requested-With': 'XMLHttpRequest'},
						params: params,
					});
					resolve(instance);
				});
			});	
		}
		return this.ajaxLibPromise;
	},

	drawLoading(obj, opts = {}){
		const size = opts.size || 40;
		let loading = document.getElementById('loading');
		if(!loading)
		{
			loading = this.createNode('<div id="loading" style="position: ' + (obj ? 'absolute' : 'fixed') + ';display: block;"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="' + size + 'px" height="' + size + 'px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg></div>');
			document.body.appendChild(loading);
		}
		let left, top;
		if(!obj)
		{
			left = (window.innerWidth - loading.offsetWidth) / 2;
			top = (window.innerHeight - loading.offsetHeight) / 2;
		}
		else
		{
			const offset = this.offset(obj);
			left = offset.left + (obj.offsetWidth - loading.offsetWidth) / 2;
			top = offset.top + (obj.offsetHeight - loading.offsetHeight) / 2;
		}
		loading.style.left = left + 'px';
		loading.style.top = top + 'px';
	},

	removeLoading(){
		const loading = document.getElementById('loading');
		if(loading) loading.remove();
	},

	offset(element, opts = {}){
		return {
			left : element.getBoundingClientRect().left + (opts.raw ? 0 : document.documentElement.scrollLeft),
			top : element.getBoundingClientRect().top + (opts.raw ? 0 : document.documentElement.scrollTop),
		}
	},

	createNode(str){
		const template = document.createElement('template');
    	template.innerHTML = str.trim();
		return template.content.firstChild;
	},

	createFragment(str){
		return document.createRange().createContextualFragment(str);
	},

	trigger(element, type){
		const event = new Event(type, {
		    bubbles: true,
		    cancelable: true,
		});
		element.dispatchEvent(event);
	},

	triggerCustom(element, type){
		const event = new CustomEvent(type, {
		    bubbles: true,
		    cancelable: true,
		});
		element.dispatchEvent(event);
	},

	triggerValue(element, value)
	{
		const old = element.value;
		element.value = value;
		if(old != value) this.trigger(element, 'input');
	},
	
	draggable(element){
		let isMouseDown = false, mouseX = 0, mouseY, elementX = 0, elementY = 0;
		element.addEventListener('mousedown', e => {
			if(e.target.tagName == 'TEXTAREA' || e.target.tagName == 'INPUT' || e.target.classList.contains('ace_editor') || e.target.classList.contains('ace_content'))
			{
				isMouseDown = false;
				return;
			}
			mouseX = e.clientX;
			mouseY = e.clientY;
			const offset = this.offset(element, {raw : true});
			elementX = offset.left;
			elementY = offset.top;
			isMouseDown = true;
		});
		element.addEventListener('mouseup', e => {
			isMouseDown = false;
			elementX = parseInt(element.style.left) || 0;
			elementY = parseInt(element.style.top) || 0;
		});
		document.addEventListener('mousemove', e => {
			if(!isMouseDown) return;
			element.style.marginTop = 0;
			element.style.marginBottom = 0;
			element.style.left = elementX + e.clientX - mouseX + 'px';
			element.style.top = elementY + e.clientY - mouseY + 'px';
		});
	},

	serializeArray(form, opts = {}){
		if(opts === true) opts = {raw : true};
		let fields = [], s = [];
		if(form.nodeType)
		{
			if(form.tagName == 'FORM')
			{
				fields = Array.from(form.elements);
				let name_fields = Array.from(form.querySelectorAll("*[data-name]"));
				name_fields.forEach(name_field => {
					if(!fields.includes(name_field))
					{
						fields.push(name_field);
					}
				});
				if(opts.exclude_names)
				{
					fields = fields.filter(field => {
						return !opts.exclude_names.includes(field.name);
					});
				}
			}
			else if(form.type) fields = [form];
		}
		else if(isIterable(form))
		{
			fields = Array.from(form);
		}
		
		if(fields)
		{
			fields = fields.filter(field => {
				if(field.dataset.name && !field.disabled && !field.classList.contains('disabled')) return true;
				if(!field.name || field.disabled) return false;
				if(field.type == 'file' || field.type == 'reset' || field.type == 'button') return false;
				return true;
			});
			fields.forEach(field => {
				if(!field.type && field.dataset.name && field.dataset.value != undefined)
				{
					s.push( { name: field.dataset.name, value: field.dataset.value } );
				}
				else if(field.type == 'select-multiple')
				{
					Array.from(field.options).forEach(option => {
						if(option.selected) s.push( { name: field.name, value: option.value } );
					});
				}
				else if(field.type != 'checkbox' && field.type != 'radio')
				{
					s.push( { name: field.name, value: field.value } );
				}
				else
				{
					if(field.checked) s.push( { name: field.name, value: field.value } );
					else if(opts.extended && field.type == 'checkbox') s.push( { name: field.name, value: '' } );
				}
			});
		}
		if(opts.raw)
		{
			const raw = {};
			s.forEach(item => raw[item.name] = item.value);
			return raw;
		}
		return s;
	},

	serialize(form, opts = {}){
		let s = [];
		this.serializeArray(form, opts).forEach(item => {
			s.push(item.name + '=' + encodeURIComponent(item.value));
		});
		return s.join('&');
	},

	round(number, step = 1.0){
		const inv = 1.0 / step;
		return Math.round(number * inv) / inv;
	},

	delayEvent(element, callback){
		let opts = {};
		if(!element.nodeType)
		{
			opts = element;
			element = opts.element;
		}
		let event = 'mouseenter', unevent = 'mouseleave';
		if(is_mobile_device())
		{
			event = unevent = 'click';
		}
		if(opts.event)
		{
			event = opts.event;
			unevent = opts.unevent || event;
		}
		else opts.common = true;
		const key = event + '_delay';
		let delay = opts.delay || element.dataset.delay || 150;
		if(is_mobile_device()) delay = 0;
		if(true)//!is_mobile_device() || opts.common
		{
			element.addEventListener(event, e => {
				e.preventDefault();
				if(element[key]) clearTimeout(element[key]);
				element[key] = setTimeout(() => {
					if(element.stopDelayEvent) return;
					callback.call(element, e);
				}, delay);
			});
			if(unevent != event)
			{
				element.addEventListener(unevent, e => {
					if(element[key]) clearTimeout(element[key]);
				});
			}
		}
		else
		{
			element.addEventListener('click', e => {
				//e.preventDefault();
				//e.stopImmediatePropagation();
				callback.call(element, e)
			});
		}
	},

	onload(imgs, callback){
		if(typeof(imgs) == 'object' && imgs instanceof HTMLElement && imgs.tagName == 'IMG') imgs = [imgs];
		imgs = Array.from(imgs);
		let counter = 0;
		imgs.forEach(img => {
			img.addEventListener('load', e => {
				counter++;
				if(counter === imgs.length) callback();
			}, {once : true});
		});
	},

	unwrap(node){
		node.replaceWith(...node.childNodes);
	},

	isMobile(){
		return document.body.clientWidth <= 414;
	},

	onSwipe(element, direction, callback){
		require(['swipe-listener'], function(){
			if(!element['swipe-listener'])
			{
				element['swipe-listener'] = SwipeListener(element);
				element.addEventListener('swipe', e => {
					const directions = e.detail.directions;
  					const x = e.detail.x;
  					const y = e.detail.y;
					if(directions[direction]) callback.call(null, e.detail);
				});
			}
		});
	},

}

var GooruHook = {
	registrations : {},
	call : function(code){
		var args = arguments;
		if(this.registrations[code])
		{
			this.registrations[code].forEach(callback => {
				callback.apply(null, args);
			});
		}
	},
	register : function(code, callable){
		if(!this.registrations[code]) this.registrations[code] = [];
		this.registrations[code].push(callable);
	}
}

var GooruSite = {
}


/* GLOBAL GOORU VARS */
function is_mobile()
{
	return navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|Android|Mobile)/);
}

function is_mobile_device()
{
	return document.body.classList.contains('mobile-device');
}

function is_mobile_safari()
{
	return document.body.classList.contains('mobile-safari');
}

function is_safari()
{
	return document.body.classList.contains('safari') || is_mobile_safari();
}

function is_touch_device()
{
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

function get_hover_event()
{
	return !is_mobile_device() ? 'mouseenter' : 'touchend';
}

function get_ajax_url(module, file, params)
{
	var url = '/ajax/' + module + '/' + file + '/';
	if(params)
	{
		if(params.indexOf('?') != 0) url += '?';
		url += params;
	}
	return url;
}

function parse_str(queryString)
{
	var query = {};
	var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i].split('=');
		query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

function open_dialog_box(text, opts, ok_handler)
{
	require(['dialogs_module'], module => module.open_dialog_box.apply(this, arguments));
	return false;
}

function show_alert(str, delay = 1500, with_ok = false, func = false)
{
	require(['dialogs_module'], module => module.show_alert.apply(this, arguments));
	return false;
}

function show_message(str, delay)
{
	require(['dialogs_module'], module => module.show_message.apply(this, arguments));
	return false;
}

function closeOutside(element, ...args)
{
	if(!element.defaultCloseListener) element.defaultCloseListener = function(){ element.style.display = 'none' };
	if(!element.closeListeners) element.closeListeners = {};

	let callback;
	let event = 'auto';
	let excludes = [], forces = [];
	for(let arg of args)
	{
		if(typeof arg === 'function') callback = arg;
		else if(typeof arg === 'string') event = arg;
		else if(arg.nodeType) excludes.push(arg);
		else if(Array.isArray(arg)) excludes = excludes.concat(arg);
		else if(typeof arg === 'object')
		{
			if(arg.add)
			{
				forces.push(arg.add);
			}
		}
	}
	if(event == 'auto') event = is_mobile_device() ? 'touchend' : 'mousemove';
	if(!callback) callback = element.defaultCloseListener;

	if(element.closeListeners[event] && element.closeListeners[event].indexOf(callback) !== -1) return;

	const listener = function(e){
		if(element && (element.offsetParent !== null || window.getComputedStyle(element).position == 'fixed'))
		{
			let hide = true;
			//if(forces.includes(e.target)) {}
			//else 
			if(element.contains(e.target)) hide = false;
			else
			{
				for(let exclude of excludes)
				{
					if(exclude.contains(e.target)) hide = false;
				}
			}
			if(hide)
			{
				//e.preventDefault();
				//e.stopImmediatePropagation();
				callback.call(e.target, e);
			}
		}
	};
	
	document.addEventListener(event, listener);
	if(!element.closeListeners[event]) element.closeListeners[event] = [];
	element.closeListeners[event].push(callback);
}

function decl(q, words)
{
	words = words.split('|');
	q = parseInt(q);
	var str = '';
	var count = q % 100;
	if(count >= 5 && count <= 20) str += words[2];
	else
	{
		count = count % 10;
		if(count == 1) str += words[0];
		else if(count >= 2 && count <= 4) str += words[1];
		else str += words[2];
	}
	return str;
}

function reload_unwrap(c, data, func)
{
	if(data && c)
	{
		let d;
		if(data instanceof HTMLElement) d = data;
		else d = Gooru.createNode(data);
		c.innerHTML = d.innerHTML;
		if(func) func(c);
		else init(c);
	}
}

async function reload_url(c, url, opts = {})
{
	if(url && c)
	{
		const ajax_opts = !opts.hide_loading && opts.loading == undefined ? { loading: true } : {};
		if(opts.sourceUrl)
		{
			ajax_opts.sourceUrl = opts.sourceUrl;
		}
		const data = await Gooru.get(url, ajax_opts);
		const func = opts.callback || null;
		if(opts.unwrap) reload_unwrap(c, data, func);
		else
		{
			c.innerHTML = data;
			if(data)
			{
				if(func) func(c);
				else init(c);
			}
		}
		if(opts.target)
		{
			Array.from(opts.target.parentElement.children).forEach(element => {
				if(element == opts.target) element.classList.add('selected');
				else element.classList.remove('selected');
			});
		}
	}
}

var time1;

function t1()
{
	time1 = performance.now();
}

function t2(title)
{
	time2 = performance.now();
	var str = (title ? title + ' ' : '') + (Math.round((time2 - time1) * 100) / 100) + ' ms';
	console.log(str)
}

function getContext(context)
{
	let d;
	if(!context) d = document;
	else if(window.jQuery && context instanceof jQuery) d = context.get(0);
	else d = context;
	return d;
}

document.documentElement.className=document.documentElement.className.replace(/\bno-js\b/,'js');

function global_init(context)
{
	const d = getContext(context);
	
	observe(d.querySelectorAll('[data-src], [data-background]'), element => do_src(element));

	const io_loads = d.getElementsByClassName('io-load');
	if(io_loads.length)
	{
		for(let element of io_loads)
		{
			element.load = async (callback, url) => {
				
				if(element.dataset.css)
				{
					const css_files = element.dataset.css.split(',').map(path => { return 'css!' + path; });
					await grequire(css_files);
				}
				if(!url) url = element.dataset.url;
				if(element.classList.contains('replace'))
				{
					const data = await Gooru.get(url);
					const node = Gooru.createFragment(data);
					const parent = element.parentElement;
					parent.insertBefore(node, element);
					element.remove();
					init(parent);
				}
				else
				{
					const unwrap = element.dataset.unwrap != undefined ? element.dataset.unwrap : (Gooru.isCp() ? false : true);
					await reload_url(element, url, {
						unwrap : unwrap,
						hide_loading: true,
					});
				}
				if(callback) callback.call(element, element);
				if(!element.classList.contains('multiple'))
				{
					element.load = null;
					element.classList.remove('io-load');
				}
				else
				{
					if(element.classList.contains('with-nav'))
					{
						const pager_cls = Gooru.isCp() ? '.PageNavigator' : '.pager';
						const pname = Gooru.isCp() ? 'p' : 'page';
						observe(element.querySelectorAll(pager_cls), pager => {
							pager.querySelectorAll('a').forEach(a => {
								a.addEventListener('click', e => {
									e.preventDefault();
									const p = a.textContent || 1;
									let url = element.dataset.url;
									if(url.indexOf('?') != -1) url += '&' + pname + '=' + p;
									else url += pname + p  + '/';
									element.load(callback, url);
								});
							});
						});
					}
				}
			};
		}
		observe(io_loads, element => {
			if(element.load) element.load();
		});
	}
	
	observe(d.getElementsByClassName('tabs'), tabs => {
		require(['content'], module => module.init_tabs(tabs));
	});

	observe(d.getElementsByClassName('tip'), element => {
		require(['tip_module'], module => module.init(element));
	});

	observe(d.getElementsByClassName('form-location-field'), element => {
		require(['Form'], module => module.init_location(element));
	});
	
	const explorer1 = d.getElementsByClassName('explorerplus');
	const explorer2 = d.getElementsByClassName('explorerminus');
	const explorer = Array.from(explorer1).concat(Array.from(explorer2));
	observe(explorer, element => {
		require(['Core'], module => module.init_explorer(element));
	});
	
	observe(d.getElementsByClassName('toggle-next'), element => {
		require(['Core'], module => module.init_toggle_next(element));
	});

	observe(d.getElementsByClassName('toggle-siblings'), element => {
		require(['Core'], module => module.init_toggle_siblings(element));
	});

	Array.from(d.getElementsByClassName('toggle-selected')).forEach(element => {
		element.addEventListener('click', e => {
			e.preventDefault();
			element.classList.toggle('selected');
		});
	});

	const hover_selected = d.getElementsByClassName('hover-selected');
	if(hover_selected.length)
	{
		Array.from(hover_selected).forEach(element => {
			element.addEventListener('mouseenter', e => element.classList.toggle('selected'));
			element.addEventListener('mouseleave', e => element.classList.toggle('selected'));
		});
	}

	observe(d.querySelectorAll('[class*=toggle]'), element => {
		require(['Core'], module => module.init_toggle_id(element));
	})

	Array.from(d.getElementsByClassName('slidable')).forEach(element => {
		require(['Core'], module => module.init_slidable(element));
	});

	observe(d.getElementsByClassName('select-tr'), element => {
		require(['Core'], module => module.init_select_tr(element));
	})

	observe(d.getElementsByClassName('ban-button'), element => {
		require(['User'], module => module.init_ban(element));
	})

	Array.from(d.getElementsByClassName('open-ajax')).forEach(element => {
		element.addEventListener('click', e => {
			e.preventDefault();
			if(element.dataset.url)
			{
				open_dialog_box(element.dataset.url, {
					buttons: false,
					smallBtn: true,
				});
			}
		});
	});


}