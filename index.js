const path = require("path");
const os = require('os');
const crypto = require('crypto');

// 根据环境不同修改url分隔符
const reviseUrl = (url,sep) => {sep = sep || path.sep ; return url.split(sep == '/' ? '\\' : '/').join(sep)};

module.exports = function(resource){
    const scope  = this;
    // 获取配置文件
    const webpackConfig = scope._compilation.options;
    // 获取根目录
    const root = reviseUrl(path.resolve('.'));
    // 获取Loader配置参数 @target 输出路径 @rule<{name:替换名称,path:索引路径}>
    const { target , rule } = scope.loaders[scope.loaderIndex].options;

    const handle = (n,p) => {
        resource = resource.replace(new RegExp(`${n}([\\w\\/\\._]+)?\\b`,'g'),(full,sep)=>{
            const source = p ? path.join(root,p,sep) : path.join(scope.context,sep);
            const output = path.join(webpackConfig.output.path,target,sep);
            return reviseUrl(path.join(webpackConfig.output.publicPath||'/',target,sep),'/');
        });
    };
    
    // 处理条件
    if(rule === undefined){

    }else if(rule instanceof Array){
        rule.map( r =>handle(r.name,r.path));
    }else{
        handle(rule.name,rule.path);
    };

    return resource;
}