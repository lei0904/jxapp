var Ces = require('ces');
var Cui = require('cui');

var openLink = function (link) {
    if (Ces.Config.plugin) { //启动插件
        if (link.startsWith('http')){
            windows.location.href = link;
        }
        this.$router.push({ path: link });
    } else {
        if (link.startsWith('http')){
            windows.location.href = link;
        }
        this.$router.push({ path: link });
    }
};

var openAttachment = function (att_type, att) {
    console.log(arguments)
    if (Ces.Config.plugin) { //启动插件
        if (att_type === 1) { //视频

        } else if (att_type === 2) { //PDF

        }
    } else {
        var url = this.$api.getBasePath() + 'api/attachment?path=' + att;
        window.open(url);
    }
};

function addClass(obj, cls) {
    //获取 class 内容.
    var obj_class = obj.className;
    console.log(obj_class);
    //判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    var blank = (obj_class !== '') ? ' ' : '';
    //组合原来的 class 和需要添加的 class. 替换原来的 class.
    obj.className = obj_class + blank + cls;
}

function removeClass(obj, cls) {
    //获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
    var obj_class = ' ' + obj.className + ' ';
    //将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
    obj_class = obj_class.replace(/(\s+)/gi, ' ');
    //在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    var removed = obj_class.replace(' ' + cls + ' ', ' ');
    //去掉首尾空格. ex) 'bcd ' -> 'bcd'
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');
    obj.className = removed;//替换原来的 class.
}

function hasClass(obj, cls) {
    //获取 class 内容.
    var obj_class = obj.className;
    //通过split空字符将cls转换成数组.
    var obj_class_lst = obj_class.split(/\s+|_/);
    console.log(obj_class_lst);
    for (var x in obj_class_lst) {
        //循环数组, 判断是否包含cls
        if (obj_class_lst[x] === cls) {
            return true;
        }
    }
    return false;
}

var Helper = {
    toast: function (msg) {
        Cui.Toast({
            message: msg,
            position: 'bottom'
        });
    },

    contains: function (arr, e) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] === e) {
                return true;
            }
        }
        return false;
    },

    remove: function (arr, e) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] === e) {
                arr.splice(i, 1);
                return;
            }
        }
    },

    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,

    openLink: openLink,
    openAttachment: openAttachment,
    banner: function (b) {
        if (b) {
            var type = b.type;
            if (type === 1) { //连接
                Helper.openLink.call(this, b['target']);
            } else if (type === 2) { //附件
                Helper.openAttachment.call(this, b['attachment_type'], b['attachment_path']);
            } else if (type === 3) {

            }
        }
    }
};

module.exports = Helper;