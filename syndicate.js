const Discord = require("discord.js");
const client = new Discord.Client({ fetchAllMembers: true });

// MONITORS
const Logger = require("./Monitors/console-monitor.js"); // Monitoring System for Console.Logs

require("./Monitors/command-reloader.js")(client); // Automated Command Reloader
require("./Monitors/event-reloader.js")(client); // Automated Event Reloader



// CONFIGURATION
// var users = client.users.size.toLocaleString();
// const result = users.filter(bot => !bot.users.bot);
client.auth = require("./Settings/authentication.json"); // Bot Token, API Keys, Etc
client.default = require("./Settings/default-options.json"); // Your bots default settings such as prefix.
client.ascii = require("./Settings/ascii-console.json");// Changable ASCII Font
client.packages = require("./package.json"); // Required to get Bot's Current Version.
client.database = require("./Database/sql.js"); // Database Setup & Functions

client.footer = `Developed By Syndicate Corp • My Default Prefix: ${client.default.prefix}`; // Footer of each Embed.

const DBL = require("dblapi.js");
client.dbl = new DBL(client.auth.DBLToken, client);

client.dbl.on('posted', () => {
    console.log(`Server count of ${client.guilds.size} posted to DBL!`);
})

client.dbl.on('error', e => {
    console.log(`Oops! ${e}`);
})
// COLLECTERS
client.commands = new Discord.Collection(); // Collecter for the commands.
client.aliases = new Discord.Collection();

//ADMINISTRATOR COMMANDS
client.commands.set('config', require('./Commands/Administrator/config.js'));// Guild Configuration System
//DEVELOPER COMMANDS
client.commands.set('eval', require('./Commands/Developer/eval.js'));// Evaluate Code System
//GENERAL USE COMMANDS
client.commands.set('help', require('./Commands/General/help.js'));// Help Menu
client.commands.set('info', require('./Commands/General/info.js'));// Bot Statistics
client.commands.set('rank', require('./Commands/General/rank.js'));// Rank (Levelling System)
client.commands.set('bl', require('./Commands/Developer/bl.js'));// Blacklist (Global-Use)
client.commands.set('ubl', require('./Commands/Developer/ubl.js'));// Unblacklist (Global-Use)


// ERROR CONTROLLING 
client.on("error", (error) => console.error(error));
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
client.on('guildMemberRemove', member => require('./Events/guildMemberRemove.js')(client, member));
client.on('guildCreate', guild => require('./Events/guildCreate.js')(client, guild));
client.on('guildDelete', member => require('./Events/guildDelete.js')(client, member));
process.on('unhandledRejection', (error) => {
    Logger("[UNHANDLED REJECTION] " + (error.stack == undefined ? error.stack : error.stack), "warn");
});

process.on('uncaughtException', (err) => {
    Logger("[UNCAUGHT EXCEPTION] " + (err.stack == undefined ? err : err.stack), "critical");
});

//LOGIN TO DISCORD
client.login(client.auth.token);
