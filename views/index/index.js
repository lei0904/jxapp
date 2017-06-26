'use strict';

require.config(__FRAMEWORK_CONFIG__);

require.async(['ces',
                'vue',
                'cui',
                'api',
                'vue-router',
                'routes',
                'plugins'
            ], function (
                Ces,
                Vue ,
                Cui ,
                Api ,
                VueRouter,
                Routes,
                Plugins) {

    var _app = {
        init: function (account, role) {
            Vue.use(VueRouter);

            var router = new VueRouter({
                routes: Routes.routes
            });

            var title = '特群云';

            router.beforeEach(function (to, from, next) {
                if (to.path == '/') {
                    next('/index');
                } else {
                    if (app) {
                        app.title = to.meta.title;
                        app.backable = to.meta.backable;
                        app.savable = to.meta.savable;
                        app.searchable = to.meta.searchable;
                        app.navable = to.meta.navable;
                        app.keepAlive = to.meta.keepAlive;
                        if (to.meta.value == from.meta.value) {
                            app.animate = "fade";
                        } else if(to.meta.value > from.meta.value){
                            app.animate = "left-fade";
                        } else {
                            app.animate = "right-fade";
                        }
                    } else {
                        title = to.meta.title;
                    }
                    next();
                }

            });
            var app = new Vue({
                el: '#app',
                router: router,
                beforeRouteEnter: function () {
                    console.log('-----beforeRouteEnter----')
                },
                data: {
                    full: false,
                    title: "特群云",
                    backable: false,
                    navable: true,
                    savable  : false,
                    searchable: false,
                    keepAlive:true,
                    animate: "left-fade",
                    user: '',
                    password: '',
                    data:''
                },
                methods: {
                    back: function () {
                        this.$router.back();
                    }
                }
            }).$mount('#app');
        }
    };

    Ces.ready(function () {
        Plugins.getLoginData(function (data) {
            var account = data['account'];
            var role = data['role'];
            _app.init(account, role);
        });
    });

});

