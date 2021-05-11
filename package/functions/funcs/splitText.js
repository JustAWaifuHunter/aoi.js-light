module.exports = d => {
 
  const code = d.command.code
  
  const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)
  
  const n =Number(inside.inside)
  
  if (isNaN(n) || n < 1) return throw new Error(`❌ Invalid number in \`$splitText${inside}\``)
  
  return {
    code: code.replaceLast(`$splitText${inside}`, d.array[n - 1] ? d.array[n - 1].removeBrackets() : "") 
  } 
}