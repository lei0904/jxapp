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
            var _this = this;
            _this.$validator.validateAll().then(function(result) {
                if (!result) {
                    _this.$validator.renderError();
                    return;
                }

                _this.$api.post('api/login', {
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
