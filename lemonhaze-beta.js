const Discord = require("discord.js");
const client = new Discord.Client({ fetchAllMembers: true });

// MONITORS
const Logger = require("./Monitors/console-monitor.js"); // Monitoring System for Console.Logs

require("./Monitors/command-reloader.js")(client); // Automated Command Reloader
require("./Monitors/event-reloader.js")(client); // Automated Event Reloader
// CONFIGURATION

client.auth = require("./Settings/authentication.json"); // Bot Token, API Keys, Etc
client.default = require("./Settings/default-options.json"); // Your bots default settings such as prefix.
client.ascii = require("./Settings/ascii-console.json");// Changable ASCII Font
client.packages = require("./package.json"); // Required to get Bot's Current Version.
client.database = require("./Database/sql.js"); // Database Setup & Functions
client.footer = `Developed By Rxiqi Development • My Default Prefix: ${client.default.prefix}`; // Footer of each Embed.

// COLLECTERS
client.commands = new Discord.Collection(); // Collecter for the commands.
client.aliases = new Discord.Collection();

client.commands.set('logs', require('./Commands/Administrator/logs.js'));// Modlog System
client.commands.set('config', require('./Commands/Administrator/config.js'));// Modlog System
client.commands.set('eval', require('./Commands/Developer/eval.js'));// Modlog System
client.commands.set('greeting', require('./Commands/Administrator/greeting.js'));// Modlog System
// ERROR CONTROLLING client.emit('guildMemberAdd',message.member)
// client.on("error", (error) => console.error(error));
// client.on("warn", (warn) => console.warn(warn));
// client.on("debug", (debug) => console.debug(debug));

//EVENTS
// *READY STATE*
client.on('ready', () => require('./Events/ready.js')(client));
// MESSAGE 
client.on('message', message => require(`./Events/message.js`)(client, message));
client.on('messageDelete', message => require('./Events/messageDelete.js')(client, message));
client.on('messageUpdate', (oldMessage, newMessage) => require('./Events/messageUpdate.js')(client, oldMessage, newMessage));

// GUILD EVENTS
client.on('guildMemberAdd', member => require('./Events/guildMemberAdd.js')(client, member));

process.on('unhandledRejection', (error) => {
    Logger("[UNHANDLED REJECTION] " + (error.stack == undefined ? error.stack : error.stack), "warn");
});

process.on('uncaughtException', (err) => {
    Logger("[UNCAUGHT EXCEPTION] " + (err.stack == undefined ? err : err.stack), "critical");
});

//LOGIN TO DISCORD
client.login(client.auth.token);
