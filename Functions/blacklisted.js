const Discord = require("discord.js");


module.exports = async (client, message) => {





    client.con.get(`SELECT * FROM blacklist WHERE userID = "${message.author.id}"`, (err, r) => {
        if (err) console.log(err)
        if (r) {
            message.delete()
            let blacklistEmbed = new Discord.RichEmbed()
                .addField(`You Have Been Blackisted For Violating The Usage Of ${client.user.username}.`, `\n\n**This is a message stating you are unable to use this bot.\n\nReason for Blacklisting: ${r.reason}\n\nIf you would to like to argue your case in respect of your ban\nPlease contact us in our support server [here](https://discord.gg/ufxFPaZ).**`)

                .setColor("#4286f4")


            message.channel.send(blacklistEmbed).catch(console.error).then(message => message.delete(300 * 300));
        }




    })
}
