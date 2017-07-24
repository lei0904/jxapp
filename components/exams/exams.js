/**
 * Created by lei on 2017/7/13.
 */
var Ces = require('ces');
var Cui = require('cui');

module.exports = {
    template: __inline('exams.ftl'),
    data: function () {
        return {
            list:{
                options:[]
            },
            answer:'',  //选择答案
            checklist:[], //多选题答案
            explainShow:false, //解释
            rightAnswer:'', //正确答案
            questionId:0,  //序列号
            nextQuestionId:1,//下一题
            totalAnswer:0,
            chapterDesc:'', //专项训练
            sessionParams:{}, //缓存
            score:0,
            upQuestionId:0,
            step:0,//模拟步长
            seqStart:0,//模拟第一题
            mockSeq:0, //模拟随机序号
            upQuestion:false,
            answerList:[],
            allAnswer:{}
        }
    },
    methods: {
        upAnswer:function(){
            var type =this.sessionParams.type;
            this.upQuestion =false;
            if(type == 1){
                console.log(" 顺序练习上一题")
                if(localStorage.orderKey == 'undefind'){
                    var upParams = JSON.stringify({questions:this.sessionParams.questions,questionId:this.questionId,answerList:this.answerList});
                    localStorage.setItem('orderKey',upParams);
                }else{
                    var u = JSON.parse( localStorage.getItem('orderKey'));
                    console.log("u==",u);
                    this.sessionParams.questions = u.questions - 1;
                    this.questionId = u.questionId - 1;

                    var q= parseInt(this.sessionParams.questions);
                    if(this.sessionParams.optiontype != 2 && u.answerList.length >=  this.sessionParams.questions){
                        this.answer = u.answerList[q]
                    }else{
                        this.checklist = u.answerList[q]
                    }
                    console.log( this.answer,this.checklist)
                }

            }else if(type == 2){
                console.log("专项练习上一题");
                this.sessionParams.questions =  this.sessionParams.questions - 1;
            }else if(type == 3){
                console.log("随机练习上一题");
                if(this.sessionParams.type == 3  && this.upQuestion){ //随机练习
                    var num = Math.random()* this.totalAnswer + 1;
                    this.sessionParams.questions = parseInt(num, 10);
                }
            }else{
                console.log("模拟考试上一题");
                this.mockSeq = this.mockSeq - this.step;
                this.sessionParams.questions = this.mockSeq;
            }

            if(this.sessionParams.questions  <= -1  ){
                Cui.Toast({
                    message: "当前已是第一题",
                    position: 'bottom'
                });
                if(type == 1){
                    var t = JSON.parse( localStorage.getItem('orderKey'));
                    if(this.sessionParams.optiontype != 2){
                        this.answer = t.answerList[0]
                    }else{
                        this.checklist = t.answerList[0]
                    }
                }

            }else if(  this.sessionParams.questions == this.seqStart ){

                Cui.Toast({
                    message: "当前已是第一题",
                    position: 'bottom'
                });
                if(type == 1){
                    var t = JSON.parse( localStorage.getItem('orderKey'));
                    if(this.sessionParams.optiontype != 2){
                        this.answer = t.answerList[0]
                    }else{
                        this.checklist = t.answerList[0]
                    }
                }
            }else{
                //显示上一题答案
                // this.allAnswer= JSON.parse(sessionStorage.getItem('allAnswer'));
                // var s =parseInt(this.sessionParams.questions);
                // if(this.allAnswer.allAnswerList.length >=  this.sessionParams.questions){
                //     this.questionId =  this.allAnswer.questionId;
                //     this.questions =  this.allAnswer.questions;
                //     if(this.sessionParams.optiontype != 2){
                //         this.answer =  this.allAnswer.answerList[s];
                //     }else{
                //         this.checklist =  this.allAnswer.answerList[s];
                //     }
                // }else{
                //
                // }
                    this.loadQuestion();
            }
        },
        nextAnswer:function(){
            var type =this.sessionParams.type;

            this.upQuestion =true;
            if(type == 1){
                console.log(" 顺序练习下一题");
                if(localStorage.orderKey == 'undefind'){
                    var nextParams = JSON.stringify({questions:this.sessionParams.questions,questionId:this.questionId,answerList:this.answerList});
                    localStorage.setItem('orderKey',nextParams);
                }else{
                    var n = JSON.parse( localStorage.getItem('orderKey'));
                    n.answerList =this.answerList;
                    this.sessionParams.questions = n.questions + 1;
                    this.questionId = n.questionId +1;
                    var q= parseInt(this.sessionParams.questions);
                    if(n.answerList.length >=  this.sessionParams.questions){
                        if(this.sessionParams.optiontype != 2){
                            this.answer = n.answerList[q]
                        }else{
                            this.checklist = n.answerList[q]
                        }
                    }else{
                        //判断是否需要缓存答案
                        if(this.sessionParams.optiontype !=2){
                            this.answerList.push(this.answer);
                        }else{
                            this.answerList.push(this.checklist);
                        }
                    }
                }
            }
            else if(type == 2){
                console.log("专项练习下一题");
                this.sessionParams.questions =  this.sessionParams.questions + 1;
            }else if(type == 3){
                console.log("随机练习下一题");
                if(this.sessionParams.type == 3  && this.upQuestion){ //随机练习
                    var num = Math.random()* this.totalAnswer + 1;
                    this.sessionParams.questions = parseInt(num, 10);
                }
            }else{
                console.log("模拟考试下一题");

                if(this.mockSeq  < this.totalAnswer ){
                    this.sessionParams.questions = this.mockSeq + this.step;
                }else{
                    this.sessionParams.questions = Math.floor(this.mockSeq/this.totalAnswer);
                }
                this.mockSeq = this.sessionParams.questions;
                console.log("this.mockSeq",this.mockSeq);
                if(this.nextQuestionId >= 100){
                    if(this.answer != this.rightAnswer){
                        this.explainShow = true;
                    }else{
                        this.explainShow = false
                    }
                    this.$router.push({'path':'success','query':{score:this.score}});
                   // Cui.MessageBox('你的分数', this.score);
                    console.log('score===',this.score)
                }else{
                    if( (this.answer == this.rightAnswer
                        ||this.checklist.sort().join(",") == this.rightAnswer )){
                        this.score = this.score + 1;
                        console.log("_ts.score ==",this.score)
                    }
                }
            }

            //todo 判断是否有下一题

            if((this.sessionParams.questions + 1) >= this.totalAnswer && this.sessionParams.type !=4){
                Cui.Toast({
                    message: "已是最后一题",
                    position: 'bottom'
                });
            }else{

                if(this.answer == this.rightAnswer||this.checklist.sort().join(",") == this.rightAnswer || this.explainShow ){

                    // this.allAnswer= JSON.parse(sessionStorage.getItem('allAnswer'));
                    // var s =parseInt(this.sessionParams.questions);
                    // this.allAnswer.questionId =this.questionId;
                    // this.allAnswer.questions = this.questions;
                    // if(this.sessionParams.optiontype != 2){
                    //     this.allAnswer.answerList.push(this.answer)
                    //
                    // }else{
                    //     this.allAnswer.answerList.push(this.checklist);
                    // }
                    // JSON.setItem('allAnswer',JSON.stringify(this.allAnswer))
                    this.explainShow = false;
                    this.checklist =[];
                    this.answer ="";


                    this.loadQuestion();
                }else{
                    this.explainShow = true;
                }
            }
        },
        loadQuestion:function() {
            var _ts = this;

            var nativeRes =[
                parseInt(this.sessionParams.subject),
                {
                    'type': _ts.sessionParams.type,
                    'question':parseInt( _ts.sessionParams.questions),
                    'chapterDesc': _ts.sessionParams.chapterDesc,
                    'start': _ts.sessionParams.start
                }];
            console.log('nativeRes==', _ts.sessionParams.questions);

            //缓存上一题答案
            // var allAnswer =JSON.parse( sessionStorage.getItem('allAnswer')) ;
            // var s = allAnswer.questions;
            // console.log('aaaaa',allAnswer);
            // if(allAnswer.allAnswer.length >=  parseInt(this.sessionParams.questions)){
            //             _ts.questionId = allAnswer.questionId;
            //             _ts.questions = allAnswer.questions;
            //             if(_ts.sessionParams.optiontype != 2){
            //                 _ts.answer = allAnswer.answerList[s];
            //             }else{
            //                 _ts.checklist = allAnswer.answerList[s];
            //             }
            // }else{
            //             allAnswer.questionId =_ts.questionId;
            //             allAnswer.questions = _ts.questions;
            //             if(_ts.sessionParams.optiontype != 2){
            //                 allAnswer.answerList.push(_ts.answer)
            //
            //             }else{
            //                 allAnswer.answerList.push(_ts.checklist);
            //             }
            // }

             Ces.Plugins.nativeApi.questions(nativeRes,function (rets) {
                    _ts.list= rets.data;
                    console.log('rets===',rets);
                    if(rets.status == 1){
                        var options=[];
                        for(var i=0;i<_ts.list.answers.length;i++){
                            var item = {};
                            var j= i+1;
                            item.value = j.toString();
                            item.label=j+"、"+_ts.list.answers[i];
                            options.push(item);
                            _ts.list.options =options;
                        }
                        _ts.rightAnswer =  _ts.list.answer;


                        //todo 顺序练习 缓存题号
                        if(_ts.sessionParams.type == '1'){
                            var localParams = JSON.stringify({questions:_ts.sessionParams.questions,questionId:_ts.questionId,answerList:_ts.answerList});
                            localStorage.setItem('orderKey',localParams);
                            console.log('localParams==',localParams);
                        }

                        var un = JSON.parse( localStorage.getItem('orderKey'));
                        if(_ts.sessionParams.type == '1' && localStorage.orderKey != 'undefind'){
                            var q= parseInt(_ts.sessionParams.questions);
                            if(un.answerList.length >= q){
                                if(_ts.sessionParams.optiontype != 2){
                                    _ts.answer = un.answerList[q]
                                }else{
                                    _ts.checklist = un.answerList[q]
                                }
                            }
                        }

                        if(_ts.upQuestion){
                            _ts.nextQuestionId = _ts.questionId + 1;
                            _ts.questionId = _ts.questionId + 1;
                            _ts.upQuestion = false; //返回更改状态
                            console.log("下一题")
                        }else{
                            _ts.nextQuestionId = _ts.questionId - 1;
                            _ts.questionId = _ts.questionId - 1;
                            console.log("上一题")
                        }
                        console.log( _ts.nextQuestionId, _ts.questionId)

                    }else{

                        Cui.Toast({
                            message:rets.message,
                            position:'bottom'
                        })
                        //todo 操作失败 记录题号
                        //  var type =_ts.sessionParams.type;
                        // if(!_ts.upQuestion){
                        //     if(type == 1){
                        //         localStorage.getItem('orderKey') - 1;
                        //     }
                        //     if(type == 2) {
                        //         _ts.sessionParams.questions = _ts.sessionParams.questions - 1;
                        //     }
                        //     if(type == 4){
                        //
                        //         _ts.mockSeq  = _ts.mockSeq - _ts.step
                        //     }
                        // }else{
                        //     if(type == 1){
                        //         localStorage.getItem('orderKey') + 1;
                        //     }
                        //     if(type == 2){
                        //         _ts.sessionParams.questions =  _ts.sessionParams.questions + 1;
                        //     }
                        //     if(type == 4) {
                        //         _ts.mockSeq  = _ts.mockSeq + _ts.step
                        //     }
                        // }
                    }
                })
        }
    },
    activated: function(){
        var ths = this;

        ths.sessionParams =  JSON.parse(sessionStorage.getItem('topic'));

        sessionStorage.setItem("allAnswer",JSON.stringify({questionId:0,questions:0,allAnswerList:[]}));
        //模拟考试初始化步长


        var initNativeRes =[
            parseInt(ths.sessionParams.subject),
            {
                'type': ths.sessionParams.type,
                'question':parseInt( ths.sessionParams.questions),
                'chapterDesc': ths.sessionParams.chapterDesc,
                'start': ths.sessionParams.start
            }];
        if(ths.sessionParams.start){
            Ces.Plugins.nativeApi.questions(initNativeRes,function (res) {
                console.log(res);
                if(ths.sessionParams.start){
                    ths.questionId = 0;
                    ths.sessionParams.questions = 0;
                    ths.answer ='';
                    ths.checklist=[];
                    ths.score = 0;
                    this.explainShow = false;
                    ths.sessionParams.start = false;
                    if(! ths.sessionParams .chapterDesc){
                        ths.totalAnswer = res.data.length;
                    }else{
                        ths.totalAnswer =  ths.sessionParams.totalAnswer;
                    }

                    if(ths.sessionParams.type == 1){
                        var l = JSON.parse(localStorage.getItem('orderKey'));
                        ths.sessionParams.questions = l.questions;
                        ths.questionId = l.questionId;
                    }
                    if(ths.sessionParams.type == 4 ){
                        console.log("模拟考试");
                        ths.mockSeq = parseInt((Math.random()* (ths.totalAnswer / 4) + 1),10);
                        ths.seqStart =ths.mockSeq;
                        console.log('seqStart===',ths.seqStart);
                        ths.step = ths.totalAnswer / 40;
                        ths.mockSeq= ths.mockSeq + ths.step;

                        ths.sessionParams.questions = ths.mockSeq;
                    }

                    ths.loadQuestion();
                }
            })
        }
    }
};