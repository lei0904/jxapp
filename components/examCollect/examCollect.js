/**
 * Created by lei on 2017/7/25.
 */
var Ces = require('ces');
var Cui = require('cui');
var localKey="";
var errorKey="";
var collect ={
    setQ:function(question,params){
        console.log(params);
        if(params.type != 6){//收藏
            localKey ="subject-"+params.subject+"-"+"5";
        }
        if(!localStorage.hasOwnProperty(localKey)){
            this.initCollectQ();
        }
        var collectQ = JSON.parse(localStorage.getItem(localKey));
        var strQ  = JSON.stringify(question);
        var listQ = collectQ.list.indexOf(strQ);
        //先遍历是否存储过，若没有再存
            if(listQ != -1){
                 console.log("存在位置",listQ);
            }else{
                collectQ.list.push(strQ);
            }
        localStorage.setItem(localKey,JSON.stringify(collectQ));
    },
    setErrorQ:function(question,params){//设置错题
        localKey ="subject-"+params.subject+"-"+"6";
        if(!localStorage.hasOwnProperty(localKey)){
            this.initCollectQ();
        }

        console.log("localKey错题缓存",localKey);
        var collectQ = JSON.parse(localStorage.getItem(localKey));
        var strQ  = JSON.stringify(question);
        var listQ = collectQ.list.indexOf(strQ);
        //先遍历是否存储过，若没有再存
        if(listQ != -1){
            console.log("存在位置",listQ);
        }else{
            collectQ.list.push(strQ);
        }
        localStorage.setItem(localKey,JSON.stringify(collectQ));
    },
    getQLength:function(params){
        if(params.type != 6){//收藏
            localKey ="subject-"+params.subject+"-"+"5";
        }else{
            localKey ="subject-"+params.subject+"-"+"6";
        }
        if(localStorage.hasOwnProperty(localKey)){
            var itemQ = JSON.parse(localStorage.getItem(localKey));
            return itemQ.list.length
        }else{
            return 0;
        }
    },
    getQ:function(indexId,params){
        if(params.type != 6){//收藏
            localKey ="subject-"+params.subject+"-"+"5";
        }else{
            localKey ="subject-"+params.subject+"-"+"6";
        }
        if(localStorage.hasOwnProperty(localKey)){
            var itemQ = JSON.parse(localStorage.getItem(localKey));
            if(itemQ.list.length > parseInt(indexId)){
                console.log("返回收藏",itemQ.list[indexId]);
                return JSON.parse(itemQ.list[indexId]);
            }else{
                return -1;
            }
        }
    },
    removeQ:function(question,params){
        if(params.type != 6){//收藏
            localKey ="subject-"+params.subject+"-"+"5";
        }else{
            localKey ="subject-"+params.subject+"-"+"6";
        }
        var collectQ = JSON.parse(localStorage.getItem(localKey));
        var strQ  = JSON.stringify(question);
        var listQ = collectQ.list.indexOf(strQ);
        if(listQ != -1){
            collectQ.list.splice(strQ,1);
            localStorage.setItem(localKey,JSON.stringify(collectQ));
        }
    },
    initCollectQ:function(){
        if(!localStorage.hasOwnProperty(localKey)){
            var collectQ = {
                list:[]
            };
            localStorage.setItem(localKey,JSON.stringify(collectQ));
        }
    }
};

module.exports = collect ;