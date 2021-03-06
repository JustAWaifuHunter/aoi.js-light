module.exports = async d => {
    const code = d.command.code 
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)
    
    return {
        code: code.replaceLast(`$serverExists${inside}`, d.client.guilds.cache.has(inside.inside))
    }
}