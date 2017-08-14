var Cui = require('cui');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            password: '',
            password2: ''
        }
    },
    activated: function () {
        this.password = '';
        this.password2 = '';
    },
    methods: {
        submit: function () {
            var _this = this;
            if (!_this.password) {
                Cui.Toast({
                    message: '请输入密码',
                    position: 'bottom'
                });
                return;
            }
            if (!_this.password2) {
                Cui.Toast({
                    message: '请再次输入密码',
                    position: 'bottom'
                });
                return;
            }
            if (_this.password !== _this.password2) {
                Cui.Toast({
                    message: '两次密码不一样',
                    position: 'bottom'
                });
                return;
            }
            _this.$api.post('api/crm/customer/changePassword', {
                password: _this.password
            }).then(function (rets) {
                if (rets.status !== 'OK') {
                    Cui.Toast({
                        message: rets.message,
                        position: 'bottom'
                    });
                } else {
                    Cui.MessageBox.alert('修改密码成功，请重新登录', {
                        callback: function () {
                            _this.$router.push({ path: '/login' });
                        }
                    })
                }
            });
        }
    }
};