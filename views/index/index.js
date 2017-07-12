'use strict';

require.config(__FRAMEWORK_CONFIG__);

require.async(['ces',
                'vue',
                'cui',
                'api',
                'vue-router',
                'routes'
            ], function (
                Ces,
                Vue ,
                Cui ,
                Api ,
                VueRouter,
                Routes) {

    var _app = {
        init: function (account, role) {
            Vue.use(VueRouter);

            var router = new VueRouter({
                routes: Routes.routes
            });

            router.beforeEach(function (to, from, next) {
                if (to.path == '/') {
                    next('/index');
                } else {
                    next();
                }

            });

            var app = new Vue({
                el: '#app',
                router: router,
                data:function(){
                    return{
                        wrapperHeight:'',
                        backable:true
                    }
                },
                methods: {
                    back: function () {
                        this.$router.back();
                    }
                },
                mounted:function(){
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

