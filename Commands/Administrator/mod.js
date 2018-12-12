const Discord = require('discord.js');

module.exports = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    if (!args[0]) return message.channel.send("Please use this format:\nsetlogs <#chosen-channel>\ndisablelogs to disable mod logging.").then(() => message.delete(300 * 300));
    if (['setlogs'].includes(args[0])) {

        let ch = args[1];

        let channel = message.guild.channels.get(ch.replace(/[<>#]/g, ''))
        client.database.get(`SELECT * FROM modlog WHERE guildID = ?`, [message.guild.id], (err, row) => {
            if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                message.delete()
            }
            if (row) return message.channel.send(`Mod-Logs has already been set to <@&${row.channeID}>.`).then(m => m.delete(300 * 300));
            if (!row) client.database.run("INSERT INTO modlog (guildID, channelID) VALUES (?, ?)", [message.guild.id, channel.id], (err) => {
                if (err) return console.log(err);
                if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                    message.delete()
                }

                let mod_set = new Discord.RichEmbed()
                    .setAuthor("Mod Logs Set")
                    .addField("Channel Set To", channel)
                    .setFooter(`${client.footer}`)
                message.channel.send(mod_set).then(m => m.delete(300 * 300));

            })
        })

    } else {

        if (['disablelogs'].includes(args[0])) {
            if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                message.delete()
            }
            client.database.get(`SELECT * FROM modlog WHERE guildID = ?`, [message.guild.id], (err, row) => {
                if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                    message.delete()
                }
                if (!row) return message.channel.send(`Mod-Logs does not exist in the Guild Configuration.`).then(m => m.delete(300 * 300));

                client.database.get(`SELECT * FROM modlog WHERE guildID = ?`, [message.guild.id], (err, row) => {
                    if (!row) return message.channel.send("No Mod Log channel has been set for this guild.").then(m => m.delete(300 * 300));

                    client.database.run("DELETE FROM modlog WHERE guildID = ?", [message.guild.id]);
                    let mod_disabled = new Discord.RichEmbed()
                        .setAuthor("Mod Log Disabled")
                        .setFooter(`${client.footer}`)
                    message.channel.send(mod_disabled).then(m => m.delete(300 * 300));
                })
            })


        } else { message.channel.send("Please choose an option: \nsetlogs <#chosen-channel>\ndisablelogs to disable mod logging.").then(() => message.delete(300 * 300)); }
    }
}

