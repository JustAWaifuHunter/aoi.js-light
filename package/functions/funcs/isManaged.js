module.exports = async d => {
    const code = d.command.code 
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)
    
    const role = d.message.guild.roles.cache.get(inside.inside) 
    
    if (!role) throw new Error(`❌ Invalid role ID in \`$isManaged${inside}\``) 
    
    return {
        code: code.replaceLast(`$isManaged${inside}`, role.managed)
    }
}