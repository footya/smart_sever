var fs = require("fs");
var path = require("path");

/**test
 * 排除basename以.或者_开头的目录|文件(如.svn,_html,_psd, _a.psd等)
 */
function defaultFilter(uri){
    var start = path.basename(uri).charAt(0);
    if(start === '.' || start === '_'){
        start = null;
        return false;
    }
    return true;
}

var walk = function(uri, list, filter){
    var stat = fs.lstatSync(uri);
    if(filter(uri)){
        if(stat.isFile()){
            if(filter(uri)){
                var eName = path.extname(uri);
                !list[eName] && (list[eName] = []);
                list[eName].push(uri.replace(/\\/g, "/"))
            }
        }
        if(stat.isDirectory()){
            fs.readdirSync(uri).forEach(function(part){
                var d = path.join(uri, part);
                walk(path.join(uri, part), list, filter)
            })
        }
    }
};

module.exports = function(uri, filter){
    var list = {};
    filter = filter || defaultFilter;
    walk(uri, list, filter);
    return list;
}
