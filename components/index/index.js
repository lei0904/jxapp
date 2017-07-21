var Ces = require('ces');
var Cui = require('cui');
var Api = require('api');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {

        }
    },
    methods:{
    },
    mounted:function(){
        this.$api.get('api/main', {}).then(function (rets) {
            console.log(rets);
        });
    }
};