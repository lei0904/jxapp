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
            questionId:1,  //序列号
            totalAnswer:0,
            chapterDesc:'', //专项训练
            sessionParams:{}, //缓存
            score:0,
            upQuestionId:0,
            upQuestion:false
        }
    },
    methods: {
        upAnswer:function(){
            var _ths =this;
            _ths.upQuestion=true; //右滑
            _ths.checklist=[];
            _ths.answer="";
            if( _ths.sessionParams.questions > 1){
                _ths.sessionParams.questions =  _ths.sessionParams.questions - 1;
                _ths.loadQuestion();
            }else{
                Cui.Toast({
                    message:"当前已是第一题",
                    position:'bottom'
                })
            }

        },
        nextAnswer:function(){
            var _ths =this;
            _ths.upQuestion=false; //左滑
            _ths.sessionParams.start=false;

            if(_ths.sessionParams.type == 3  && !_ths.upQuestion){ //随机练习
                var num = Math.random()* _ths.totalAnswer + 1;
                _ths.sessionParams.questions = parseInt(num, 10);
            }

            //模拟试题计分
            if(_ths.sessionParams.type == 4  && !_ths.upQuestion){
                if(_ths.questionId > 100){
                    if(_ths.answer != _ths.rightAnswer){
                        _ths.explainShow = true;
                    }else{
                        _ths.explainShow = false
                    }
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

           var nextParams = [
                        parseInt(_ths.sessionParams.subject),
                            {
                                'type':_ths.sessionParams.type,
                                'question':parseInt(_ths.sessionParams.questions),
                                'chapterDesc':_ths.sessionParams.chapterDesc,
                                'start':_ths.sessionParams.start
                            }
                        ];
                if((_ths.sessionParams.questions + 1) >= _ths.totalAnswer){

                    Cui.Toast({
                        message: "已是最后一题",
                        position: 'bottom'
                    });

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
            _ts.upQuestionId =  _ts.sessionParams.questions;
            console.log("_ts.upQuestionId===",_ts.upQuestionId);

            //模拟考试
            if(_ts.sessionParams.type == 4  && !_ts.upQuestion){
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

            //随机练习
            if(_ts.sessionParams.type == 3 &&  !_ts.upQuestion){
                var num = Math.random()* _ts.totalAnswer + 1;
                _ts.sessionParams.questions  = parseInt(num, 10);
            }

            var nativeRes =[parseInt(_ts.sessionParams.subject),{'type': _ts.sessionParams.type,'question':parseInt( _ts.sessionParams.questions),'chapterDesc': _ts.sessionParams.chapterDesc,'start': _ts.sessionParams.start}];

            console.log('nativeRes==',nativeRes);
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

                    //序号+1
                    if(_ts.sessionParams.questions  > 0 &&  !_ts.upQuestion){
                        console.log()
                        _ts.questionId = _ts.questionId + 1;
                        console.log('down===questions',_ts.sessionParams.questions);
                        console.log('down===questionId',_ts.questionId);
                    }
                    //序号-1
                    if(_ts.sessionParams.questions > 0 &&  _ts.upQuestion){
                        _ts.questionId = _ts.questionId - 1;
                    }

                    if(!_ts.upQuestion){
                        _ts.sessionParams.questions = _ts.sessionParams.questions + 1;
                    }
                }else{
                    Cui.Toast({
                        message:rets.message,
                        position:'bottom'
                    })
                }
            })
        }
    },
    activated: function(){
        var _ts =this;
        _ts.sessionParams =JSON.parse(sessionStorage.getItem('topic'));
        _ts.sessionParams.questions =0;

        var nativeRes = [parseInt( _ts.sessionParams.subject),
                        {'type':_ts.sessionParams.type,
                         'question':parseInt( _ts.sessionParams.questions),
                         'chapterDesc':_ts.sessionParams.chapterDesc,
                         'start':_ts.sessionParams.start}];
        _ts.explainShow = false;
        _ts.chapterDesc = _ts.sessionParams.chapterDesc;

        Ces.Plugins.nativeApi.questions(nativeRes,function(rets){
            if(rets.status == 1){
                if(_ts.sessionParams.start){
                    _ts.questionId = 1;
                    _ts.answer ='';
                    _ts.checklist=[];
                    _ts.sessionParams.start = false;
                    _ts.sessionParams.questions = 0;
                    _ts.score = 0;

                    if(! _ts.sessionParams .chapterDesc){
                        _ts.totalAnswer = rets.data.length;
                    }else{
                        _ts.totalAnswer =  _ts.sessionParams.totalAnswer;
                    }
                    _ts.loadQuestion();
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