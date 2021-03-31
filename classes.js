module.exports = {
    //Trans-Scope var. Just some data, stored as an object with references instead of clones.
    TSVar:class{
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
    },
    // A scope to contain variables, stored as TSVars.
    Env:class{
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
            this.contents.push(new module.exports.TSVar(name, data))
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
        has(name){
            var foundResult = false
            this.contents.forEach((val)=>{
                if(val.name == name){
                    foundResult = true
                }
            })
            return foundResult
        }
        add(name, value){
            this.contents.push(new module.exports.TSVar(name, value))
        }
        set(name, value){
            var foundResult = null
            this.contents.forEach((val)=>{
                if(val.name == name){
                    foundResult = val
                }
            })
            val.val = value
        }
    }
}