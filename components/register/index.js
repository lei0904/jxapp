var Ces = require('ces');
var Cui = require('cui');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            mobile: '13856952863'
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
            _this.$api.get('api/register/sms/' + this.mobile, {}, false).then(function (rets) {
                _this.$api.process(rets, function (rets) {
                    console.log(rets);
                });
            });
        },
        submit: function () {
            alert(22);
        }
    }
};