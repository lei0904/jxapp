module.exports = {
    create: function () {
        var xhr;
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xhr=new XMLHttpRequest();
        } else { // code for IE6, IE5
            xhr=new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhr;
    }
};