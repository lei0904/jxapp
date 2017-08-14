var Ces = require('ces');
var Cui = require('cui');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            full: false,
            animate: "left-fade",
            user: '',
            password: ''
        }
    },
    methods: {
        doLogin: function () {
            var _this = this;
            _this.$validator.validateAll().then(function(result) {
                if (!result) {
                    _this.$validator.renderError();
                    return;
                }
                if (Ces.Config.plugin) {
                    Ces.JSBridge.callHandler('jpush', [], function (rets) {
                        if (rets && rets.status === 1 && rets.data) {
                            var pushId = rets.data;
                            _this.$api.post('api/login', {
                                mobile: _this.user,
                                pushId: pushId,
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
                        } else {
                            Cui.MessageBox.alert('系统异常，登录失败');
                        }
                    });
                } else {
                    var pushId = '1104a897929c9173620';
                    _this.$api.post('api/login', {
                        mobile: _this.user,
                        pushId: pushId,
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
                }

            });
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
