var Ces = require('ces');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            selected: '1',
        }
    },
    methods: {
        toPractice:function () {
            var params = [1,{'type':2,'chapterDesc':'交通信号','question':10}];
            Ces.Plugins.nativeApi.questions(params,function(rets){
                console.log('=====',rets)
            })
        }
    }
};