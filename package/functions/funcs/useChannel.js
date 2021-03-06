const useChannel = async (d) => {
  const code = d.command.code;

  if (code.split("$useChannel").length >= 3)
    return d.message.channel.send(`❌ Can't use more than one $useChannel.`);

  const inside = d.unpack();
  const err = d.inside(inside);

  if (err) throw new Error(err);

  let channel = d.client.channels.cache.get(inside.inside);

  if (!channel)
    throw new Error(`❌ Invalid channel ID in \`$useChannel${inside}\``);

  return {
    channel: channel,
    code: code.replaceLast(`$useChannel${inside}`, ""),
  };
};

module.exports = useChannel;
