var Cui = require('cui');
var Ces = require('ces');
var Plugins = require('plugins');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            accountId:'',
            avatar: '/jxapp/1.0.0/lib/images/avatar.png',
            name:'',
            invite:'',
            actions: [],
            money: 0,
            favsrc: '',
            showinfo:''
        }
    },
    activated: function () {

    },
    created: function () {
        var _this = this;
        _this.$api.LoginData.get(function (data) {
            var account = data['account'];
            console.log(account);
            _this.name = account.name;
            _this.invite = account.invite;
        });
    },
    methods:{
        logout: function () {
            var _this = this;
            Cui.MessageBox.confirm('确认退出登录吗？', '', {
                callback: function (action) {
                    if (action === 'confirm') {
                        _this.$api.post('api/logout', {}).then(function (rets) {
                            _this.$api.process(rets, function (rets) {
                                _this.$api.LoginData.remove();
                                _this.$router.push({ path: '/login' });
                            });
                        });
                    }
                }
            })
        },
        select_method:function () {
            this.$refs.imgSelect.currentValue = true;
        },
        toBespeakList: function () {
            this.$router.push({ path: '/bespeakList' });
        },
        toShuttleList: function () {
            this.$router.push({ path: '/shuttleList' });
        }
    },
    mounted:function () {
        this.actions = [
            {
                name: '拍照',
                method: this.takePhoto
            },
            {
                name:'从相册选择',
                method:this.selectPhoto
            }
        ]
    }
};