var Cui = require('cui');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            name: ''
        }
    },
    activated: function () {
        var _this = this;
        _this.$api.LoginData.get(function (data) {
            var account = data['account'];
            _this.name = account.name;
        });
    },
    methods: {
        submit: function () {
            var _this = this;
            if (!_this.name) {
                Cui.Toast({
                    message: '请输入姓名',
                    position: 'bottom'
                });
                return;
            }
            _this.$api.post('api/crm/customer/changeName', {
                name: _this.name
            }).then(function (rets) {
                if (rets.status !== 'OK') {
                    Cui.Toast({
                        message: rets.message,
                        position: 'bottom'
                    });
                } else {
                    _this.$api.LoginData.get(function (data) {
                        data['account'].name = _this.name;

                        _this.$api.LoginData.set(data, function () {
                            _this.$router.push({ path: '/personal' });
                        }, function () {
                            Cui.MessageBox.alert('系统异常，操作失败');
                        });
                    });

                }
            });
        }
    }
};