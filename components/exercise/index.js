var Ces = require('ces');

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
               this.$router.push({path:'/examsLocal'})
           }

        }
    }
};