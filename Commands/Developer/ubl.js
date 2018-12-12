const Discord = require('discord.js')
module.exports = (client, message, args) => {
    if (message.author.id === client.default.owner) {
        const target = message.mentions.users.first() || client.users.get(args[0]).tag;
       
        if (!target) return message.channel.send("Please mention or provide Users ID").then(m => m.delete(300 * 300));
         client.database.get(`SELECT * FROM blacklist WHERE userID = ? `, target.id, (err, r) => {
            if(err) throw err;
            if(!r) return message.channel.send(`${target} is not blacklisted.`);
         client.database.run(`DELETE FROM blacklist WHERE id = ?`, r.id, (err) => {
                
                if (err) return console.log(err);
                
                message.channel.send(`Unblacklisted ${target} from using me.`).then(m => m.delete(300 * 300));
               });
        });
    }
}