/*
YAPL: Yet Another Programming Language
Made for fun.
This is the statement interpreter.
*/
const cls = require("./classes")
/**
 * 
 * @param {String} statement The code to be run.
 * @param {Env} env The environment to use.
 */
var nativeFuncs = { // functions that are native.
    print(data){
        console.log("PRINTED: ", data)
    }
}
module.exports = function interpretStatement(statement, env, ep){
    var replacedAny = false
	console.log("Interpreting: ", statement);
    statement = statement.replace(/([\w+|[0-9]+])/, (m, g1)=>{
        if(env.has(g1)){
            return env.get(g1)
            replacedAny = true
        }else{return m}
    })
    if(replacedAny){
	console.log("replaced env var");
        interpretStatement(statement, env, ep)
        return
    }
    var mcs = { //Match Cases.
        eqcheck: /(.*)\s*==\s*(.*)/,
		// Function name, optional whitespace, open paren, non-commas, comma, close paren
        func: /(.+)\s*\(\s*([^)]*)\s*\)$/,
//        func: /(.*)\s*\(\s*(([^,]+)*)\s*\)$/
//        func: /(.*)\s*\((([^,]),)\)/
    }
    var mc //What case we matched.
    var stm = statement //Just an alias to make it less typing.
    if(mc = stm.match(mcs.eqcheck)){
		console.log("eqcheck");
        
    }else if(mc = stm.match(mcs.func)){
		var funcName = mc[1]
		var funcArgs = mc[2].split(',')
		console.log("func args: ", funcArgs);
		if (nativeFuncs[funcName]) {
			nativeFuncs[funcName].apply(this, funcArgs);
		} else {
			console.log('Not a native function: ', funcName);
		}
        
    } else {
		console.log("No match");
	}
}
