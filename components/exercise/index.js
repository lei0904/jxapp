var Ces = require('ces');
var Cui =require('cui');
var Collect = require('examCollect');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            selected: '1',
        }
    },
    methods: {
        toPractice:function (obj) {
            var params = JSON.stringify({'subject':this.selected,'type':obj,'start':true,questions:0});
            sessionStorage.setItem("topic",params);
            console.log('toPractice', sessionStorage.getItem("topic"));
           if( obj == 2){
                this.$router.push({'path':'/examsDir'})
            }else if(obj == 1 || obj == 3 || obj == 4){
                this.$router.push({path:'/exams'})
            }else{
               var localParams = JSON.parse(params);
               if( Collect.getQLength(localParams) >0){
                   this.$router.push({path:'/examsLocal',query:localParams})
               }else{
                   Cui.Toast({
                       message: "没有收藏题目了",
                       position: 'bottom'
                   });
               }
           }

        }
    }
};