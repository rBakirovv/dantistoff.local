'use strict';
define(function() {

    let module = {

        init_toggle_id(element) {
            const classes = element.classList;
            if (classes.contains('toggle-next') || classes.contains('toggle-siblings') || classes.contains('toggle-selected') || classes.contains('toggle-next-container')) return;
            element.addEventListener('click', e => {
                e.preventDefault();
                classes.forEach(cls => {
                    if (cls.indexOf('toggle') === 0) {
                        const id = cls.replace('toggle', '');
                        const obj = document.getElementById(id);
                        if (obj) {
                            if (!obj.offsetParent) {
                                element.classList.add('selected');
                                obj.classList.remove('hidden');
                                if (window.getComputedStyle(obj).display == 'none') obj.style.display = 'block';
                                const input = obj.querySelector('input:not(.nofocus)');
                                if (input && input.offsetParent) input.focus();
                            } else {
                                element.classList.remove('selected');
                                obj.classList.add('hidden');
                                if (window.getComputedStyle(obj).display == 'block') obj.style.display = 'none';
                            }
                        }
                    }
                })
            })
        },

        init_toggle_next(element) {
            const classes = element.classList;
            const n = element.dataset.target ? document.querySelector(element.dataset.target) : element.nextElementSibling;
            if (!n) return;
            //if(!n || n.tagName == 'STYLE') return;
            const speed = parseInt(element.dataset.speed) || 0;
            const enabled_inputs = classes.contains('enable-inputs');
            const is_inversed = classes.contains('inversed');
            const with_parent = element.dataset.withParent;
            const siblings_container = element.closest('.siblings-container');
            if (n && !n.offsetParent) {
                n.classList.add('toggable');
                if (speed) n.style.transitionDuration = speed + 'ms';
            }
            element.addEventListener('click', e => {
                e.preventDefault();
                if (!n.offsetParent) {
                    classes.add('immediate-selected');
                    n.classList.add('immediate-selected');
                    classes.toggle('selected', !is_inversed);
                    if (enabled_inputs) Array.from(n.getElementsByTagName('input')).forEach(input => input.disabled = false);
                    if (siblings_container) {
                        const siblings = Array.from(siblings_container.querySelectorAll('.toggle-next.selected')).filter(el => {
                            return el !== element;
                        });
                        if (siblings.length) {
                            siblings.forEach(sibling => Gooru.trigger(sibling, 'click'));
                        }
                    }
                    n.classList.add('slide-active');
                    if (n.classList.contains('hidden')) n.classList.remove('hidden');
                    else {
                        if (n.style.display) n.style.display = '';
                        if (window.getComputedStyle(n).display == 'none') n.style.display = 'block';
                    }
                    if (with_parent) element.parentElement.classList.toggle('selected', !is_inversed);

                    const focus = element.dataset.focus != undefined ? element.dataset.focus && element.dataset.focus != 'no' : false;

                    if (focus) {
                        if (n.tagName == 'INPUT') {
                            if (n.disabled) {
                                n.disabled = false;
                                n.dataset.hasDisabled = true;
                            }
                            n.focus().select();
                        } else {
                            const inputs = n.querySelectorAll('input, textarea');
                            if (inputs.length) {
                                let focused = false;
                                inputs.forEach(input => {
                                    if (!focused && input.offsetParent !== null) {
                                        input.focus();
                                        focused = true;
                                    }
                                });
                            }
                        }
                    }
                    if (!n.classList.contains('no-scroll')) {
                        const diff = Gooru.offset(element).top - window.scrollY + n.offsetHeight - window.innerHeight;
                        if (diff > 300) Gooru.scrollTo(n, {
                            behavior: 'smooth'
                        });
                    }
                } else {
                    element.classList.remove('immediate-selected');
                    element.classList.toggle('selected', is_inversed);
                    n.classList.remove('slide-active');
                    if (n.style.display) n.style.display = '';
                    if (window.getComputedStyle(n).display != 'none') n.classList.add('hidden');
                    if (window.getComputedStyle(n).display != 'none') n.style.display = 'none';
                    if (with_parent) element.parentElement.classList.toggle('selected', is_inversed);
                    if (enabled_inputs) Array.from(n.getElementsByTagName('input')).forEach(input => input.disabled = true);
                    if (n.dataset.hasDisabled) n.disabled = true;
                }
            });
        },

        init_toggle_siblings(element) {
            element.addEventListener('click', e => {
                e.preventDefault();
                const toggle_cls = element.dataset.class;
                const label = element.querySelector('.label') || element;
                if (!element.dataset.title) element.dataset.title = label.innerHTML;
                if (!element.collection) {
                    let collection;
                    if (toggle_cls) {
                        collection = element.parentElement.querySelectorAll('.' + toggle_cls);
                        if (!collection.length) collection = element.parentElement.parentElement.querySelectorAll('.' + toggle_cls);
                    } else {
                        collection = element.parentElement.children;
                    }
                    element.collection = collection;
                }
                if (element.collection.length) {
                    const is_selected = element.classList.contains('selected');
                    element.collection.forEach(item => item.classList.toggle(toggle_cls, is_selected));
                    element.classList.toggle('selected', !is_selected);
                    label.innerHTML = !is_selected && element.dataset.title2 ? element.dataset.title2 : element.dataset.title;
                }
            });
        },

        init_slidable(c) {
            const opener = c.previousElementSibling;
            if (opener) {
                opener.addEventListener('click', e => {
                    e.preventDefault();
                    c.classList.toggle('opened');
                    opener.classList.toggle('selected');
                });
            }
        },

        init_explorer(element) {
            element.addEventListener('click', e => {
                e.preventDefault();
                const li = element.closest('li');
                let next = li.nextElementSibling;
                if (!next || next.tagName == 'LI' && !next.getElementsByTagName('ul').length) next = null;
                if (!next && element.dataset.ajax) {
                    Gooru.get(element.dataset.ajax).then(data => {
                        if (data) {
                            next = Gooru.createNode('<li class="inserted"><ul class="explorer">' + data + '</ul></li>');
                            li.after(next);
                            element.classList.remove('explorerplus');
                            element.classList.add('explorerminus');
                            init(next);
                        }
                    });
                }
                if (next) {
                    if (next.offsetParent !== null) {
                        next.classList.add('hidden');
                        element.classList.remove('explorerminus');
                        element.classList.add('explorerplus');
                    } else {
                        next.classList.remove('hidden');
                        element.classList.remove('explorerplus');
                        element.classList.add('explorerminus');
                    }
                }
            });
        },

        init_select_tr(tr) {
            tr.addEventListener('click', e => {
                const input = tr.querySelector('input[type=radio], input[type=checkbox]');
                if (!input) return;
                const target = e.target;
                if (!target.closest('label') && target != input) {
                    e.preventDefault();
                    if (input.type == 'radio' && input.checked) return;
                    input.checked = !input.checked;
                    Gooru.trigger(input, 'click');
                }
                if (input.type == 'radio') {
                    Array.from(tr.parentElement.children).forEach(sibling => sibling.classList.remove('selected'));
                }
                tr.classList.toggle('selected', input.checked);
            });
        },
    }
    return module;
});