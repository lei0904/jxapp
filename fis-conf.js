var meta = require('./package.json');
//设置发布服务地址，实际开发配置receiver地址为后台资源服务地址
fis.config.set('modules.deploy', ['default', 'zip', 'package'])
fis.config.set('settings.deploy.zip', {
    publish : [{
        from : '/',
        to: '/',
        include : ["/public/**"],
        file: './output/www.zip',
        "server": {
            "receiver": "http://127.0.0.1:8888/api/upload",
            "data": {
                "appId":123

            }
        }
    }]
});


/**
 * 设置package配置信息，配置信息需要登录云打包平台新建项目获取
 * receiver:云服务地址
 * package:包名
 * sdk:sdk版本
 */
fis.config.set('settings.deploy.package', {
    package : [{
        useResource : true,
        from : '/',
        to: '/',
        include : ["/public/**","package.json","icon.png","splash_bg.png"],
        file: './output/www.zip',
        "server": {
            "receiver": "http://192.168.3.8:8888/api/package/index",
            "data": {
                "package":"",
                "sdk":""
            }
        }
    }]
});
//设置生态组件服务地址
fis.config.set('repo',{
    remote_protocol:'gitlab',
    remote_url:'http://180.168.156.212:2006/'
})

//配置内置handlebars模板支持
fis.config.set('modules.parser.handlebars', 'handlebars-4.x');
fis.config.set('project.fileType.text', 'handlebars');
fis.config.set('roadmap.ext.handlebars', 'js');

fis.config.set('name', meta.name);
fis.config.set('version', meta.version);
fis.config.set('project.exclude', 'node_modules/**');
fis.config.set('framework', {
    cache: false,
    urlPattern: '/c/%s',
    comboPattern: '/co??%s'
});