//Trans-Scope var. Just some data, stored as an object with references instead of clones.
class TSVar{
    constructor(n, v){
        this.name = n
        this.val = v
    }
    /**
     * 
     * @param {TSVar} otherVar The variable to compare.
     * @returns Whether the values were equivalent.
     */
    eq(otherVar){
        return this.val == otherVar.val
    }
}
// A scope to contain variables, stored as TSVars.
class Env{
    constructor(){
        this.contents = []
        this.parents = []
        this.children = []
    }
    /**
     * 
     * @param {Env} env The environment to add as a parent.
     */
    addParent(env){
        env.children.push(this)
        this.parents.push(env)
        env.contents.forEach((vData)=>{
            this.contents.push(vData)
        })
    }
    add(name, data){
        this.contents.push(new TSVar(name, data))
    }
    get(name){
        var foundResult = null
        this.contents.forEach((val)=>{
            if(val.name == name){
                foundResult = val
            }
        })
        if(foundResult)return foundResult.val
        return null
    }
}