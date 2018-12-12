const Discord = require('discord.js')

module.exports = (client, message, args) => {
    if(!message.author.id === client.default.owner) return;
var  embed = new Discord.RichEmbed()
  .setTimestamp()
  .setTitle("**Server List**")
  .setFooter(`Total Servers: ${client.guilds.size.toLocaleString()}`)
  .setDescription(client.guilds.map(g => "**"+g.name+"** \n[Server ID:"+g.id+"]\n") );
  message.delete(10)
  message.channel.send(embed)
}