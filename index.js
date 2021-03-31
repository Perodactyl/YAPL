/*
YAPL: Yet Another Programming Language
Made for fun.
This is the entry point.
*/
const say = console.log
var args = process.argv
args.splice(0, 2) // Remove running the program. In a release to be built, this would splice 1 instead of 2.
if(!args.length){
    require("./repl")()
}else{
    require("./reader")(args[0])
}