const Discord = require('discord.js');

module.exports = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    if (!args[0]) return message.channel.send("Please use this format: setprefix <your_chosen_prefix>").then(() => message.delete(300 * 300));
    client.database.get("SELECT * FROM prefix WHERE guildID = ?", message.guild.id, (err, row) => {
        if (row) {
            if (err) throw err;

            message.channel.send(`\n\`Custom Prefix Is Already Set To\`: ${row.prefix}`).then(() => message.delete(300 * 300));
        }

        if (!row) {
            client.database.get("INSERT INTO prefix (guildID, prefix) VALUES (?, ?)", [message.guild.id, args[0]], (err, row) => {
                if (err) throw err;

                message.channel.send(`\n\`Custom Prefix Set To\`: ${args[0]}`).then(() => message.delete(300 * 300));

            });
        } else { message.channel.send("Please use this format: setprefix <your_chosen_prefix>").then(() => message.delete(300 * 300)); }
    })
}