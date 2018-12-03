const Discord = require('discord.js');

module.exports = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    if (!args[0]) return message.channel.send("Please use one of the following options:\nwelcome\nlogchannel\nguildprefix\nmodlog").then(() => message.delete(300 * 300))


    if (args[0] === "logchannel") {
        client.database.get("SELECT * FROM logs WHERE guildID = ?", message.guild.id, (err, row) => {
            if (err) throw err;

            if (!row) return message.channel.send("This guild has no log channel set.");
            message.channel.send(`\n\`Log Channel Set To\`: <#${row.channelID}>`).then(() => message.delete(300 * 300));
        });
    }
    if (args[0] === "guildprefix") {
        client.database.get("SELECT * FROM prefix WHERE guildID = ?", message.guild.id, (err, row) => {
            if (err) throw err;

            if (!row) return message.channel.send("This guild has no custom prefix set.");
            message.channel.send(`\n\`Custom Prefix Set To\`: <#${row.prefix}>`).then(() => message.delete(300 * 300));
        });
    }
    if (args[0] === "modlog") {
        client.database.get("SELECT * FROM modlog WHERE guildID = ?", message.guild.id, (err, row) => {
            if (err) throw err;

            if (!row) return message.channel.send("This guild has no modlog channel set.");
            message.channel.send(`\n\`Moderation Log Channel Set To\`: <#${row.channelID}>`).then(() => message.delete(300 * 300));
        });
    }
    if (args[0] === "welcome") {
        client.database.get("SELECT * FROM welcome WHERE guildID = ?", message.guild.id, (err, row) => {
            if (err) throw err;

            if (!row) return message.channel.send("This guild has no welcome channel set.");
            message.channel.send(`\n\`Welcome Channel Set To\`: <#${row.channelID}>`).then(() => message.delete(300 * 300));
        });
    }
    if (['enablelogs', 'setlogs'].includes(args[0])) {
        let ch = args[1];
        let channel = message.guild.channels.get(ch.replace(/[<>#]/g, ''))
        client.database.get(`SELECT * FROM logs WHERE guildID = ?`, [message.guild.id], (err, row) => {
            if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                message.delete()
            }
           
            if (row) return message.channel.send(`Log channel has already been set to <#${row.channelID}>.`).then(m => m.delete(300 * 300));

        client.database.run("INSERT INTO logs (guildID, channelID) VALUES (?, ?)", [message.guild.id, channel.id], (err) => {
            if (err) return message.channel.send(err).then(m => m.delete(300 * 300));
            if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                message.delete()
            }

            let modlog_set = new Discord.RichEmbed()
                .setAuthor("Log Channel Set")
                .addField(`Channel Set To`, `${channel}`)
                .setFooter(`${client.footer}`)
            message.channel.send(modlog_set).then(m => m.delete(300 * 300));
            message.react('✅')
             })

        })


    } else {
        if (['disablelogs'].includes(args[0])) {
            if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                message.delete()
            }
            client.database.get(`SELECT * FROM logs WHERE guildID = ?`, [message.guild.id], (err, row) => {
                if (!row) return message.channel.send("No log channel has been set for this guild.").then(m => m.delete(300 * 300));

                client.database.run("DELETE FROM logs WHERE guildID = ?", [message.guild.id]);
                let modlog_disabled = new Discord.RichEmbed()
                    .setAuthor("Log Channel Disabled")
                    .setFooter(`${client.footer}`)
                message.channel.send(modlog_disabled).then(m => m.delete(300 * 300));
            })
        }
    }

    if (['enablewelcome', 'setwelcome'].includes(args[0])) {
        let ch = args[1];
        let welcome_msg = message.content.split(" ").slice(3);
        let welcome_message = welcome_msg.join(" ")
        if (welcome_message >= 1000) return message.reply('Please keep the message length less than a thousand characters.');

        let channel = message.guild.channels.get(ch.replace(/[<>#]/g, ''))
        client.database.get(`SELECT * FROM welcome WHERE guildID = ?`, [message.guild.id], (err, row) => {
            if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                message.delete()
            }
            if (row) return message.channel.send(`Welcome Channel has already been set to <#${row.channelID}>.`).then(m => m.delete(300 * 300));

            client.database.run("INSERT INTO welcome (guildID, channelID, welcome_message) VALUES (?, ?, ?)", [message.guild.id, channel.id, welcome_message], (err) => {
                if (err) return message.channel.send(err).then(m => m.delete(300 * 300));
                if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                    message.delete()
                }

                let welcome_set = new Discord.RichEmbed()
                    .setAuthor("Welcome Channel Enabled")
                    .addField(`Channel Set To`, channel)
                    .addField(`Welcome Message Set To`, welcome_message ? welcome_message : "Using Default Configuration")
                    .setFooter(`${client.footer}`)
                message.channel.send(welcome_set).then(m => m.delete(300 * 300));

            })
        })

    } else {

        if (['disablewelcome'].includes(args[0])) {
            if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                message.delete()
            }
            client.database.get(`SELECT * FROM welcome WHERE guildID = ?`, [message.guild.id], (err, row) => {
                if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                    message.delete()
                }
                if (!row) return message.channel.send(`Welcome Channel does not exist in the Guild Configuration.`).then(m => m.delete(300 * 300));

                client.database.get(`SELECT * FROM welcome WHERE guildID = ?`, [message.guild.id], (err, row) => {
                    if (!row) return message.channel.send("No welcome channel has been set for this guild.").then(m => m.delete(300 * 300));

                    client.database.run("DELETE FROM welcome WHERE guildID = ?", [message.guild.id]);
                    let welcome_disabled = new Discord.RichEmbed()
                        .setAuthor("Welcome Channel Disabled")
                        .setFooter(`${client.footer}`)
                    message.channel.send(welcome_disabled).then(m => m.delete(300 * 300));
                })
            })
        }
    }
}



