const chalk = require('chalk');
const Logger = require("../Monitors/console-monitor.js")

module.exports = (client, message) => {




    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    if (message.content.indexOf(client.default.prefix) !== 0) return;

    const args = message.content.slice(client.default.prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;


    try {

        client.commands.get(command)(client, message, args)

    } catch (error) {

        Logger(`${message.author.tag} tried to use the command ` + chalk.green(`${command}`) + ` in ${message.guild.name} but it errored out.`, "error")

        Logger(`[ERROR]: ${error}`, "critical")

        message.reply(`[ERROR]: There was an error trying to execute that command!\n\n${error}`);

    }

    Logger(`${message.author.tag} used the command ` + chalk.green(`${command}`) + ` in ${message.guild.name}`, "cmdused")
}


