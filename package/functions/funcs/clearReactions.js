module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$clearReactions").length - 1;

  const inside = code.split("$clearReactions")[r].after();

  const err = d.inside(inside);

  if (err) throw new Error(err);

  const [channelID, messageID, emojiOptions = "all"] = inside.splits;

  const channel = d.client.channels.cache.get(channelID);

  if (!channel)
    throw new Error(`❌ Invalid channel ID in \`$clearReactions${inside}\``);

  const msg = await channel.messages.fetch(messageID).catch((err) => null);

  if (!msg)
    throw new Error(`❌ Invalid message ID in \`$clearReactions${inside}\``);

  if (emojiOptions === "all") {
    await msg.reactions.removeAll().catch((err) => null);
  } else {
    const emoji = emojiOptions.includes("<")
      ? emojiOptions.split(":")[2].split(">")[0]
      : emojiOptions;

    try {
      await msg.reactions.cache.get(emoji).remove();
    } catch (err) {
      return {
        code: code.replaceLast(`$clearReactions${inside}`, ""),
      };
    }
  }

  return {
    code: code.replaceLast(`$clearReactions${inside}`, ""),
  };
};
