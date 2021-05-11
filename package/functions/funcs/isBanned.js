module.exports = async d => {
 const code = d.command.code 
 
 const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)
 
 const [userID, guildID = d.message.guild.id] = inside.splits
 
 const guild = d.client.guilds.cache.get(guildID) 
 
 if (!guild) return throw new Error(`❌ Invalid guild ID in \`$isBanned${inside}\``) 
 
 const ban = await guild.fetchBan(userID).catch(err => null) 
 
 return {
 code: code.replaceLast(`$isBanned${inside}`, Boolean(ban))
 }
}