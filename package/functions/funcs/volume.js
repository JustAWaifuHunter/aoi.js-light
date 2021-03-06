module.exports = async (d) => {
  const code = d.command.code;

  const inside = d.unpack();

  const server = d.client.servers.get(d.message.guild.id);

  if (!server) throw new Error(`:x: Nothing is being played`);

  if (inside.inside) {
    const n = Number(inside.inside);

    if (isNaN(n)) throw new Error(`:x: Invalid number in \`$volume${inside}\``);

    server.connection.dispatcher.setVolume(n / 100);
    server.volume = n;

    d.client.servers.set(d.message.guild.id, server);

    return {
      code: code.replaceLast(`$volume${inside}`, ""),
    };
  } else {
    return {
      code: code.replaceLast(`$volume`, server.volume),
    };
  }
};
