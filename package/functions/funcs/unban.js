module.exports = async d => {
  
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)

    let [
        userID = new String(),
        reason = undefined
    ] = inside.splits
    
    if (!Number(userID) || userID.length < 15) {
        const bans = await d.message.guild.fetchBans().catch(err => null) 
        
        if (bans) {
            const ban = bans.find(u => u.user.username === userID || u.user.tag === userID) 
            
            if (!ban) throw new Error(`❌ Invalid username in \`$unban${inside}\``)
            
            userID = ban.user.id 
        }
    }
    
    const user = await d.message.guild.members.unban(userID, reason).catch(err => null)

    if (!user) throw new Error(`:x: Failed to unban user!`)

    return {
        code: code.replaceLast(`$unban${inside}`, "")
    }
}