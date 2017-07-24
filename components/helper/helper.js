var Ces = require('ces');

var openLink = function (link) {
    if (Ces.Config.plugin) { //启动插件

    } else {
        window.open(link);
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

var Helper = {
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