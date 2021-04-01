/*
YAPL: Yet Another Programming Language
Made for fun.
This is the statement interpreter.
*/
const cls = require("./classes")
const colors = require("colors")
/**
 * 
 * @param {String} statement The code to be run.
 * @param {Env} env The environment to use.
 */
var nativeFuncs = { // functions that are native.
    print(...data){
        data.forEach((val, index)=>{
            val = val.replace(/\"/g, "")
            val = val.trim()
            data[index] = val
        })
        console.log.apply(global, data)
    }
}
module.exports = function interpretStatement(statement, env, ep){
    statement = statement.trim()
    if(statement == "")return
    statement = statement.replace(/([\w+|[0-9]+])/g, (m, g1)=>{
        if(env.has(g1)){
            return env.get(g1)
        }else{return m}
    })
    var mcs = { //Match Cases.
        eqcheck: /(.*)\s*==\s*(.*)/,
        func: /(.+)\s*\(\s*([^)]*)\s*\)$/,
    }
    var mc //What case we matched.
    var stm = statement //Just an alias to make it less typing.
    stm = stm.replace(mcs.eqcheck, (m, g1, g2)=>{
        if(g1 == g2)return "true"
        else return "false"
    })
    if(mc = stm.match(mcs.func)){
		var funcName = mc[1]
		var funcArgs = mc[2].split(',')
		if (nativeFuncs[funcName]) {
			nativeFuncs[funcName].apply(this, funcArgs);
        }
    } else {
		console.log("No match");
	}
}
