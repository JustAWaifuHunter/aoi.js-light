module.exports = async d => {

    const code = d.command.code

    const inside = d.unpack()

	const err = d.inside(inside)

	if (err) return throw new Error(err)

    let [channelid,msgid, pos,opt] = inside.splits

let Options = ["name","id","size","height","width","url"]

     const channel = d.client.channels.cache.get(channelid)

         if(!channel) return throw new Error(`:x: Invalid Channel ID Provided In $getAttachments${inside}`)

    if(pos <= 0) return throw new Error("Position Can't Be Less Than 1")

const msg = await channel.messages.fetch(msgid) 

if(!msg) return throw new Error(`:x: Invalid Message ID Provided In $getAttachments${inside}`)

    

    const option = Options.includes(opt)

    if(!option) return throw new Error(`:x: Invalid Option Provided In $getAttachments${inside}`)
 

    let attachment = msg.attachments.map(x=>x) 

if(attachment.length ==0) return throw new Error(`No attachment Found In Provided Message ID`)
        
       if(!attachment[pos-1]) return throw new Error(`No attachment Was Found At ${pos}  Position`)

let res ;

switch(opt) {

case "url" :

res = attachment [pos-1].url 

break;

case "name" :

res = attachment [pos-1].name

break;

case "id" :

res = attachment [pos-1].id 

break;

case "size" :

res = attachment [pos-1].size

break;

case "height" :

res = attachment [pos-1].height 

break;

case "width" :

res = attachment [pos-1].width

break;

}

return {

        code: code.replaceLast(`$getAttachments${inside}`, res)

    }

}
}
