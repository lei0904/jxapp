var Ces = require('ces');
var Cui = require('cui');
var Api = require('api');
var Helper = require('helper');

var Storage = require('../api/storage.js')

var weeks = ['一', '二', '三', '四', '五', '六', '日'];


module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            loaded: false,
            banners: [],
            combos: []
        }
    },
    filters: {
        showComboOrderWeeks: function (combo) {
            var str = combo['order_weeks'];
            if (!str) {
                return '';
            }
            var result = [];
            var arr = str.split(',');
            arr.forEach(function (o) {
                result.push('周' + weeks[parseInt(o)-1]);
            });
            return result.join(",");
        },
        showComboOrderTimes: function (combo) {
            return combo['order_start_time'] + ' - ' + combo['order_end_time']
        }
    },
    methods:{
        bannerClick: function (banner) {
            Helper.banner.call(this, banner);
        },
        toComboDetail: function (combo) {
            new Storage('session').set('ComboDetail', Storage.stringify(combo));
            this.$router.push({ path: '/comboDetail' });
        },

        sendAppActive: function () {
            var s = new Storage('local');
            var str = s.get('_app_active_');
            var data = null;
            if (str) {
                data = Storage.parse(str);
            }

            var today = new Date();
            var today_date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();

            if (data && data.date) {
                var date = data.date;
                if (date === today_date) {
                    return;
                }
            }

            var _this = this;
            var cfg = require.config().config;
            var pkg = null;
            if (cfg && cfg.pkg) {
                pkg = cfg.pkg;
            }
            if (!pkg) {
                return;
            }

            _this.$api.get('api/app/active', {pkg : pkg}).then(function (rets) {
                _this.$api.process(rets, function (rets) {
                    console.log(rets);
                    s.set('_app_active_', Storage.stringify({
                        date: today_date
                    }))
                });
            });
        }
    },
    computed: {
        bannerImages: function () {
            var _this = this;
            return _this.banners.filter(function (banner) {
                banner['path'] = _this.$api.image_path(banner.path);
                return banner;
            })
        }
    },
    activated: function () {
        if (!this.loaded) {
            var _this = this;
            _this.$api.get('api/main', {}).then(function (rets) {
                _this.banners = rets.data.banners;
                _this.combos = rets.data.combos;

                _this.loaded = true;

                setTimeout(function () {
                    _this.sendAppActive();
                }, 2000);


            }).catch(function (e) {
                Cui.MessageBox.alert('数据加载失败！', '系统提示');
            });
        }
    }
};