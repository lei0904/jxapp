var Ces = require('ces');
var Cui = require('cui');


module.exports = {
    getLoginData: function (cb) {
        Ces.JSBridge.callHandler('setLoginData',[1], function (d) {
            console.log(d);
            if (d['status'] == 1) {
                var data = d['data'];
                cb && cb(data);

            } else {
                Cui.MessageBox.alert('登录已过期，请您重新登录！', '系统提示').then(function () {
                    if (Ces.Config.service != 'native') {
                        Ces.Page.load('../index.html');
                    } else {
                        Ces.JSBridge.callHandler('redirectLoginPage', []);
                    }
                });
            }
        });
    }
};