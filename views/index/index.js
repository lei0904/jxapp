'use strict';

require.config(__FRAMEWORK_CONFIG__);

require.async(['ces',
    'vue',
    'cui',
    'api',
    'vue-router',
    'routes',
    'vue-touch'
], function (Ces,
             Vue,
             Cui,
             Api,
             VueRouter,
             Routes,
             VueTouch) {

    VueTouch.install(Vue);
    Vue.use(Api);

    var _app = {
        init: function (account, role) {
            Vue.use(VueRouter);

            var d = {
                wrapperHeight: '',
                backable: false,
                searchable: false,
                showLogo: true,
                title: '预约学车',
                value: '',
                animate: "left-fade",
                searchText: '',
                fullScreen: false,
                showToolBar: false
            };

            var router = new VueRouter({
                routes: Routes.routes
            });

            router.beforeEach(function (to, from, next) {
                if (to.path === '/') {
                    d.showToolBar = true;
                    next('/index');
                } else {
                    if (app) {
                        app.fullScreen = to.meta.fullScreen;
                        app.showToolBar = to.meta.showToolBar;
                        //app.title = to.meta.title;
                        app.backable = to.meta.backable;
                        app.searchable = to.meta.searchable;
                        //app.showLogo = to.meta.showLogo;
                        if (to.meta.value === from.meta.value) {
                            app.animate = "fade";
                        } else if (to.meta.value > from.meta.value) {
                            app.animate = "left-fade";
                        } else {
                            app.animate = "right-fade";
                        }
                    }
                    next();
                }

            });

            var app = new Vue({
                el: '#app',
                router: router,
                mounted: function () {
                    if (!this.showToolBar &&
                        (
                            window.location.hash.indexOf('index') > -1 ||
                            window.location.hash.indexOf('exercise') > -1 ||
                            window.location.hash.indexOf('reserved') > -1 ||
                            window.location.hash.indexOf('personal') > -1
                        )) {
                        this.showToolBar = true;
                    }
                },
                data: function () {
                    return d;
                },
                methods: {
                    back: function () {
                        this.$router.back();
                    }
                },
                updated: function () {
                    this.wrapperHeight = document.documentElement.clientHeight
                        - this.$refs.title.clientHeight
                        - this.$refs.toolbar.clientHeight;
                }
            }).$mount('#app');
        }
    };

    Ces.ready(function () {
        _app.init()
    });
    // _app.init()
});

