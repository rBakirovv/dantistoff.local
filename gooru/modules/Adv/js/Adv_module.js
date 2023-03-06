'use strict';
define(function() {

    let module = {

        open_popup(group_code) {
            const url = get_ajax_url('Adv', 'ajax_group', 'code=' + group_code);
            Gooru.get(url).then(data => {
                if (data) {
                    Fancybox({
                        src: data,
                        beforeClose: instance => {
                            const c = instance.$refs.inner.get(0).querySelector('.adv-group');
                            if (c) module.closeWithCookie(c);
                        }
                    });
                }
            });
        },

        init_close(element) {
            element.addEventListener('click', e => {
                e.preventDefault();
                const c = element.closest('.adv-group');
                if (c) this.closeWithCookie(c);
            });
        },

        init_hover_image(element) {
            const img = element;
            const li = img.closest('li');
            if (li) {
                const img2 = li.querySelector('.adv-image2');
                if (img && img2) {
                    li.addEventListener('mouseenter', () => {
                        li.classList.add('hovered');
                    });
                    li.addEventListener('mouseleave', () => {
                        li.classList.remove('hovered');
                    });
                }
            }
        },

        closeWithCookie(c) {
            const lis = c.querySelectorAll('li[data-id]');
            if (lis.length) {
                const ids = Array.prototype.map.call(lis, item => {
                    return item.dataset.id;
                });
                let cookie_ids = getCookie('adv');
                cookie_ids = cookie_ids ? cookie_ids.split(',') : [];
                cookie_ids = cookie_ids.concat(ids);
                setCookie('adv', cookie_ids.join());
            }
            c.remove();
            if (c.classList.contains('adv-alert')) document.documentElement.style.setProperty('--AboveHeaderHeight', '0px');
        },

        impress(element, index = 0) {
            const banner = {
                id: element.dataset.advGroupCode,
                creative: 'banner' + element.dataset.id,
                position: index + 1,
            };
            dataLayer.push({
                'event': 'promoImpression',
                'ecommerce': {
                    'promoView': {
                        'promotions': [banner],
                    }
                }
            });
            element.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', e => {
                    dataLayer.push({
                        'event': 'promotionClick',
                        'ecommerce': {
                            'promoClick': {
                                'promotions': [banner]
                            }
                        }
                    });
                });
            });
        }
    }

    return module;
});