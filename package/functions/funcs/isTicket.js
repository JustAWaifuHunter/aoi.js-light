module.exports = async d => {
 const code =d.command.code 
 
 const anything = d.unpack() 
 
 const channel = anything.inside ? d.message.guild.channels.cache.get(anything.inside) : d.message.channel 
 
 if (!channel) throw new Error(`❌ Invalid channel ID in \`$isTicket${anything.total}\``) 
 
 const exists = await d.client.db.get("main", `ticket_${channel.id}`)
 
 return {
 code: code.replaceLast(`$isTicket${anything.total}`, new Boolean(exists)) 
 }
}