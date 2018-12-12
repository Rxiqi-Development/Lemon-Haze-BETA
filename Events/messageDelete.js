const Discord = require('discord.js')


//FEATURE TO IMPLEMENT  if (message.attachments) if (message.attachments.first().width) return logembed.setImage(message.attachments.first().url)

module.exports = async (client, message) => {

    if (!message.guild) return;
    if (!message.content) return;
    client.database.get(`SELECT * FROM logs WHERE guildID = ?`, [message.guild.id], (err, row) => {
        if (!row) {
           
        } else {

            const logs = message.guild.channels.find(c => c.id === row.channelID);
            const logembed = new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setDescription(`**Message sent by ${message.author.tag} deleted in ${message.channel}**`)
                .addField("Message Content", `${message.content}`)
                .setColor(message.guild.member(client.user).displayHexColor)
                .setFooter(`Deleted Message`)
                .setTimestamp()

            logs.send(logembed);
            
        }


    })

}