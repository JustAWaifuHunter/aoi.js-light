const userInfo = require("../../utils/userInfo");
const defaultOpts = {
  inviter: {
    id: "",
    code: "",
  },
  real: 0,
  fake: 0,
};

module.exports = async (d) => {
  let code = d.command.code;

  const inside = d.unpack();
  const err = d.inside(inside);

  if (err) throw new Error(err);

  const [option, id = d.message.author.id] = inside.splits;

  if (!userInfo[option])
    throw new Error(`:x: Invalid option in \`$userInfo${inside.total}\``);

  const user = await d.client.users.fetch(id).catch((err) => {});

  if (!user)
    throw new Error(`:x: Invalid userID in \`$userInfo${inside.total}\``);

  const data =
    (await d.client.db
      .get("main", `invite-tracker_${d.message.guild.id}_${user.id}`)
      .then((d) => (d ? d.value : undefined))) || defaultOpts;

  return {
    code: code.replaceLast(
      `$userInfo${inside.total}`,
      eval(`data${userInfo[option].split(";")[1]}`)
    ),
  };
};
