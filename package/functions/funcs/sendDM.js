const embed = require("../../handlers/errors")

module.exports = async d => {
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)

    let [
        userID,
         ...msg
    ] = inside.splits
    
    msg = msg.join(";")
    
    const user = await d.client.users.fetch(userID).catch(err => {})

    if (!user) return throw new Error(`:x: Invalid user ID in \`$sendDM${inside}\``)

    const options = await embed(d, msg, undefined, user)
    
    return {
        code: code.replaceLast(`$sendDM${inside}`, "")
    }
}// it works?