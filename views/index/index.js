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
                    if (app) {
                        app.title = to.meta.title;
                        app.backable = to.meta.backable;
                        app.searchable = to.meta.searchable;
                        app.showLogo = to.meta.showLogo;
                        if (to.meta.value == from.meta.value) {
                            app.animate = "fade";
                        } else if(to.meta.value > from.meta.value){
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
                data:function(){
                    return{
                        wrapperHeight:'',
                        backable:false,
                        searchable:false,
                        showLogo:true,
                        title:'预约学车',
                        value:'',
                        animate: "left-fade",
                        searchText:''
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

