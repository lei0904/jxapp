var Ces = require('ces');
var Cui = require('cui');
var Api = require('api');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            full: false,
            animate: "left-fade",
            user: '13053083464',
            password: '000000'
        }
    },
    methods: {
        doLogin: function () {
            var regPhone = /^1(3|4|5|7|8)\d{9}$/;
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

            this.$router.push({ path: '/index' });

            // Api.post(Api.login,
            //     {
            //         account: vm.user,
            //         password: vm.password,
            //         push_id: data['push_id'],
            //         type: vm.type
            //     }
            //     , function (rets) {
            //         if (rets.status !== 'OK') {
            //             Cui.Toast({
            //                 message: rets.message,
            //                 position: 'bottom'
            //             });
            //         } else {
            //             Ces.JSBridge.callHandler('setLoginData', [0, rets.data], function (d) {
            //                 if (d['status'] == 1) {
            //                     Ces.Page.open('/index/index.html');
            //                 } else {
            //                     Cui.MessageBox.alert('系统异常，登录失败');
            //                 }
            //             });
            //         }
            //     })
        },
        register: function () {
            this.$router.push({ path: '/register' });
        },
        openAttr: function () {
            this.$refs.picker2.open();
        },
        attrChange: function (value) {
            this.userAttr = value.name;
            this.type = value.code;
        }
    }
};