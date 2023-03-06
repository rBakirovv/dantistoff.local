define(function() {

    const module = {

        init() {
            if (document.body.dataset.allCatalog) this.init_catalog();
            if (document.body.dataset.allCatalogBrands) this.init_brands();
        },

        init_catalog() {
            let collection = Array.from(document.querySelectorAll(".open-all-catalog, a[data-page-type='Catalog']"));
            collection = this.filter(collection);
            collection.forEach(element => {
                Gooru.delayEvent(element, e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.show(element);
                });
            });
        },

        init_brands() {
            let collection = Array.from(document.querySelectorAll(".open-all-brands, a[data-page-type='brands']"));
            collection = this.filter(collection);
            collection.forEach(element => {
                element.addEventListener('mouseenter', e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.show(element, 'brands');
                });
            });
        },

        filter(collection) {
            if (document.body.dataset.noRouteAllCatalog) {
                collection = collection.filter(item => {
                    return !item.closest("[itemtype='http://schema.org/BreadcrumbList']");
                });
            }
            return collection;
        },

        async show(element, type) {
            if (!element.div) {
                const url = get_ajax_url('Catalog', 'ajax_all_catalog', (type ? 'type=' + type : ''));
                const data = await Gooru.get(url);
                const div = Gooru.createNode('<div class="all-catalog-wrapper"></div>');
                const p = element.parentElement;
                div.innerHTML = data;
                p.append(div);
                div.doPosition = function() {
                    div.style.left = div.style.height = ''; //auto
                    let max_height = window.innerHeight - Gooru.offset(div).top + window.scrollY;
                    if (max_height <= 0 || div.scrollHeight <= max_height) max_height = 0;
                    let x = Gooru.offset(p).left + div.offsetWidth - document.body.clientWidth;
                    if (x > 0) {
                        const div_left = Gooru.offset(div).left;
                        if (x > div_left) x = div_left;
                        x = -x;
                    } else x = 0;
                    const opts = {
                        maxWidth: window.innerWidth + 'px',
                    };
                    if (x != 0) opts.left = x + 'px';
                    if (max_height > 0) opts.height = max_height + 'px';
                    Object.assign(div.style, opts);
                };
                div.un = function() {
                    div.classList.remove('visible');
                    element.classList.remove('selected')
                }
                div.doPosition();
                window.addEventListener('resize', e => div.doPosition());
                element.div = div;
                init(div);
                closeOutside(div, p, div.un);
            }
            const div = element.div;
            if (!div.classList.contains('visible')) {
                element.classList.add('selected');
                div.classList.add('visible');
            } else if (is_mobile_device()) {
                div.un();
            }
        }

    };

    return module;
});