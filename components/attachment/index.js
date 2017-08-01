var Ces = require('ces');
var Cui = require('cui');
var Ajax = require('./ajax.js');

var Utils = {
    input: 'attachment-file-input',
    form: 'attachment-file-form',


    Image: {
        submit: function (auth_code, LoginData) {
            var form = document.getElementById(Utils.form);

            if (Ces.Config.plugin) { //通过原生插件进去文件的上传

            } else if (window.FormData) { //通过 web js 进行文件上传
                var ajax = Ajax.create();
                var formData = new FormData(form);
                formData.append( "auth_code", auth_code );
                ajax.open( "POST", form.getAttribute("action") , true );
                ajax.onreadystatechange = function(){
                    if(ajax.readyState===4){
                        if(ajax.status===200){
                            var rets = JSON.parse(ajax.responseText);
                            if (rets.status === 'OK') {
                                var data = LoginData.get();
                                data['account']['avatar'] = rets.data.path;
                                LoginData.set(data);
                                Cui.Toast({
                                    message: '上传成功',
                                    position: 'bottom'
                                });
                            } else {
                                Cui.MessageBox.alert('上传失败');
                            }
                        } else {
                            Cui.MessageBox.alert('上传失败');
                        }
                    }
                };
                ajax.send(formData);
            } else { //通过 iframe 方式提交
                var upload_callback = document.getElementById('upload_callback');
                if (!upload_callback) {
                    var iframe = document.createElement('iframe');
                    iframe.setAttribute("name", "upload_callback");
                    iframe.setAttribute("id", "upload_callback");
                    // iframe.setAttribute("src", window.location.href);
                    document.body.appendChild(iframe);
                    form.setAttribute("target", "upload_callback");


                    var callback_link = window.location.href;
                    if (callback_link.indexOf('?') > -1) {
                        callback_link = callback_link.substring(0, callback_link.indexOf('?'));
                    }

                    var callback_link_input = document.createElement('input');
                    callback_link_input.setAttribute('name', 'callback_link');
                    callback_link_input.setAttribute('value', callback_link);
                    form.appendChild(callback_link_input);

                    var type_input = document.createElement('input');
                    type_input.setAttribute('name', 'type');
                    type_input.setAttribute('value', 'iframe');
                    form.appendChild(type_input);

                    var auth_code_input = document.createElement('input');
                    auth_code_input.setAttribute('name', 'auth_code');
                    auth_code_input.setAttribute('value', auth_code);
                    form.appendChild(auth_code_input);
                }

                form.submit();

                var timeout = 20;
                var i = setInterval(function () {
                    if (timeout === 0) {
                        Cui.MessageBox.alert('上传失败');
                        clearInterval(i);
                    } else {
                        var content = window.frames["upload_callback"];//.document.body.innerHTML;
                        var href = content.location.href;
                        if (href.indexOf('?') > -1) {
                            var qs = href.substring(href.indexOf('?') + 1);
                            qs = decodeURIComponent(qs);
                            var arr = qs.split("&");
                            var obj = {};
                            arr.forEach(function (t) {
                                var p = t.split("=");
                                obj[p[0]] = p[1];
                            });
                            if(obj.id && obj.path) {
                                clearInterval(i);

                                var data = LoginData.get();
                                data['account']['avatar'] = obj.path;
                                LoginData.set(data);

                                Cui.Toast({
                                    message: '上传成功',
                                    position: 'bottom'
                                });
                            }
                        }
                        timeout--;
                    }
                }, 1000);
            }
        },

        preview: function (preview) {
            if (Ces.Config.plugin) { //通过原生插件生成 base64 进行预览

            } else {
                var input = document.getElementById(Utils.input);
                var value = input.value;
                if (value) {
                    var pic = document.getElementById(preview);

                    var isIE = navigator.userAgent.match(/MSIE/) !== null;
                    var isIE6 = navigator.userAgent.match(/MSIE 6.0/) !== null;
                    if (isIE) {
                        input.select();
                        var realLocalPath = document.selection.createRange().text;

                        // IE6浏览器设置img的src为本地路径可以直接显示图片
                        if (isIE6) {
                            pic.src = realLocalPath;
                        } else {
                            // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
                            pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
                            // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
                            pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
                        }
                    } else {
                        var data = input.files[0];
                        var reader = new FileReader();
                        reader.readAsDataURL(data);
                        reader.onload = function (e) {
                            pic.src = this.result;
                        };
                    }
                }
            }
        },


        select: function (preview) {
            if (Ces.Config.plugin) { //采用插件方式，调用原生方法，打开文件选择器，选择图片
                Ces.JSBridge.callHandler('selectphoto', [] ,function (rets) {
                    if (rets.status === 1) {
                        console.log(rets);
                        // _this.uploadAvatar(rets.data.original);
                    } else {
                        Cui.Toast({
                            message: rets.message,
                            position: 'bottom'
                        });
                    }
                });
            } else {
                document.getElementById('attachment-file-input').click();
            }
        },
        take: function () {
            if (Ces.Config.plugin) { //采用插件方式，调用原生方法，拍摄图片
            } else {
                Cui.MessageBox.alert("此功能暂不支持");
                //document.getElementById('attachment-file-input').click();
            }
        }
    },



    check: function (type) {
        var value = document.getElementById(Utils.input).value;
        if (!value) {
            return false;
        }

        var ext = value.substring(value.lastIndexOf(".") + 1).toLowerCase();

        if (type === 'image') {
            if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
                Cui.MessageBox.alert("图片的格式必须为png或者jpg或者jpeg格式！");
                return false;
            }
        } else if (type === 'video') {
            //TODO
            return false;
        } else {
            Cui.MessageBox.alert('配置错误，无法选择图片或视频')
            return false;
        }

        return true;
    },
    preview: function (type, preview) {
        if (type === 'image') {
            Utils.Image.preview(preview);
        } else if(type === 'video') {

            return false;
        } else {
            Cui.MessageBox.alert('配置错误，无法选择图片或视频')
            return false;
        }
        return true;
    },

    submit: function (type, auth_code, LoginData) {
        if (type === 'image') {
            Utils.Image.submit(auth_code, LoginData);
        } else if (type === 'video') {
            // Utils.Video.select(preview);
        } else {
            Cui.MessageBox.alert('配置错误，无法选择图片或视频')
        }
    },

    select: function (type, preview) {
        if (type === 'image') {
            Utils.Image.select(preview);
        } else if (type === 'video') {
            // Utils.Video.select(preview);
        } else {
            Cui.MessageBox.alert('配置错误，无法选择图片或视频')
        }
    },
    take: function (type, preview) {
        if (type === 'image') {
            Utils.Image.take(preview);
        } else if (type === 'video') {
            // Utils.Video.select(preview);
        } else {
            Cui.MessageBox.alert('配置错误，无法选择图片或视频')
        }
    }
};

module.exports = {
    name: 'attachment-upload',

    template: __inline('index.ftl'),

    props: {
        type: {
            type: String,
            default: 'image' // image | video
        },
        url: {
            type: String,
            required: true
        },
        business: {
            type: String,
            required: true
        },
        preview: {
            type: String
        }
    },

    methods: {
        select: function () {
            Utils.select(this.type);
        },
        take: function () {
            Utils.take(this.type, this.preview);
        },
        attachmentFileInputChange: function () {
            var LoginData = this.$api.LoginData;
            var data = LoginData.get();
            if(!data) {
                Cui.MessageBox.alert("您还没有登录。");
                return;
            }

            if (Utils.check(this.type)) {
                if (this.preview) {
                    if(Utils.preview(this.type, this.preview)) {
                        Utils.submit(this.type, data['auth_code'], LoginData);
                    }
                } else {
                    Utils.submit();
                }
            }
        }
    }
};