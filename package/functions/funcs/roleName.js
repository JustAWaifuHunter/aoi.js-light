module.exports = async d => {
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)

    const role = d.message.guild.roles.cache.get(inside.inside)

    if (!role) return throw new Error(`:x: Invalid role ID in \`$roleName${inside}\``)

    return {
        code: code.replaceLast(`$roleName${inside}`, role.name)
    }
}