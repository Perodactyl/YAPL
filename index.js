/*
YAPL: Yet Another Programming Language
Made for fun.
This is the entry point.
*/
const say = console.log
const ep = { // Constants that other programs might use, ep standing for entry point.
    version:[0, 1, 0, true],
    verboseVersion:ep.version.slice(0, 3).join(".")+`${version[3] ? " DEVEL" : ""}`
}
var args = process.argv
args.splice(0, 2) // Remove running the program. In a release to be built, this would splice 1 instead of 2.
if(!args.length){
    require("./repl")(ep)
}else{
    require("./reader")(args[0], ep)
}