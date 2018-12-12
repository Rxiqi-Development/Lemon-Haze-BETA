const Discord = require('discord.js');

module.exports = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"||"MANAGE_MESSAGES"||"KICK_MEMBERS"||"BAN_MEMBERS")) return;
  if (!args[0]) return message.reply('You have to supply a user for me to warn!');
  const member = message.guild.members.get(args[0].replace(/[<>@!?]/g, ''));

  if (!member) return message.reply('That member does not exist! Supply an ID or a mention.');
  if (member.roles.highestRole >= message.member.roles.highestRole && message.member !== message.guild.owner) return message.reply('Your role position is not high enough to warn that member!');
  if (member.user.bot) return message.reply('I cannot warn a bot :joy:!');
  //if (member === message.member) return message.reply('You cannot warn yourself :joy:!');
  if (member === message.guild.owner) return message.reply('I cannot warn the owner of the server, that is just idiotic!');

  let amt = args[1];
  if (!amt) return message.reply('You have to provide an amount of total current warnings the user has!');
  if (amt.toLowerCase() !== 'cur') {
    if (isNaN(amt)) return message.reply('That amount of total warnings is not a number!');
    if (amt < 0) return message.reply('People cannot have negative warnings!');
    if (amt.includes('.')) return message.reply('A person may not have fractional warnings!');
  } else {
    const warnAmtRow = (await client.database.get('SELECT * FROM warnings WHERE userID = ? AND guildID = ?', [member.id, message.guild.id])).rows[0];
    amt = warnAmtRow ? warnAmtRow.warnamount : 1;
  }

  const reason = args[2] ? args.slice(2).join(' ') : 'None';
  client.database.get(`SELECT * FROM warnings WHERE userID = ?`, [member.id], (err, row) => {
    if (row) {
      message.channel.send(`Successfully warned ${member.user.tag} for \`${reason}\` with ${amt} total warnings.`);
      client.database.get(`SELECT * FROM modlog WHERE guildID = ?`, [message.guild.id], (err, row) => {
        if (!row) return;
        const logs = message.guild.channels.find(c => c.id === row.channelID);
        let warned = new Discord.RichEmbed()
          .setTitle("Moderation Logs \`USER_WARNED_UPDATED\`")
          .setDescription(`Case Number #${row.id}`)
          .addField("Warned User", member, true)
          .addField("Moderator", message.author, true)
          .addField("Reason", reason, true)


        logs.send(warned)
        
      })
    
      client.database.run('UPDATE warnings SET warnamount = ? WHERE userID = ? AND guildID = ?', [amt, message.author.id, message.guild.id]);
    } else {
      client.database.run('INSERT INTO warnings (userID, guildID, warnamount, warnreason) VALUES (?, ?, ?, ?)', [member.id, message.guild.id, amt, reason], (e, r) => {
        message.channel.send(`Successfully warned ${member.user.tag} for \`${reason}\` with ${amt} total warnings.`);
        client.database.get(`SELECT * FROM modlog WHERE guildID = ?`, [message.guild.id], (err, row) => {
          if (!row) return;
          const logs = message.guild.channels.find(c => c.id === row.channelID);
          let warned = new Discord.RichEmbed()
            .setTitle("Moderation Logs \`USER_WARNED\`")
            .setDescription(`Case Number #${row.id}`)
            .addField("Warned User", member, true)
            .addField("Moderator", message.author, true)
            .addField("Reason", reason, true)


          logs.send(warned)

        })
      })
    }
  })


}
