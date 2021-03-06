var pug = require('pug');
const fs = require('fs');
var sha1 = require('sha1');
var js2coffee = require('js2coffee')
var CoffeeScript = require('coffeescript')

function compile(file,locals){
//Jade Compilation
var text = fs.readFileSync(file+'index.jade','utf8')
var fn = pug.compileFile(file+'index.jade',{"pretty":true});
var hash = sha1(text);
var html = fn(Object.assign({}, locals, {"hash":hash}));
fs.writeFile(file+"index.html", html, function(err) {
    if(err) {
        return console.log(err);
    }
    process.stdout.write("✅ ")
    console.log(file+"index.jade compiled.");
});
}

compile("",{prefix:"./"});
compile("blog/",{prefix:"../blog/"});
compile("matrix/",{prefix:"../matrix/"});
compile("resume/",{prefix:"../resume/"});
compile("stats/",{prefix:"../stats/"});
compile("tools/",{prefix:"../tools/"});
compile("typing/",{prefix:"../typing/"});
compile("weather/",{prefix:"../weather/"});
compile("404/",{prefix:"../404/"});
compile("snake/",{prefix:"../snake/"});