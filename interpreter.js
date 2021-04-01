/*
YAPL: Yet Another Programming Language
Made for fun.
This is the statement interpreter.
*/
const colors = require("colors")
var ep = null
var cls = null
/**
 * 
 * @param {String} statement The code to be run.
 * @param {Env} env The environment to use.
 */
var nativeFuncs = { // functions that are native. All passed values are TSVar clones.
    print(...data){
        data.forEach((val, index)=>{
            val = val.val
            data[index] = val
        })
        console.log.apply(global, data)
    },
    reverse(str){
        return new cls.TSVar(null, str.val.split("").reverse().join(""), ep.types.str)
    }
}
//Converts a string to a TSVar. if an edit var(eVar) is passed, modifies it's value.
function strToNative(str, eVar) {
    var output = null
    var mc = null
    if(mc = str.match(/^"((?:[^"\\]|\\.)+)"$/)){
        str = mc[1]
        output = new cls.TSVar(null, str, ep.types.str)
    }else if(mc = str.match(/^([0-9]*)\.([0-9]+)$/)){
        output = new cls.TSVar(null, parseFloat(mc[1]+"."+mc[2]))
    }else if(mc = str.match(/^([0-9]+)$/)){
        output = new cls.TSVar(null, parseInt(mc[1]), ep.types.int)
    }else if(mc  = str.match(/^(true|false|True|False)$/)){
        output = new cls.TSVar(null, mc[1].toLowerCase() == "true", ep.types.bool)
    }
    if(!output){
        throw new Error("Could not parse value.")
    }
    if(eVar){
        eVar.type = output.type
        eVar.val = output.val
    }
    return output
}
function nativeToStr(tsvar){
    var val = tsvar.val
    var tp = typeof val
    var output = null
    if(tp === "string"){
        output = `"${val}"`
    }else if(tp === "number"){
        output = `${val}`
    }else if(tp === "boolean"){
        output = (val ? "true" : "false")
    }
    return output
}
function parseType(str){
    var type = ep.types.any
    if(ep.types[str.toLowerCase()]){
        type = ep.types[str.toLowerCase()]
    }
    return type
}
/**
 * 
 * @param {String} statement The code to execute.
 * @param {cls.Env} env The environment to run code in.
 * @param {Object} lep Local version of EP constant.
 * @returns {undefined} Nothing.
 */
module.exports = function interpretStatement(statement, env, lep){
    cls = require("./classes")(lep)
    ep = lep
    statement = statement.trim()
    if(statement == "")return
    statement = statement.replace(/(\w+|[0-9]+)/g, (m, g1)=>{
        if(env.has(g1)){
            return env.get(g1)
        }else{return m}
    })
    var mcs = { //Match Cases.
        eqcheck: /(.*)\s*==\s*(.*)/,
        func: /(.+)\s*\(\s*([^)]*)\s*\)$/,
        var: /var\s*(\w+)\s*(.+)\s*=\s*(.+)/
    }
    var mc //What case we matched.
    var stm = statement //Just an alias to make it less typing.
    if(mc = stm.match(mcs.func)){
		var funcName = mc[1]
		var funcArgs = mc[2].split(',')
        funcArgs.forEach((name, index)=>{
            name = name.trim()
            name = strToNative(name)
            funcArgs[index] = name
        })
		if (nativeFuncs[funcName]) {
			var output = nativeFuncs[funcName].apply(this, funcArgs);
            if(typeof output !== "undefined"){
                stm = stm.replace(nativeToStr(output))
            }
        }
    } else if(mc = stm.match(mcs.var)){
        env.add(mc[1], mc[3], parseType[mc[2]])
    }
    stm = stm.replace(mcs.eqcheck, (m, g1, g2)=>{
        if(g1 == g2)return "true"
        else return "false"
    })
}
