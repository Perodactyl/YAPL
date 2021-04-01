/*
YAPL: Yet Another Programming Language
Made for fun.
This is the repl.
*/
const readline = require("readline")
const interpretStatement = require("./interpreter")
const say = console.log
module.exports = function startRepl(ep){
    const cls = require("./classes")(ep)
    var inf = readline.createInterface(process.stdin, process.stdout)
    var env = new cls.Env()
    say("YAPL", ep.verboseVersion, "REPL intialized.")
    inf.on("line", (ln)=>{
        interpretStatement(ln, env, ep)
    })
}