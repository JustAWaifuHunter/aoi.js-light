// Copyright 2021 Rake#6882
// All rights reserved

const ms = require('ms');
module.exports = async (d) => {
  const code = d.command.code;
  const inside = d.unpack();
  const err = d.inside(inside);
  if (err) return throw new Error(err);
  let time = -1;
  try{
  time = ms(inside.inside);
  }
  catch{
  return throw new Error(':x: Wrong ms/duration provided')
  }

  return {
    code: code.replaceLast(`$ms${inside}`,time),
  };
};
