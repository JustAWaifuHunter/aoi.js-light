module.exports = async d => {
    const fs = require('fs')
    let code = d.command.code 
    const inside = d.unpack() 
    const err = d.inside(inside) 
    if(err) throw new Error(err)
    let res;
    let file = inside.inside 

   if(fs.existsSync(file)){
       res = fs.readFileSync(process.cwd()+"/"+file) 
       } else {
          res =  throw new Error(`Couldn't Found the ${file}`)
           }

    return{

    code: code.replaceLast(`$readFile${inside}`, res || "")

  }
}

// Credits Ayaka (Github:  USERSATOSHI / Discord: Ayaka#5057) 