var fs = require("fs");
var walk = require("./walkDir");
var list = walk('d:/t5');
fs.writeFileSync('./test.js',JSON.stringify(list))