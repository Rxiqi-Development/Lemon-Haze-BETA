
const chalk = require('chalk');
const Logger = require("../Monitors/console-monitor.js")
const Discord = require('discord.js')
module.exports = (client, message) => {

    require('../Functions/levels.js')(client, message);
    //require('../Functions/captcha.js')(client, message); //Released In Next Update
    require('../Functions/deleteinvites.js')(client, message);
    ///require('../Functions/lockdown.js')(client, message); //Released In Next Update
    require('../Functions/deletelinks.js')(client, message);



    if (message.author.bot) return;




    if (message.channel.type === "dm") return;

    client.database.get(`SELECT * FROM prefix WHERE guildID = ${message.guild.id}`, (err, r) => {
       
        if (r) {
             
            if (message.content.indexOf(r.prefix) !== 0) return;

            const args = message.content.slice(r.prefix.length).trim().split(/ +/g);

            const command = args.shift().toLowerCase();

            if (!client.commands.has(command)) return;
            try {
                client.database.get(`SELECT * FROM blacklist WHERE userID = "${message.author.id}"`, (err, r) => {
                    if (err) console.log(err)
                    if (r) {
                        message.delete()
                        let blacklistEmbed = new Discord.RichEmbed()
                            .addField(`${message.author.tag}, You Have Been Globally-Blackisted For Violating The Usage Of ${client.user.username}.`, `\n\n**This is a message stating you are unable to use this bot.\n\nReason for Blacklisting: ${r.reason}\n\nIf you would to like to argue your case in respect of your blacklisting,\nPlease contact us in our support server [here](https://discord.gg/ufxFPaZ).**`)

                            .setColor("#4286f4")


                        message.channel.send(blacklistEmbed).catch(console.error).then(message => message.delete(300 * 300));
                    } else {

                        

                                client.commands.get(command)(client, message, args)
                            }
                        })
                    
               

            } catch (error) {

                Logger(`${message.author.tag} tried to use the command ` + chalk.green(`${command}`) + ` in ${message.guild.name} but it errored out.`, "error")
                Logger(`[ERROR]: ${error}`, "critical")
                message.reply(`[ERROR]: There was an error trying to execute that command!\n\n${error}`);

            }
            Logger(`${message.author.tag} used the command ` + chalk.green(`${command}`) + ` in ${message.guild.name}`, "cmdused")
        
        } else {
            if (message.content.indexOf(client.default.prefix) !== 0) return;

            const args = message.content.slice(client.default.prefix.length).trim().split(/ +/g);

            const command = args.shift().toLowerCase();

            if (!client.commands.has(command)) return;


            try {
                client.database.get(`SELECT * FROM blacklist WHERE userID = "${message.author.id}"`, (err, r) => {
                    if (err) console.log(err)
                    if (r) {
                        message.delete()
                        let blacklistEmbed = new Discord.RichEmbed()
                            .addField(`${message.author.tag}, You Have Been Globally-Blackisted For Violating The Usage Of ${client.user.username}.`, `\n\n**This is a message stating you are unable to use this bot.\n\nReason for Blacklisting: ${r.reason}\n\nIf you would to like to argue your case in respect of your blacklisting,\nPlease contact us in our support server [here](https://discord.gg/ufxFPaZ).**`)

                            .setColor("#4286f4")


                        message.channel.send(blacklistEmbed).catch(console.error).then(message => message.delete(300 * 300));
                    } else {

                        

                                client.commands.get(command)(client, message, args)
                         
                    }
                })

            } catch (error) {

                Logger(`${message.author.tag} tried to use the command ` + chalk.green(`${command}`) + ` in ${message.guild.name} but it errored out.`, "error")
                Logger(`[ERROR]: ${error}`, "critical")
                message.reply(`[ERROR]: There was an error trying to execute that command!\n\n${error}`);

            }
            Logger(`${message.author.tag} used the command ` + chalk.green(`${command}`) + ` in ${message.guild.name}`, "cmdused")
        }


    }

    )
}
