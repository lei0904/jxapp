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
            mobile: '',
            status: '',
            combo: '',

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
            _this.mobile = account.mobile;
            _this.invite = account.invite;
            if (account.avatar) {
                _this.avatar = _this.$api.image_path(account.avatar);
            }
        });

        _this.$api.get('api/crm/customer/info', {})
            .then(function (rets) {
                if (rets.data) {
                    _this.status = {
                        0:'未缴费',
                        1:'科目一',
                        2:'科目二',
                        3:'科目三',
                        4:'科目四'
                    }[rets.data.status];
                    _this.combo = rets.data.combo_name;
                } else {
                    _this.status = '未报名';
                    _this.combo = '未报名';
                }
            })
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
        toContact: function () {
            this.$router.push({path: '/contact'});
        },
        toChangeName: function () {
            this.$router.push({path: '/changeName'});
        },
        toChangePassword: function () {
            this.$router.push({path: '/changePassword'});
        },

        selectPhoto: function () {
            this.$refs.au.select();
        },
        takePhoto: function () {
            this.$refs.au.take();
        },
        changeName:function () {
            this.changeUserName = true;
        },
        confirmChange:function () {

        },
        goBack:function () {
            this.changeUserName = false;
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