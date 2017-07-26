var Ces = require('ces');
var Cui = require('cui');
var Api = require('api');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            mobile:'',
            code:'',
            password:'',
            msg_id: ''
        }
    },
    methods: {
        getVerifyCode: function (e) {
            if (e.target.getAttribute("disable")) {
                return;
            }
            if (!this.mobile) {
                Cui.Toast({
                    message: '请输入注册手机号',
                    position: 'bottom'
                });
                return;
            }

            var timeout = 10;
            e.target.setAttribute("disable", "disable");
            e.target.innerHTML = timeout  + 's重新获取';
            var i = setInterval(function () {
                if (timeout === 1) {
                    clearInterval(i);
                    timeout = 10;
                    e.target.innerHTML = '重新获取';
                    e.target.removeAttribute("disable");
                } else {
                    timeout = timeout - 1;
                    e.target.innerHTML = timeout  + 's重新获取';
                }
            }, 1000);
            var _this = this;
            _this.$api.get('api/password/sms/' + this.mobile, {}, false).then(function (rets) {
                _this.$api.process(rets, function (rets) {
                    _this.msg_id = rets.data;
                }, function (rets) {
                    Cui.Toast({
                        message: rets.message,
                        position: 'bottom'
                    });
                });
            });
        },
        submit: function () {
            var _this = this;
            if (!this.msg_id) {
                Cui.Toast({
                    message: '请获取注册验证码',
                    position: 'bottom'
                });
                return;
            }
            _this.$validator.validateAll().then(function(result) {
                if (!result) {
                    _this.$validator.renderError();
                    return;
                }

                _this.$api.post('api/password', JSON.parse(JSON.stringify(_this.$data)), false).then(function (rets) {
                    _this.$api.process(rets, function (rets) {
                        _this.$router.push({ path: '/login' });
                    });
                });
            });
        }
    }
};