const ms = require("ms") 
const resolve = require("../../handlers/resolveProperties") 
const timeout = require("../../handlers/singleTimeout") 

module.exports = async d => {
 const code = d.command.code 
 
 const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)
 
 const [duration, timeoutData, pulse] = inside.splits 
 
 const time = ms(duration) 
 
 if (!time) throw new Error(`❌ Invalid duration for the timeout in \`$setTimeout${inside}\``) 
 
 if (pulse && !ms(pulse)) throw new Error(`❌ Invalid timeout heartbeat in \`$setTimeout${inside}\``) 
 
 const max = ms("21d") 
 
 const object = resolve(timeoutData) 
 
 object.repeatEvery = pulse ? ms(pulse) : undefined 
 object.duration = time 
 object.expiresAt = Date.now() + time 
 object.guildID = d.message.guild ? d.message.guild.id : undefined 
 
 const id = Math.floor(Math.random() * 5993929294848291)
 
 object.id = id 
 
 d.client.db.set(`main`, `timeout_${id}`, object)

 timeout(d.client, object) 
 
 return {
 code: code.replaceLast(`$setTimeout${inside}`, "")
 }
}