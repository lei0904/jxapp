var Ces = require('ces');
var Cui = require('cui');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            full: false,
            animate: "left-fade",
            user: '13365698927',
            password: '123456'
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
            var _this = this;
            this.$api.post('api/login', {
                    mobile: _this.user,
                    password: _this.password
                }).then(function (rets) {
                    if (rets.status !== 'OK') {
                        Cui.Toast({
                            message: rets.message,
                            position: 'bottom'
                        });
                    } else {
                        _this.$api.LoginData.set(rets.data, function () {
                            _this.$router.push({ path: '/index' });
                        }, function () {
                            Cui.MessageBox.alert('系统异常，登录失败');
                        });
                    }
                });

            /*this.$api.post('api/login',
                {
                    mobile: _this.user,
                    password: _this.password
                }
                , function (rets) {
                    if (rets.status !== 'OK') {
                        Cui.Toast({
                            message: rets.message,
                            position: 'bottom'
                        });
                    } else {
                        _this.$api.LoginData.set(rets.data, function () {
                            _this.$router.push({ path: '/index' });
                        }, function () {
                            Cui.MessageBox.alert('系统异常，登录失败');
                        });
                    }
                })*/
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