module.exports = async d => {
	let code = d.command.code

	const server = d.client.servers.get(d.message.guild.id)

	const r = code.split('$moveSong').length - 1
	const inside = code.split('$moveSong')[r].after()
	
	const n = Number(inside.splits[0])

  if (!inside.total.startsWith("[")) throw new Error(":x: Invalid usage in $moveSong")

	if (!server) throw new Error(':x: Nothing is playing!')

	if (!(n > 1) || n > server.songs.length) throw new Error(`:x: Invalid number in \`$moveSong${inside.total}\``)

	const to = Number(inside.splits[1])
	
  const [ song ] = server.songs.splice(n-1, 1)
	
	if (to === 1) {
		if (!server.connection.dispatcher)
			throw new Error(`:x: No song is playing!`)

		const first = server.songs[0]
		const lq = server.loopQueue

		server.loopQueue = false
		
		server.songs.splice(1, 0, song)

		server.connection.dispatcher.end()
		
		setTimeout(() => {
		  server.loopQueue = lq
		  
		  server.songs.splice(1, 0, first)
		  
		  d.client.servers.set(d.message.guild.id, server)
		}, 500)
	} else if (to > 1 && to < server.songs.length) {
		server.songs.splice(to-1, 0, song)
	}

	d.client.servers.set(d.message.guild.id, server)

	return {
		code: code.replaceLast(`$moveSong${inside.total}`, '')
	}
}