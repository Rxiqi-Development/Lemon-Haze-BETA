const Discord = require('discord.js')

module.exports = async (client, oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content) return;
    if (!oldMessage.guild) return;
    if (!newMessage.content || !oldMessage.content) return;
    client.database.get("SELECT * FROM logs WHERE guildID = ?", [newMessage.guild.id], (err, row) => {
        if (!row) {
           
        } else {
            const logs = newMessage.guild.channels.find(c => c.id === row.channelID);

           

            const logembed = new Discord.RichEmbed()
               
                .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL)
                .setDescription(`**Message sent by ${oldMessage.author.tag} edited in ${oldMessage.channel}**`)
                .addField("Old Content", oldMessage.content)
                .addField("New Content", newMessage.content)
                .setColor(oldMessage.guild.me.displayHexColor)
                .setFooter(`Edited Message`)
                .setTimestamp()
            
            logs.send(logembed);
        }
    })
}
