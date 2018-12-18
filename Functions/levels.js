const Discord = require("discord.js");
module.exports = async (client, message) => {
  
    client.database.get('SELECT * FROM toggleLevel WHERE guildID = ?', [message.guild.id], (err, row) => {

        if (err) {
            return console.log(err)
        }
        if (!row || !row.bool === "0") return;
        if (row || row.bool === "1") {



            client.database.get('SELECT * FROM xp WHERE userID = ? AND guildID = ?', [message.author.id, message.guild.id], (err, row) => {

                if (err) {
                    return console.log(err)
                }

                if (!row) {
                    client.database.run('INSERT INTO xp (userID, guildID, exp, level) VALUES (?, ?, ?, ?)', [message.author.id, message.guild.id, 1, 0]);


                }

                else {
                    if (row.exp > 25000000) return;
                    row.exp++;
                    const curLevel = Math.floor(0.5 * Math.sqrt(row.exp));
                    const curXP = row.exp;
                    if (curLevel > row.level) {
                        let xp = new Discord.RichEmbed()
                            .setTitle("🎉 LEVEL UP 🎉")
                            .setDescription(`Way To Go ${message.author.tag}`)
                            .addField("New Level", curLevel, true)
                            .addField("Current XP", `${curXP.toLocaleString()}`, true)
                            //.setFooter(`Experience to Next Level: ${Math.pow((row.level + 1) / 0.2, 2)}`)
                        client.database.run('UPDATE xp SET level = ?, exp = ? WHERE userID = ? AND guildID = ?', [curLevel, curXP, message.author.id, message.guild.id]);
                        client.database.get('SELECT * FROM levelling WHERE guildID = ?', [message.guild.id], (err, row) => {

                            if (!row) {
                                message.channel.send(xp).then(m => m.delete(100 * 100));
                            }
                            
                            if (row) {
                                const channel = message.guild.channels.find(c => c.id === row.channelID);
                                channel.send(xp)//.then(m => m.delete(100 * 100));
                            }
                        })
                    } else {
                        return client.database.run('UPDATE xp SET exp = ? WHERE userID = ? AND guildID = ?', [curXP, message.author.id, message.guild.id]);
                    }

                }
            })
        }
    })



};


