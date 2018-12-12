const Discord = require('discord.js');
const moment = require("moment");
module.exports = async (client, message, args) => {
    const toggled =(await  client.database.get('SELECT bool FROM toggleLevel WHERE guildID = ? AND bool = ?', [message.guild.id,1])).rows[0];
 if (!toggled) return message.reply('The leveling system is disabled!');

  let { rows: levels } = await client.database.get('SELECT exp,userID,level FROM xp WHERE guildID = ? ORDER BY exp DESC', [message.guild.id]);
  levels = levels.slice(0, 10);

  const members = levels.map(r => message.guild.members.get(r.userid)).filter(m => m);
  const lb = levels.filter(r => message.guild.members.has(r.userid)).map((r, i) => `${i ? i === 1 ? ':second_place:' : i === 2 ? ':third_place:' : ':ribbon:' : ':first_place:'} ${members[i].user.tag} - ${r.level} Levels | ${r.points} Points`);

  const embed = new Discord.RichEmbed()
    .setTitle(`Leveling Leaderboard for ${message.guild.name}`)
    .setDescription(lb.join('\n'))
    .setColor(0x00FF00)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

  return message.channel.send(embed);
};