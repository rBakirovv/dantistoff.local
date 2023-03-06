define(function(){
	return {
	
		init_table_responsive(t){
			const trs = t.querySelectorAll('tbody > tr');
			if(trs.length)
			{
				const ths = trs[0].children;
				if(ths.length && ths[0].tagName == 'TH')
				{
					trs.forEach((tr, tr_index) => {
						if(!tr.classList.contains('header') && tr_index > 0)
						{
							Array.from(tr.children).forEach((td, index) => {
								if(ths[index]) td.dataset.label = ths[index].textContent;
							});
						}
					});
				}
			}
		},

		init_tabs(tabs){
			if(tabs.classList.contains('no-tabs')) return;
			let contents = document;
			const next = tabs.nextElementSibling;
			if(next)
			{
				if(next.classList.contains('tabs-contents')) contents = next;
				else contents = next.querySelector('.tabs-contents');
			}
			const links = tabs.querySelectorAll('a, .tab');
			links.forEach((a, index) => {
				a.addEventListener('click', e => {
					e.preventDefault();
					const divs = contents.querySelectorAll('.tab-content');
					if(divs.length)
					{
						const div = divs.item(index);
						if(div)
						{
							const promise = new Promise((resolve) => {
								const io_loads = div.getElementsByClassName('io-load');
								if(io_loads.length)
								{
									const len = io_loads.length;
									let counter = 0;
									for(let element of io_loads)
									{
										element.load(function(){
											counter++;
											if(counter == len) resolve();
										});
									}
								}
								else resolve();
							});
							promise.then(() => {
								links.forEach(link => {
									if(link != a) link.classList.remove('selected');
								});
								divs.forEach(d => {
									if(d != div) d.classList.remove('selected');
								});
								a.classList.add('selected');
								div.classList.add('selected');
							});
						}
					}
				});
			});
		},

		init_isotope(wrapper){
			require(['isotope'], Isotope => {
				const style = window.getComputedStyle(wrapper);
				if(style.display == 'flex' && style.flexDirection == 'column') {}
				else
				{
					const items = Array.from(wrapper.querySelectorAll('.isotope-item'));
					const maxHeight = Math.max.apply(null, items.map(item => { return item.offsetHeight }));
					items.forEach(item => item.style.height = maxHeight + 'px');
				}
				const grid = new Isotope(wrapper, {
					itemSelector: '.isotope-item',
				});
				Array.from(document.getElementsByClassName('isotope-cat')).forEach(o => {
					o.addEventListener('click', e => {
						e.preventDefault();
						const ul = o.closest('ul') || o.parentElement;
						const lis = ul.children;
						const li = o.parentElement;
						const is_mobile = window.getComputedStyle(ul).flexFlow == 'column nowrap';
						const is_selected = o.classList.contains('selected');
						ul.querySelectorAll('a').forEach(a => a.classList.remove('selected'));
						Array.from(lis).forEach(li => {
							li.classList.remove('selected');
							if(is_mobile && !is_selected) li.classList.remove('first');
							if(is_selected) li.classList.toggle('opened');
						});
						o.classList.add('selected');
						li.classList.add('selected');
						if(grid)
						{
							let filter_class = o.dataset.catFilter || '*';
							const filter_classes = [];
							document.querySelectorAll('.isotope-cat.selected[data-cat-filter]').forEach(a => {
								if(a != o && a.dataset.catFilter)
								{
									filter_classes.push(a.dataset.catFilter);
								}
							});
							if(filter_classes.length > 0)
							{
								if(filter_class != '*') filter_classes.push(filter_class);
								filter_class = filter_classes.join('');
							}
							grid.arrange({
								filter: filter_class
							});
						}
						if(is_mobile && !is_selected) li.classList.add('first');
					});
				});
			});
		},

		init_full_image(element){
			const container = element.closest('.full-image-offset');
			if(element.dataset.fullImage)
			{
				element.addEventListener('mouseenter', e => {
					let div = element.div;
					if(div) div.classList.remove('hidden');
					else
					{
						div = Gooru.createNode('<div class="color-image-zoom-container"><img src="' + element.dataset.fullImage + '"></div>');
						//document.body.appendChild(div);
						if(window.getComputedStyle(element.parentElement).position == 'static') element.parentElement.style.position = 'relative';
						element.parentElement.appendChild(div);
						element.div = div;
					}
					let l, t, offset;
					if(container)
					{
						offset = Gooru.offset(container);
						l = offset.left + container.offsetWidth;
						t = offset.top;
					}
					else
					{
						//offset = Gooru.offset(element);
						//l = offset.left + element.offsetWidth;
						//t = offset.top;
						//l = element.offsetWidth;
						//t = 0;
					}
					if(l !== undefined)
					{
						Object.assign(div.style, {
							left: l + 'px',
							top: t + 'px',
						});
					}
				});
				element.addEventListener('mouseleave', e => {
					if(element.div) element.div.classList.add('hidden');
				});
				element.addEventListener('click', e => {
					if(element.div) element.div.remove();
				});
			}
		},

		init_twentytwenty(element){
			require(['twentytwenty'], function(){
				$(element).twentytwenty();
			});
		},

	}

});