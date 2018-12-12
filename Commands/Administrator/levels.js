const Discord = require('discord.js');

module.exports = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    if (!args[0]) return message.channel.send("Please use this format:\nsetlogs <#chosen-channel>\ndisablelogs to disable level logging.").then(() => message.delete(300 * 300));
    client.database.get('SELECT bool FROM togglelevel WHERE guildID = ?', [message.guild.id], (err, row) => {
        if (!row === "0" || "false") {
            if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                message.delete()
            }
            message.reply('\nLevelling is disabled.\nUse `config togglelevel true` to enable levelling on this guild, then use this command again');
        
        }
        if (row && row.bool === "true") {


            if (['setlogs'].includes(args[0])) {
                let ch = args[1];
                let channel = message.guild.channels.get(ch.replace(/[<>#]/g, ''))
                client.database.get(`SELECT * FROM levelling WHERE guildID = ?`, [message.guild.id], (err, row) => {
                    if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                        message.delete()
                    }

                    if (row) return message.channel.send(`Level Log channel has already been set to <#${row.channelID}>.`).then(m => m.delete(300 * 300));

                    client.database.run("INSERT INTO levelling (guildID, channelID) VALUES (?, ?)", [message.guild.id, channel.id], (err) => {
                        if (err) return message.channel.send(err).then(m => m.delete(300 * 300));
                        if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                            message.delete()
                        }

                        let modlog_set = new Discord.RichEmbed()
                            .setAuthor("Levelling Channel Set")
                            .addField(`Channel Set To`, `${channel}`)
                            .setFooter(`${client.footer}`)
                        message.channel.send(modlog_set).then(m => m.delete(300 * 300));

                    })

                })


            } else {
                if (['disablelogs'].includes(args[0])) {
                    if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                        message.delete()
                    }
                    client.database.get(`SELECT * FROM levelling WHERE guildID = ?`, [message.guild.id], (err, row) => {
                        if (!row) return message.channel.send("No Level Log channel has been set for this guild.").then(m => m.delete(300 * 300));
                        if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                            message.delete()
                        }
                        client.database.run("DELETE FROM levelling WHERE guildID = ?", [message.guild.id]);
                        let modlog_disabled = new Discord.RichEmbed()
                            .setAuthor("Levelling Channel Disabled")
                            .setFooter(`${client.footer}`)
                        message.channel.send(modlog_disabled).then(m => m.delete(300 * 300));
                    })

                } else { message.channel.send("Please choose an option: \nsetlogs <#chosen-channel>\ndisablelogs to disable level logging.").then(() => message.delete(300 * 300)); }
            }
        }
    })
}