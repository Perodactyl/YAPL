/*
YAPL: Yet Another Programming Language
Made for fun.
This is the entry point.
*/
const say = console.log
var ep = { // Constants that other programs might use, ep standing for entry point.
    version:[0, 1, 0, true],
    types:{
        any:0,
        str:1,
        int:2,
        float:3,
        bool:4,
        uint:5,
        byte:6,
        object:7
    }
}
ep.verboseVersion = ep.version.slice(0, 3).join(".")+`${ep.version[3] ? " DEVEL" : ""}`
var args = process.argv
args.splice(0, 2) // Remove running the program. In a release to be built, this would splice 1 instead of 2.
if(!args.length){
    require("./repl")(ep)
}else{
    require("./reader")(args[0], ep)
}