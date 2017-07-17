var Cui = require('cui');
var Ces = require('ces');
var Api = require('api');
var Plugins = require('plugins');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            accountId:'',
            name:'',
            actions: [],
            money: 0,
            favsrc: '',
            showinfo:''
        }
    },
    activated: function () {

    },
    created: function () {

    },
    methods:{

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