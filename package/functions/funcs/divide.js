const divide = async (d) => {
  const code = d.command.code;

  const r = code.split("$divide").length - 1;

  const inside = code.split("$divide")[r].after();

  const err = d.inside(inside);

  if (err) throw new Error(err);

  const fields = inside.splits;

  if (fields.some((n) => isNaN(Number(n))))
    throw new Error(`:x: Invalid number in \`$divide${inside}\``);

  const n = fields.reduce((x, y) => Number(x) / Number(y));

  return {
    code: code.replaceLast(`$divide${inside}`, n),
  };
};

module.exports = divide;
