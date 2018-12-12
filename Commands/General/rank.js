const Discord = require('discord.js');
module.exports = (client, message,args ) => {
    client.database.get('SELECT bool FROM toggleLevel WHERE guildID = ?', [message.guild.id], (err, row) => {
        if (!row || row.bool === '0') return message.reply('The leveling system is disabled on this guild!');

        let member;
        if (!args[0]) member = message.member;
        else member = message.guild.members.get(args[0].replace(/[<>@!?]/g, ''));
        if (!member) return message.reply('The member you provided was invalid!');

        client.database.get('SELECT exp, level FROM xp WHERE userID = ? AND guildID = ?', [member.id, message.guild.id], (err,row) => {
        if (!row) return message.reply('That user has not been recorded in the database yet!');
        // const rank = row.indexOf(row.find(r => r.userid === member.id)) + 1;
        // console.log("!")
        const embed = new Discord.RichEmbed()
            .setTitle(`${member.user.tag}'s Level Information`)
            .setColor(client.user.displayHexColor)
            .addField('Level', row.level > 1000 ? 'Max' : row.level, true)
            .addField('XP', row.exp > 25000000 ? 'Max' : `${row.exp}/${Math.pow((row.level + 1) / 0.5, 2)}`, true)
            //.addField('Rank', rank ? `#${rank}` : 'N/A')
            .setFooter(client.footer);

        return message.channel.send(embed);
    })
})
};