module.exports = async (d) => {
  const code = d.command.code;
  const inside = d.unpack();
  const err = d.inside(inside);

  if (err) return throw new Error(err);

  const [variable, channelID = d.message.channel.id] = inside.splits;

  if (d.client.variables[variable] === undefined)
    return throw new Error(`:x: Variable '${variable}' not found`);

  if (!channelID)
    return throw new Error(
      `:x: channelID field not provided in \`$deleteChannelVar${inside}\``
    );

  await d.client.db.delete("main", `${variable}_${channelID}`);

  return {
    code: code.replaceLast(`$deleteChannelVar${inside}`, ""),
  };
};
