/**
 * Created by lei on 2017/7/26.
 */
/**
 * Created by lei on 2017/7/25.
 */
var Ces = require('ces');
var Cui = require('cui');
var sessionKey="";
var localKey= "";

var _sessionStorage = {
     sessionSetQ:function (params){
         console.log("收藏问题");

         if(params.type ==1 ){//收藏
             sessionKey ="subject-"+params.subject+"-"+"1";
         }
         if(!localStorage.hasOwnProperty(sessionKey)){
             this.initStorage();
         }
         var collectQ = JSON.parse(localStorage.getItem(sessionKey));
         var strQ  = JSON.stringify(question);
         var listQ = collectQ.list.indexOf(strQ);
         //先遍历是否存储过，若没有再存
         if(listQ != -1){
             console.log("存在位置",listQ);
         }else{
             collectQ.list.push(strQ);
         }
         localStorage.setItem(localKey,JSON.stringify(collectQ));
         console.log("====",JSON.parse(localStorage.getItem(localKey)))

     },
     sessionGetQ:function (){

    },
     sessionRemoveQ:function () {

     },
     initStorage:function(){
         if(!sessionStorage.hasOwnProperty(sessionKey)){
             var storage = {
                 list:[]
             };
             sessionStorage.setItem(sessionKey,JSON.stringify(storage));
         }
     }
};
var _localStorage={
        localSetQ:function(question,params){
            console.log("缓存题目");
            if(params.type == 1){//收藏
                localKey ="subject-"+params.subject+"-"+params.type;
            }
            if(!localStorage.hasOwnProperty(localKey)){
                this.initLocalStorage(params)
            }
            var arrIndex = parseInt(question.virtualId) + 1;
            var localObj = JSON.parse(localStorage.getItem(localKey));
                console.log("arrIndex==",arrIndex);
                localObj.list.splice(arrIndex,1,question);

            console.log('localSetQ===',localObj);
            localStorage.setItem(localKey,JSON.stringify(localObj));
        },
        localGetQ:function (params,index) {
            console.log("获取题目")
            if(params.type == 1){//收藏
                localKey ="subject-"+params.subject+"-"+params.type;
            }
            if(localStorage.hasOwnProperty(localKey)){
                var itemQ = JSON.parse(localStorage.getItem(localKey));
             //   var lastIndex = index || itemQ.list.length - 1;
                var listIndex = 0;
                if(index>=0){
                    listIndex = index;
                }else{
                    listIndex=itemQ.list.length - 1;
                }
                var questList={};
                console.log("localGetQ listIndex=",listIndex);
                if(listIndex >=0 ){
                    questList =itemQ.list[listIndex]
                }
                console.log("localGetQ",questList);
                return questList;
            }
        },
        localRemoveQ:function () {
            console.log("删除题目");

        },
        localQLength:function (params) {
            console.log("缓存长度");
            if(params.type == 1){//收藏
                localKey ="subject-"+params.subject+"-"+params.type;
            }
            if(!localStorage.hasOwnProperty(localKey)){
                this.initLocalStorage(params)
            }
            var qLength =  JSON.parse(localStorage.getItem(localKey)).list.length;

            return qLength
        },
        initLocalStorage:function () {
            if(!localStorage.hasOwnProperty(localKey)){
                var localQ = {
                    list:[]
                };
                localStorage.setItem(localKey,JSON.stringify(localQ));
            }
        }
}

var Storage={
        session:_sessionStorage,
        local:_localStorage
};
module.exports = Storage ;