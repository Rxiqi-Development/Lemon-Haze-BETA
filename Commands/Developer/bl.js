const Discord = require('discord.js')
module.exports = (client, message, args) => {
    if (message.author.id === client.default.owner) {
        const target = message.mentions.users.first() || client.users.get(args[0]);
        let base = message.content.split(" ").slice(2);
        let reason = base.join(' ') ? base.join(' ') : 'None Specified';
     
        if (!target) return message.channel.send("Please mention or provide Users ID").then(m => m.delete(300 * 300));
        client.database.get(`SELECT * FROM blacklist WHERE userID = ?`, target.id, (err, r) => {
            message.delete()
            if (err) return console.log(err);
            if (r) return message.channel.send(`${target} is already blacklisted for ${r.reason}.`).then(m => m.delete(300 * 300));

            client.database.run(`INSERT INTO blacklist (userID, moderator, reason) VALUES (?, ?, ?)`, target.id, message.author.tag, reason, (err) => {
                if (err) return console.log(err);
                message.delete()

                message.channel.send(`Blacklisted ${target} from using me.`).then(m => m.delete(300 * 300));



            });
        });
    }
}