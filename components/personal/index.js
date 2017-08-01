var Cui = require('cui');
var Ces = require('ces');
var Plugins = require('plugins');

var Vue = require('vue');
var Attachment = require('../attachment/index.js');

Vue.component('attachment-upload', Attachment);

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            avatar_upload_url: '',

            accountId: '',
            avatar: '/jxapp/1.0.0/lib/images/avatar.png',
            name: '',
            invite: '',
            actions: [],
            money: 0,
            favsrc: '',
            showinfo: ''
        }
    },
    activated: function () {
        var _this = this;
        _this.$api.LoginData.get(function (data) {
            var account = data['account'];
            _this.name = account.name;
            _this.invite = account.invite;
            if (account.avatar) {
                _this.avatar = _this.$api.image_path(account.avatar);
            }
        });
    },
    created: function () {
        this.avatar_upload_url = this.$api.getUrl('api/crm/customer/avatar');
    },
    methods: {
        logout: function () {
            var _this = this;
            Cui.MessageBox.confirm('确认退出登录吗？', '', {
                callback: function (action) {
                    if (action === 'confirm') {
                        _this.$api.post('api/logout', {}).then(function (rets) {
                            _this.$api.process(rets, function (rets) {
                                _this.$api.LoginData.remove();
                                _this.$router.push({path: '/login'});
                            });
                        });
                    }
                }
            })
        },
        select_method: function () {
            this.$refs.imgSelect.currentValue = true;
        },
        toBespeakList: function () {
            this.$router.push({path: '/bespeakList'});
        },
        toShuttleList: function () {
            this.$router.push({path: '/shuttleList'});
        },

        selectPhoto: function () {
            this.$refs.au.select();
        },
        takePhoto: function () {
            this.$refs.au.take();
        }
    },
    mounted: function () {
        this.actions = [
            {
                name: '拍照',
                method: this.takePhoto
            },
            {
                name: '从相册选择',
                method: this.selectPhoto
            }
        ]
    }
};