'use strict';

require.config(__FRAMEWORK_CONFIG__);

require.async(['vue', 'ces', 'cui',
    'api'], function (Vue, Ces, Cui, Api) {


    var _app = {
        init: function (data) {
            var List = ["注册", "注册", "证件信息"];

            var regPhone = /^1(3|4|5|7|8)\d{9}$/;
            var codeReg = /^\d{4}$/;
            var nameReg = /[\u4E00-\u9FA5]{2,4}/;
            var idCardReg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            var eMailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;

            var vm = new Vue({
                el: '#app',
                data: function () {
                    return {
                        full: false,
                        backable: true,
                        savable: false,
                        searchable: false,
                        animate: 'left-fade',
                        title: List[0],
                        cur_step: 0,
                        disabled: false,
                        disableClass: '',
                        second: 10,
                        btnText: '获取验证码',
                        actions:[],
                        user: {
                            loginName: '',
                            identityId: ''
                        },
                        special_code: '',
                        type: '',
                        invite_code:'',
                        verify_code:'',
                        id_pic_front: '',
                        id_pic_back: '',
                        id_pic_front_src: '',
                        id_pic_back_src: '',
                        id_pic_front_upload: '',
                        id_pic_back_upload: '',
                        nowSelect:''
                    };
                },
                methods: {
                    gonext: function () {
                        this.cur_step = this.cur_step + 1;
                        this.title = List[this.cur_step];
                    },
                    back: function () {
                        if (this.cur_step == "0") {
                            window.location.href = '../login/index.html';
                        } else {
                            this.cur_step = this.cur_step - 1;
                            this.title = List[this.cur_step]
                        }

                    },
                    run: function () {
                        var $this = this;
                        this.time = this.second;
                        $this.disabled = true;
                        $this.btnText = '重新发送' + '(' + $this.time + 's)';
                        $this.disableClass = "disableClass";
                        $this.time -- ;
                        var i = setInterval(function () {
                            if ($this.time > 0) {
                                $this.btnText = '重新发送' + '(' + $this.time + 's)';
                                $this.disableClass = "disableClass";
                                $this.time--;
                            } else {
                                $this.btnText = '获取验证码';
                                $this.disabled = false;
                                $this.disableClass = "";
                                clearInterval(i);
                                $this.second = 10;
                            }
                        }, 1000);
                    },
                    open: function (picker) {
                        this.$refs.picker1.open();
                    },
                    openAttr: function (picker) {
                        this.$refs.picker2.open();
                    },
                    handleChange: function (province, city) {
                        if (province == city){
                            this.user.address = province ;
                        }else{
                            this.user.address = province + '  -  ' + city;
                        }
                    },
                    attrChange: function (attr, attrCode) {
                        if (attr == "家属") {
                            this.showBindInput = true;
                        } else {
                            this.showBindInput = false;
                        }
                        this.userAttr = attr;
                        this.type = attrCode;
                    },
                    sendSms: function () {
                        var $this = this;
                        if (!$this.user.loginName) {
                            Cui.Toast({
                                message: '请输入手机号码',
                                position: 'bottom'
                            });
                        }else if(!regPhone.test($this.user.loginName)){
                            Cui.Toast({
                                message: '请输入正确的手机号码',
                                position: 'bottom'
                            });
                        } else {
                            // Api.get(Api.sms + $this.user.loginName, {}, function (rets) {
                            //     console.log(rets);
                            //     if (rets.status == 'OK') {
                            //         Cui.Toast({
                            //             message: '验证码发送成功',
                            //             position: 'bottom'
                            //         });
                            //         $this.run();
                            //     } else {
                            //         Cui.Toast({
                            //             message: '验证码发送失败',
                            //             position: 'bottom'
                            //         });
                            //     }
                            // })
                        }
                    },
                    checkExist: function () {
                        var phone = this.user.loginName;
                        if(regPhone.test(phone)){
                            Api.get(Api.exist + vm.user.loginName, {}, function (rets) {
                                if (rets.status != 'OK') {
                                    Cui.Toast({
                                        message: '该账号已存在，请直接登录',
                                        position: 'bottom'
                                    });
                                }
                            })
                        }
                    },
                    checkSms: function () {
                        var _this = this;
                        Api.post(Api.sms_check + this.user.loginName + "-" + this.verify_code, {}, function (rets) {
                            if (rets.status == 'OK') {
                                _this.gonext();
                            } else {
                                Cui.Toast({
                                    message: '验证码错误',
                                    position: 'bottom'
                                });
                            }
                        });
                    },
                    goStep1: function () {
                        if (!this.user.loginName) {
                            Cui.Toast({
                                message: '请输入手机号码',
                                position: 'bottom'
                            });
                            return;
                        }
                        if (!(regPhone.test(this.user.loginName))) {
                            Cui.Toast({
                                message: '请输入正确的手机号码',
                                position: 'bottom'
                            });
                            return;
                        }
                        if (!this.type) {
                            Cui.Toast({
                                message: '请选择用户类型',
                                position: 'bottom'
                            });
                            return;
                        }
                        if (!this.verify_code) {
                            Cui.Toast({
                                message: '请输入验证码',
                                position: 'bottom'
                            });
                            return;
                        }
                        if (!(codeReg.test(this.verify_code))) {
                            Cui.Toast({
                                message: '验证码为4位数字',
                                position: 'bottom'
                            });
                            return;
                        }
                        this.checkSms();



                    },
                    goStep2: function () {
                        if (!this.user.name){
                            Cui.Toast({
                                message: '请输入姓名',
                                position: 'bottom'
                            });
                            return;
                        }
                        if (!(nameReg.test(this.user.name))){
                            Cui.Toast({
                                message: '请输入正确的中文姓名',
                                position: 'bottom'
                            });
                            return;
                        }
                        if (!this.user.gender){
                            Cui.Toast({
                                message: '请选择性别',
                                position: 'bottom'
                            });
                            return;
                        }
                        if (this.user.address == '请选择您的地址'){
                            Cui.Toast({
                                message: '请选择地址',
                                position: 'bottom'
                            });
                            return;
                        }
                        if (!this.user.identityId){
                            Cui.Toast({
                                message: '请输入身份证号',
                                position: 'bottom'
                            });
                            return;
                        }
                        if (!(idCardReg.test(this.user.identityId))){
                            Cui.Toast({
                                message: '请输入正确的身份证号',
                                position: 'bottom'
                            });
                            return;
                        }
                        if (!this.user.email){
                            Cui.Toast({
                                message: '请输入邮箱',
                                position: 'bottom'
                            });
                            return;
                        }
                        if (!(eMailReg.test(this.user.email))){
                            Cui.Toast({
                                message: '请输入正确的邮箱',
                                position: 'bottom'
                            });
                            return;
                        }
                        this.gonext()
                    },
                    goStep3: function () {
                        if(this.id_pic_front_upload != 'ok'){
                            Cui.Toast({
                                message: '请上传身份证正面',
                                position: 'bottom'
                            });
                            return;
                        }
                        if(this.id_pic_back_upload != 'ok'){
                            Cui.Toast({
                                message: '请上传身份证反面',
                                position: 'bottom'
                            });
                            return;
                        }
                        this.registerComplete();
                    },
                    toParaObject: function (obj) {
                        var r = {};
                        for (var key in obj) {
                            if (typeof obj[key] == "object") {
                                for (var k in obj[key]) {
                                    r[key + "." + k] = obj[key][k];
                                }
                            } else {
                                r[key] = obj[key];
                            }
                        }
                        return r;
                    },
                    registerComplete: function () {
                        var _this = this;
                        // Api.post(Api.register,
                        //     this.toParaObject({
                        //         user: vm.user,
                        //         type: vm.type,
                        //         verify_code: vm.verify_code,
                        //         special_code: vm.special_code,
                        //         id_pic_front: _this.id_pic_front,
                        //         id_pic_back: _this.id_pic_back
                        //
                        //     }), function (rets) {
                        //         if (rets.status == 'OK') {
                        //             if (_this.type == 'sg-help-family'){
                        //                 Cui.MessageBox.alert('注册信息已提交，请等待审核通过后登录！ 初始密码000000', {
                        //                     callback: function () {
                        //                         Ces.Page.load("/login/index.html")
                        //                     }
                        //                 });
                        //             }else{
                        //                 Cui.MessageBox.alert('您已注册完成 请完善个人资料 初始密码000000', {
                        //                     callback: function () {
                        //                         ///todo直接登录
                        //                         Api.post(Api.login,
                        //                             {
                        //                                 account: _this.user.loginName,
                        //                                 password: '000000',
                        //                                 push_id: data['push_id'],
                        //                                 type: _this.type
                        //                             }
                        //                             , function (rets) {
                        //                                 if (rets.status != 'OK') {
                        //                                     Cui.Toast({
                        //                                         message: rets.message,
                        //                                         position: 'bottom'
                        //                                     });
                        //                                 } else {
                        //                                     Ces.JSBridge.callHandler('setLoginData', [0, rets.data], function (d) {
                        //                                         if (d['status'] == 1) {
                        //                                             Ces.Page.open('/index/index.html');
                        //                                         } else {
                        //                                             Cui.MessageBox.alert('系统异常，登录失败');
                        //                                         }
                        //                                     });
                        //                                 }
                        //                             })
                        //                     }
                        //                 });
                        //             }
                        //         } else {
                        //             Cui.MessageBox.alert('注册失败');
                        //         }
                        //     })
                    },
                    take_id_pic: function () {
                        var _this = this;
                        var type = _this.nowSelect;
                        // Ces.Plugins.Camera.take(function (rets) {
                        //             console.log(rets);
                        //             if (rets.status == 1) {
                        //                 _this[type + '_src'] = 'data:image/png;base64,' + rets.data.thumbnail;
                        //                 _this[type + "_name"] = rets.data.original;
                        //             } else {
                        //                 Cui.Toast({
                        //                     message: rets.message,
                        //                     position: 'bottom'
                        //                 });
                        //             }
                        //
                        // })
                    },
                    select_id_pic:function () {
                        var _this = this;
                        var type = _this.nowSelect;

                        Ces.JSBridge.callHandler('selectphoto', [] ,function (rets) {
                            console.log(rets);
                            if (rets.status == 1) {
                                _this[type + '_src'] = 'data:image/png;base64,' + rets.data.thumbnail;
                                _this[type + "_name"] = rets.data.original;
                            } else {
                                Cui.Toast({
                                    message: rets.message,
                                    position: 'bottom'
                                });
                            }
                        });
                    },
                    upLoad_id_pic: function (type) {
                        var _this = this;

                        if (Ces.Config.debug) {

                        } else {
                            Cui.Indicator.open('上传中...');
                            var Http = Ces.Plugins.Http;
                            var file = new Http.FilePart('attachment', _this[type+"_name"]);
                            var http = Http.post(Api.basePath + Api.upload);
                            http.addPart(file).addPart(new Http.NormalPart('businessType', 'id_card_image')).send(function (rets) {
                                console.log(rets);
                                Cui.Indicator.close();
                                if (rets.status != 1) {
                                    Cui.Toast({
                                        message: '上传照片失败',
                                        position: 'bottom'
                                    });
                                    return;
                                }

                                var data = rets.data;
                                if (data.status != 'OK') {
                                    Cui.Toast({
                                        message: '上传照片失败',
                                        position: 'bottom'
                                    });
                                    return;
                                }
                                Cui.Toast({
                                    message: '上传照片成功',
                                    position: 'bottom'
                                });

                                if (type == 'id_pic_back') {
                                    _this.id_pic_back = data.data.id;
                                    _this.id_pic_back_upload = 'ok';
                                } else if (type == 'id_pic_front') {
                                    _this.id_pic_front = data.data.id;
                                    _this.id_pic_front_upload = 'ok';
                                }

                            });
                        }
                    },
                    select_method:function (type) {
                        this.nowSelect = type;
                        this.$refs.imgSelect.currentValue = true;

                    }
                },
                mounted:function () {
                    this.actions = [
                        {
                            name: '拍照',
                            method: this.take_id_pic
                        },
                        {
                            name:'从相册选择',
                            method:this.select_id_pic
                        }
                    ]
                }
            });
        }
    };

    Ces.ready(function (data) {
        _app.init(data);
    });
})
;

