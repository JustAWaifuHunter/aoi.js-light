module.exports = async d => {
    const code = d.command.code 
    
    const r = code.split("$getCollectionKey").length - 1 
    
    const inside = code.split("$getCollectionKey")[r].after()

	if (!inside.inside) return throw new Error(`:x: Invalid usage in $getCollectionKey${inside}`)
    
    const [cname, key] = inside.splits 
    
    const collection = d.client.collections[cname.addBrackets()]
    
    if (!collection) return throw new Error(`❌ Invalid collection name in \`$getCollectionKey${inside}\``) 
    
    const data = collection.get(key.addBrackets())
    
    return {
        code: code.replaceLast(`$getCollectionKey${inside}`, data ? data.deleteBrackets() : "") 
    }
}