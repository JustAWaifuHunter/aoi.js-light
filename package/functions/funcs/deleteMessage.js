module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$deleteMessage").length - 1;

  const inside = code.split("$deleteMessage")[r].after();

  const err = d.inside(inside);

  if (err) throw new Error(err);

  const fields = inside.splits;

  const messageID = fields[1] || fields[0];

  const channelID = fields[1] ? fields[0] : d.message.channel.id;

  const channel = d.client.channels.cache.get(channelID);

  if (!channel)
    throw new Error(`❌ Invalid channel ID in \`$deleteMessage${inside}\``);

  const m = await channel.messages.fetch(messageID).catch((err) => null);

  if (!m)
    throw new Error(`❌ Invalid message ID in \`$deleteMessage${inside}\``);

  await m.delete().catch((err) => null);

  return {
    code: code.replaceLast(`$deleteMessage${inside}`, ""),
  };
};
