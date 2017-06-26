'use strict';

require.config(__FRAMEWORK_CONFIG__);

require.async([
            'ces',
            'vue',
            'cui',
            'api'
], function (Ces,
             Vue,
             Cui,
             Api) {
    var _app = {
        init: function (data) {
            var vm;
            var regPhone = /^1(3|4|5|7|8)\d{9}$/;
            vm = new Vue({
                el: '#app',
                data: function () {
                    return{
                        full: false,
                        title: "特群云",
                        backable: false,
                        navable: true,
                        savable: false,
                        searchable: false,
                        animate: "left-fade",
                        user: '13053083464',
                        password: '000000',
                        userAttr: "请选择角色属性",
                        type: "",
                        appRoles: [
                            {
                                name:'家属',
                                code:"sg-help-family"
                            },
                            {
                                name:'律师',
                                code:"sg-help-lawyer"
                            },
                            {
                                name:'心理咨询',
                                code:"sg-help-counselor"
                            },
                            {
                                name:'社工',
                                code:"sg-help-social"
                            }
                        ]
                    }
                },
                methods: {
                    doLogin: function () {
                        if (!this.user) {
                            Cui.Toast({
                                message: '请输入手机号码',
                                position: 'bottom'
                            });
                            return;
                        }
                        if (!(regPhone.test(this.user))) {
                            Cui.Toast({
                                message: '请输入正确的手机号码',
                                position: 'bottom'
                            });
                            return;
                        }
                        if (!this.password) {
                            Cui.Toast({
                                message: '请输入密码',
                                position: 'bottom'
                            });
                            return;
                        }
                        if (!this.type) {
                            Cui.Toast({
                                message: '请选择角色属性',
                                position: 'bottom'
                            });
                            return;
                        }
                        Api.post(Api.login,
                            {
                                account: vm.user,
                                password: vm.password,
                                push_id: data['push_id'],
                                type: vm.type
                            }
                            , function (rets) {
                                if (rets.status != 'OK') {
                                    Cui.Toast({
                                        message: rets.message,
                                        position: 'bottom'
                                    });
                                } else {
                                    Ces.JSBridge.callHandler('setLoginData', [0, rets.data], function (d) {
                                        if (d['status'] == 1) {
                                            Ces.Page.open('/index/index.html');
                                        } else {
                                            Cui.MessageBox.alert('系统异常，登录失败');
                                        }
                                    });
                                }
                            })
                    },
                    register: function () {
                        window.location.href = '../register/index.html';
                    },
                    openAttr: function () {
                        this.$refs.picker2.open();
                    },
                    attrChange: function (value) {
                        this.userAttr = value.name;
                        this.type = value.code;
                    }
                }
            });
        }
    };

    Ces.ready(function (data) {
        if (!Ces.Config.debug) {
            _app.init(data);
        } else {
            _app.init({
                push_id: '1a0018970aaaf1ad7c4'
            });
        }
    });

});

