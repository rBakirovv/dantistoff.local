'use strict';
define(function() {

    let module = {

        init_open_address(element) {
            element.addEventListener('click', e => {
                e.preventDefault();
                const id = element.dataset.address || 0;
                const w = element.dataset.width || 0;
                const h = element.dataset.height || 0;
                const lat = element.dataset.lat || '';
                const lon = element.dataset.lon || '';
                const file = get_ajax_url('Localization', 'ajax_address', 'id=' + id + '&width=' + w + '&height=' + h + '&lat=' + lat + '&lon=' + lon);
                Fancybox({
                    src: file,
                    type: 'ajax'
                });
            });
        },

        init_map_collection(element) {
            require(['ymaps'], () => {
                ymaps.ready().done(function(ym) {
                    const context = element.closest('.fancybox-content') || document;
                    const selected = context.querySelector('.map-collection-item.selected');
                    let auto_bounds = true;
                    let id = element.getAttribute('id');
                    if (!id) {
                        id = 'map_id_' + Math.random();
                        element.setAttribute('id', id);
                    }
                    let center_coords = [55.75399400, 37.62209300];
                    let zoom = 7;
                    if (element.dataset.lat && parseFloat(element.dataset.lat)) {
                        center_coords = [parseFloat(element.dataset.lat), parseFloat(element.dataset.lon)];
                        zoom = 14;
                        auto_bounds = false;
                    }
                    if (selected) center_coords = [parseFloat(selected.dataset.lat), parseFloat(selected.dataset.lon)];
                    var map = new ym.Map(id, {
                        center: center_coords,
                        zoom: zoom,
                        controls: []
                    }, {
                        searchControlProvider: "yandex#search"
                    });
                    map.controls.add('zoomControl');
                    //map.controls.add('searchControl');

                    let features = [];

                    if (window[id] && window[id].map) {
                        features = window[id].map(point => {

                            let content = point.content || '';
                            if (!content) {
                                content += '<p><button type="button" class="do-button theme-button" onClick=\'const data = ' + (point.data ? JSON.stringify(point.data) : {}) + ';const params = Object.assign(data, {' + point.pvz_param + ' : "' + point.id + '", element: this});api_write(params)\'>Выбрать</button></p>';
                                if (point.address) content += '<p>' + point.address + '</p>';
                                if (point.worktime) content += '<p>' + point.worktime + '</p>';
                                if (point.phone) content += '<p>' + point.phone + '</p>';
                                if (point.extra) content += '<p>' + point.extra + '</p>';
                            }
                            const icon_color = point.color || window.getComputedStyle(document.body).getPropertyValue('--ThemeColor') || '#000000';
                            const a = {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [point.lat, point.lon],
                                },
                                "properties": {
                                    'balloonContentHeader': point.name,
                                    "balloonContent": content,
                                    "hintContent": (point.hint || point.address || ''),
                                },
                                "options": {
                                    "preset": "islands#violetDotIcon",
                                    "iconColor": icon_color,
                                }
                            };
                            return a;
                        });
                    } else {
                        features = context.querySelectorAll('.map-collection-item');
                        features = Array.from(features).map(function(item) {

                            const point = {
                                x: item.dataset.lat,
                                y: item.dataset.lon,
                                name: item.dataset.name || null,
                            };
                            ['address', 'worktime', 'phone', 'extra', 'hint'].forEach(key => {
                                const node = item.querySelector('.map-collection-' + key);
                                point[key] = node ? node.innerHTML : '';
                            });

                            const content_div = item.querySelector('.map-collection-content');
                            let content = content_div ? content_div.innerHTML : '';
                            if (!content) {
                                if (point.name) {
                                    content += '<p><strong>' + point.name + '</strong></p>';
                                    if (point.address) content += '<p>' + point.address + '</p>';
                                } else {
                                    if (point.address) content += '<p><strong>' + point.address + '</strong></p>';
                                }
                                if (point.worktime) content += '<p>' + point.worktime + '</p>';
                                if (point.phone) content += '<p>' + point.phone + '</p>';
                                if (point.extra) content += '<p>' + point.extra + '</p>';
                            }
                            const icon_color = item.dataset.color || window.getComputedStyle(document.body).getPropertyValue('--ThemeColor') || '#000000';
                            const a = {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [point.x, point.y],
                                },
                                "properties": {
                                    'balloonContentHeader': point.name,
                                    "balloonContent": content,
                                    "hintContent": (point.hint || point.address),
                                },
                                "options": {
                                    "preset": "islands#violetDotIcon",
                                    "iconColor": icon_color
                                }
                            };
                            return a;
                        });
                    }
                    const json = {
                        "type": "FeatureCollection",
                        "features": features
                    };
                    ym.geoQuery(json).addToMap(map);
                    if (auto_bounds) {
                        map.setBounds(map.geoObjects.getBounds(), {
                            checkZoomRange: true,
                            zoomMargin: 80,
                        });
                    }
                });
            });
        },

        init_yandex_map(element) {
            const map_id = element.id;
            const key = 'cf' + map_id;
            if (!window[key]) return;
            const json = window[key];
            require(['ymaps'], () => {
                ymaps.ready().done(function(ym) {
                    const map = new ym.Map(map_id, {
                        center: json.center,
                        zoom: json.zoom,
                        type: "yandex#map",
                        controls: ["zoomControl", 'fullscreenControl', 'rulerControl', 'typeSelector']
                    }, {
                        geoObjectHint: false,
                    });
                    element.map = map;
                    map.behaviors.disable('scrollZoom');
                    if (is_mobile_device()) map.behaviors.disable('drag');
                    map.behaviors.disable('multiTouch');
                    const clusterer = new ym.Clusterer({
                        preset: 'islands#invertedVioletClusterIcons',
                        groupByCoordinates: false,
                        clusterDisableClickZoom: false,
                        gridSize: 80
                    });
                    let balloonLayout = ymaps.templateLayoutFactory.createClass(
                        '<div class="my-balloon"><a class="close" href="#"></a><div class="baloon-content">$[[options.contentLayout]]</div></div>', {
                            build: function() {
                                this.constructor.superclass.build.call(this);
                                this._$element = this.getParentElement().querySelector('.my-balloon');
                                this._$element.querySelector('.close').addEventListener('click', e => {
                                    e.preventDefault();
                                    this.events.fire('userclose');
                                });
                                const route = this._$element.querySelector('.baloon-route');
                                if (route) {
                                    route.addEventListener('click', e => {
                                        e.preventDefault();
                                        map.controls.add('routePanelControl');
                                        const control = map.controls.get('routePanelControl');
                                        //map.options.set('hasBalloon', false);
                                        control.routePanel.state.set({
                                            type: 'masstransit',
                                            fromEnabled: true,
                                            from: '',
                                            toEnabled: false,
                                            to: route.dataset.address,
                                        });
                                    });
                                }
                            }
                        }
                    );
                    let geoObjects = [];
                    json.balloons.forEach(b => {

                        const opts = {
                            balloonLayout: balloonLayout,
                        };
                        if (b.iconImageHref) {
                            opts.iconLayout = b.iconLayout || 'default#image';
                            opts.iconImageHref = b.iconImageHref || '';
                            opts.iconImageSize = b.iconImageSize || [];
                            if (b.iconImageOffset) opts.iconImageOffset = b.iconImageOffset;
                        }
                        const myPlacemark = new ym.Placemark([b.Lat, b.Lon], {
                            balloonContent: b.balloonContent,
                        }, opts);
                        geoObjects.push(myPlacemark);
                        if (b.onClick) myPlacemark.events.add('click', b.onClick);
                    });
                    clusterer.add(geoObjects);
                    map.geoObjects.add(clusterer);
                    if (geoObjects.length > 1) {
                        map.setBounds(map.geoObjects.getBounds(), {
                            checkZoomRange: true,
                            zoomMargin: 30,
                        });
                    }
                    if (json.current_index != undefined) {
                        const objectState = clusterer.getObjectState(geoObjects[json.current_index]);
                        if (objectState.isClustered) {
                            objectState.cluster.state.set('activeObject', geoObjects[json.current_index]);
                            clusterer.balloon.open(objectState.cluster);
                        } else if (objectState.isShown) {
                            geoObjects[json.current_index].balloon.open();
                        }
                    }
                });
            });
        },

        buildRoute(button, map_container) {
            const map = map_container.map;
            if (map) {
                map.controls.add('routePanelControl');
                map.controls.get('routePanelControl').routePanel.state.set({
                    type: 'masstransit',
                    fromEnabled: true,
                    from: '',
                    toEnabled: false,
                    to: button.dataset.address,
                })
            }
        },

        detect_tz() {

            const now = new Date();
            const later = new Date();
            later.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
            let time_zone_offset = now.getTimezoneOffset();
            const d1 = new Date();
            const d2 = new Date();
            d1.setDate(1);
            d1.setMonth(1);
            d2.setDate(1);
            d2.setMonth(7);
            let time_zone_dst = '0';
            if (parseInt(d1.getTimezoneOffset()) == parseInt(d2.getTimezoneOffset())) {} else {
                const hemisphere = parseInt(d1.getTimezoneOffset()) - parseInt(d2.getTimezoneOffset());
                if ((hemisphere > 0 && parseInt(d1.getTimezoneOffset()) == parseInt(now.getTimezoneOffset())) ||
                    (hemisphere < 0 && parseInt(d2.getTimezoneOffset()) == parseInt(now.getTimezoneOffset()))) {} else time_zone_dst = '1';
            }
            setCookie('offset', time_zone_offset);
            setCookie('dst', time_zone_dst);
        },

        suggestDomain() {

            const c = document.querySelector('#top > .layout') || document.querySelector('.custom-top > .layout');
            if (c) {
                const path = window.location.href.replace(window.location.origin, '');
                const url = get_ajax_url('Localization', 'suggest_domain', 'maincode=' + encodeURIComponent(path));
                Gooru.get(url).then(data => document.body.insertAdjacentHTML('beforeend', data));
            }

        },

        get_lv(key) {
            return new Promise((resolve, reject) => {
                if (Gooru.isCp()) {
                    resolve({
                        JS_OK: 'OK',
                        JS_CANCEL: 'Отмена',
                    });
                } else if (this.lvs) resolve(key ? this.lvs[key] : this.lvs);
                else {
                    const url = get_ajax_url('Localization', 'ajax_lang_values');
                    Gooru.get(url).then(data => {
                        this.lvs = data;
                        resolve(key ? this.lvs[key] : this.lvs);
                    });
                }
            });
        },

    }

    return module;
});