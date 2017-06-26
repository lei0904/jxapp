var Ces = require('ces');
var Cui = require('cui');
var Api = require('api');
var Plugins = require('plugins');

var menus = {
    'sg-help-family': [
        {
            name:"会见申请",
            image:"/special-group-web/1.0.0/lib/images/icon_Interview.png",
            size:"",
            to:'/meetingRoom'
        },
        {
            name:"会见室",
            image:"/special-group-web/1.0.0/lib/images/icon_metRom.png",
            size:"",
            to:'/meetingView'
        },
        {
            name:"文化教育",
            image:"/special-group-web/1.0.0/lib/images/icon_culEdu.png",
            size:"",
            to:''
        },
        {
            name:"技能教育",
            image:"/special-group-web/1.0.0/lib/images/icon_sklEdu.png",
            size:"",
            to:''
        },
        {
            name:"法律服务",
            image:"/special-group-web/1.0.0/lib/images/icon_legalSev.png",
            size:"",
            to:'/legalService'
        },
        {
            name:"帮教服务",
            image:"/special-group-web/1.0.0/lib/images/icon_loveEdu.png",
            size:"",
            to:'/helpService'
        },
        {
            name:"我的消息",
            image:"/special-group-web/1.0.0/lib/images/icon_messager.png",
            size:"w50",
            to:'/myMessage'
        }
    ],
    'sg-help-lawyer':[
        {
            name:"会见申请",
            image:"/special-group-web/1.0.0/lib/images/icon_Interview.png",
            size:"",
            to:'/meetingRoom'
        },
        {
            name:"会见室",
            image:"/special-group-web/1.0.0/lib/images/icon_metRom.png",
            size:"",
            to:'/meetingView'
        },
        {
            name:"服务咨询",
            image:"/special-group-web/1.0.0/lib/images/icon_legalSev.png",
            size:"",
            to:'/acceptService'
        },
        {
            name:"我的消息",
            image:"/special-group-web/1.0.0/lib/images/icon_messager.png",
            size:"",
            to:'/myMessage'
        }
    ],
    'sg-help-counselor':[
        {
            name:"会见申请",
            image:"/special-group-web/1.0.0/lib/images/icon_Interview.png",
            size:"",
            to:'/meetingRoom'
        },
        {
            name:"会见室",
            image:"/special-group-web/1.0.0/lib/images/icon_metRom.png",
            size:"",
            to:'/meetingView'
        },
        {
            name:"我的服务",
            image:"/special-group-web/1.0.0/lib/images/icon_legalSev.png",
            size:"",
            to:'/psychologistService'
        },
        {
            name:"我的消息",
            image:"/special-group-web/1.0.0/lib/images/icon_messager.png",
            size:"",
            to:'/myMessage'
        }
    ],
    'sg-help-social':[
        {
            name:"会见申请",
            image:"/special-group-web/1.0.0/lib/images/icon_Interview.png",
            size:"",
            to:'/meetingRoom'
        },
        {
            name:"留言板",
            image:"/special-group-web/1.0.0/lib/images/icon_metRom.png",
            size:"",
            to:''
        },
        {
            name:"我的帮教",
            image:"/special-group-web/1.0.0/lib/images/icon_loveEdu.png",
            size:"",
            to:'/helpService'
        },
        {
            name:"我的消息",
            image:"/special-group-web/1.0.0/lib/images/icon_messager.png",
            size:"",
            to:'/myMessage'
        }
    ]

};


var handler = {
    '1': function (item) {
        var target = item['target'];
        Ces.JSBridge.callHandler('pushOuterWindow', [target, '']);
    },
    '2' : function (item) {
        var attachment_type = item['attachment_type'];
        var attachment = item['attachment'];

        /*Api.get('api/sys/attachment/get/' + attachment, {}, function (rets) {
            if (rets['status'] == 'OK') {
                var data = rets['data'];
                var path = data['path'];
                var link = Api.attachmentPath + 'download?path=' +  path;
                console.log(link);
                if (attachment_type == 1) { //VIDEO - 1
                    Ces.JSBridge.callHandler('media', [1, link]);
                } else if (attachment_type == 2) { //PDF - 0
                    Ces.JSBridge.callHandler('media', [0, link]);
                }
            }
        });*/

        var link = Api.attachmentPath +  attachment;
        if (attachment_type == 1) { //VIDEO - 1
            Ces.JSBridge.callHandler('media', [1, link]);
        } else if (attachment_type == 2) { //PDF - 0
            Ces.JSBridge.callHandler('media', [0, link]);
        }
    }
};

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            attachment: Api.attachmentPath,
            selected:"new_item1",
            xwdt:[],
            zcfg:[],
            banners:[],
            menu:''
        }
    },
    created: function () {
        var _this = this;
        Plugins.getLoginData(function (data) {
            var role = data['role'];
            var code = role.code;
            _this.menu = menus[code];

            _this.getData();
        });
    },
    methods:{
        getData:function () {
            var _this = this;
            Api.get("api/main", {}, function (rets) {
                _this.xwdt = rets.data.articles.xwdt;
                _this.zcfg = rets.data.articles.zcfg;
                _this.banners = rets.data.banners;
            })
        },
        bannerView: function (item) {
            var type = item.type;
            var fn = handler[type];
            fn && fn(item);
        },
        articleView: function (title, url, id) {
            Ces.JSBridge.callHandler('pushOuterWindow', [url, title]);
            Api.post('api/cms/article/view/' + id, {}, function (rets) {
                if (rets['status'] == 'OK') {
                    var els = document.getElementsByName('hits_' + id);
                    // els && els.forEach(function (item) {
                    //     item.innerHTML = rets['data'];
                    // });
                    for(var i=0; i<els.length; i++){
                        els[i].innerHTML = rets['data'];
                    }

                }
            });
        }
    }
};