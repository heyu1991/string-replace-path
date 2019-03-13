const path = require("path");

module.exports = function(resource){
    const scope  = this;
    //获取配置参数
    const { options } = scope.loaders[scope.loaderIndex];
    //处理相对路径
    const relativePath = (target) => path.relative(scope.context,target).split('\\').join('/'); 
    //源文件替换
    const pipe = function(name,target,relative = false){
        resource = relative 
        ? resource.replace(new RegExp(`${name}\\/([\\w\\/\\._]+)+\\b`,'g'),`${relativePath(target)}/$1`)
        : resource.replace(new RegExp(`${name}\\b`,'g'),`${target}`);
    };
    if(options === undefined){

    }else if(options instanceof Array){
        options.map(params=>pipe(...params));
    }else{
        pipe(options.name,options.target,options.relative);
    };
    return resource;
}