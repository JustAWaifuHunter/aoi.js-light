module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$deleteRoles").length - 1;

  const inside = code.split("$deleteRoles")[r].after();

  for (const id of inside.splits) {
    const role = d.message.guild.roles.cache.get(id);

    if (!role)
      throw new Error(`:x: Invalid role ID in \`$deleteRoles${inside}\``);

    const del = await role.delete().catch((err) => {});

    if (!del) throw new Error(`:x: Failed to delete role ${role.name}!`);
  }

  return {
    code: code.replaceLast(`$deleteRoles${inside}`, ""),
  };
};
