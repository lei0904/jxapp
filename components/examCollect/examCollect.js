/**
 * Created by lei on 2017/7/25.
 */
var Ces = require('ces');
var Cui = require('cui');

var collect ={
    setQ:function(question){
        console.log("收藏问题");
        var collectQ = JSON.parse(localStorage.getItem('collectQ'));
        var strQ  = JSON.stringify(question);
        var listQ = collectQ.list.indexOf(strQ);
        //先遍历是否存储过，若没有再存
            if(listQ != -1){
                 console.log("存在位置",listQ);
            }else{
                collectQ.list.push(strQ);
            }

        localStorage.setItem('collectQ',JSON.stringify(collectQ));
        console.log("====",JSON.parse(localStorage.getItem('collectQ')))

    },
    getQ:function(indexId){
        if(localStorage.collectQ){
            var itemQ = JSON.parse(localStorage.getItem('collectQ'));

            if(itemQ.list.length > parseInt(indexId)){
                console.log("返回收藏",itemQ.list[indexId]);
                return JSON.parse(itemQ.list[indexId]);
            }else{
                return -1;
            }
        }else{
            console.log('暂时没有收藏题目')
        }

    },
    removeQ:function(question){
        console.log("取消收藏问题");
        var collectQ = JSON.parse(localStorage.getItem('collectQ'));
        var strQ  = JSON.stringify(question);
        var listQ = collectQ.list.indexOf(strQ);

        if(listQ != -1){
            collectQ.list.splice(strQ,1);
            localStorage.setItem('collectQ',JSON.stringify(collectQ));
            console.log("11111",JSON.parse(localStorage.getItem('collectQ')))
        }


    },
    initCollectQ:function(){
        console.log("初始化收藏");
        if(!localStorage.collectQ){
            var collectQ = {
                list:[]
            };

            localStorage.setItem('collectQ',JSON.stringify(collectQ));
        }
    }
};

module.exports = collect ;