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
            nextQuestionId:1,
            totalAnswer:0,
            showNext:true,//是否显示下一题
            chapterDesc:'', //专项训练
            sessionParams:{}, //缓存
            score:0
        }
    },
    methods: {
        nextAnswer:function(){
            var _ths =this;
            _ths.sessionParams.questions = _ths.nextQuestionId;
            _ths.sessionParams.start=false;

            if(_ths.sessionParams.type == 3){ //随机练习
                var num = Math.random()* _ths.totalAnswer + 1;
                _ths.nextQuestionId = parseInt(num, 10);
                _ths.showNext=true
            }

            //模拟试题计分
            if(_ths.sessionParams.type == 4){
                if(_ths.questionId > 100){
                    if(_ths.answer != _ths.rightAnswer){
                        _ths.explainShow = true;
                    }else{
                        _ths.explainShow = false
                    }
                    _ths.showNext =false;
                    Cui.MessageBox('你的分数', _ths.score);
                    console.log('score===',_ths.score)
                }else{
                    if( (_ths.answer == _ths.rightAnswer
                        ||_ths.checklist.sort().join(",") == _ths.rightAnswer )
                        && _ths.sessionParams.type == 4){
                        _ths.score = _ths.score + 1;
                        console.log("_ts.score ==",_ths.score)
                    }
                }
            }


           var nextParams = [parseInt(_ths.sessionParams.subject),{'type':_ths.sessionParams.type,'question':parseInt(_ths.sessionParams.questions),'chapterDesc':_ths.sessionParams.chapterDesc,'start':_ths.sessionParams.start}];
                if(_ths.nextQuestionId >= _ths.totalAnswer){
                    Cui.Toast({
                        message: "已是最后一题",
                        position: 'bottom'
                    });
                    _ths.showNext =false;
                }else{
                    if(_ths.answer == _ths.rightAnswer||_ths.checklist.sort().join(",") == _ths.rightAnswer || _ths.explainShow ){
                        _ths.loadQuestion(nextParams);
                        _ths.explainShow = false;
                            _ths.checklist =[];
                            _ths.answer ="";
                    }else{
                        _ths.explainShow = true;
                    }
                }

        },
        loadQuestion:function(){
            var _ts =this;
            if(_ts.sessionParams.type == 4){
                console.log("模拟考试");
                var seqStart = parseInt((Math.random()* (_ts.totalAnswer / 4) + 1),10);
                console.log('seqStart===',seqStart);

                _ts.step = _ts.totalAnswer / 40;
                var nextMockId = seqStart + _ts.step;
                if(nextMockId < _ts.totalAnswer ){
                    _ts.sessionParams.questions = nextMockId;
                }else{
                    _ts.sessionParams.questions = Math.floor(nextMockId/_ts.totalAnswer);
                }
            }
            if(_ts.sessionParams.type == 3){ //随机练习
                var num = Math.random()* _ts.totalAnswer + 1;
                _ts.sessionParams.questions  = parseInt(num, 10);
                _ts.showNext=true
            }
            var nativeRes =[parseInt(_ts.sessionParams.subject),{'type': _ts.sessionParams.type,'question':parseInt( _ts.sessionParams.questions),'chapterDesc': _ts.sessionParams.chapterDesc,'start': _ts.sessionParams.start}];

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
                    _ts.questionId = _ts.questionId + 1;
                    _ts.nextQuestionId= _ts.nextQuestionId + 1;



                }else{
                    Cui.Toast({
                        message:rets.message,
                        position:'bottom'
                    })
                }
            })
        }
    },
    watch:{
        answer:function(o,n){
            this.$nextTick(function() {
                window.scrollTo(0, 1);
                window.scrollTo(0, 0)
            })
        },
        checklist:function(o,n){
            this.$nextTick(function() {
                window.scrollTo(0, 1);
                window.scrollTo(0, 0);
            })
        }
    },
    mounted(){
    },
    activated(){
        var _ts =this;
        _ts.sessionParams =JSON.parse(sessionStorage.getItem('topic'));
        if( _ts.sessionParams.chapterDesc){
            _ts.nextQuestionId = 1;
        }
        _ts.sessionParams.questions =0;

        var nativeRes = [parseInt( _ts.sessionParams.subject),{'type':_ts.sessionParams.type,'question':parseInt( _ts.sessionParams.questions),'chapterDesc':_ts.sessionParams.chapterDesc,'start':_ts.sessionParams.start}];
        _ts.explainShow = false;
        _ts.chapterDesc = _ts.sessionParams.chapterDesc;

        Ces.Plugins.nativeApi.questions(nativeRes,function(rets){
            if(rets.status == 1){
                if(_ts.sessionParams.start){
                    _ts.showNext= true;
                    _ts.nextQuestionId = 1;
                    _ts.questionId = 0;
                    _ts.answer ='';
                    _ts.checklist=[];
                    _ts.sessionParams .start = false;
                    _ts.sessionParams .questions = 0;
                    _ts.score = 0;

                    if(! _ts.sessionParams .chapterDesc){
                        _ts.totalAnswer = rets.data.length;
                    }else{
                        _ts.totalAnswer =  _ts.sessionParams.totalAnswer;
                    }
                    // if( _ts.sessionParams.type == 3){
                    //     var num = Math.random()* _ts.totalAnswer + 1;
                    //     _ts.nextQuestionId = parseInt(num, 10);
                    // }
                 //   nativeRes =[parseInt( _ts.sessionParams.subject),{'type':_ts.sessionParams.type,'question':parseInt( _ts.sessionParams.questions),'chapterDesc':_ts.sessionParams.chapterDesc,'start':_ts.sessionParams.start}];
                   // console.log("_ts.nativeRes==",nativeRes);
                    _ts.loadQuestion();
                }else{
                    _ts.list= rets.data;
                    var options=[];
                    for(var i=0;i<_ts.list.answers.length;i++){
                        var item = {};
                        var j= i+1;
                        item.value = j.toString();
                        item.label=j+"、"+_ts.list.answers[i];
                        options.push(item)
                    }
                    _ts.list.options =options;
                    _ts.rightAnswer = _ts.list.answer;
                    _ts.nextQuestionId= _ts.nextQuestionId + 1;
                }
            }else{
                Cui.Toast({
                    message:rets.message,
                    position:'bottom'
                })
            }

        })
    }
};