module.exports = async d => {
    const code = d.command.code
    
    const inside = d.unpack()

    if (inside.inside) {
        const guild = d.client.guilds.cache.get(inside.inside)

        if (!guild) throw new Error(`:x: Invalid guild ID in \`$serverName${inside}\``)

        return {
            code: code.replaceLast(`$serverName${inside}`, guild.name.deleteBrackets())
        }
    } else {
        return {
            code: code.replaceLast(`$serverName`, d.message.guild.name.deleteBrackets())
        }
    }
}