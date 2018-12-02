const Discord = require("discord.js");
const client = new Discord.Client({ fetchAllMembers: true });

// MONITORS
const Logger = require("./Monitors/console-monitor.js"); // Monitoring System for Console.Logs

require("./Monitors/command-reloader.js")(client); // Automated Command Reloader
// CONFIGURATION
client.auth = require("./Settings/authentication.json"); // Bot Token, API Keys, Etc
client.default = require("./Settings/default-options.json"); // Your bots default settings such as prefix.
client.ascii = require("./Settings/ascii-console.json");// Changable ASCII Font
client.packages = require("./package.json"); // Required to get Bot's Current Version.
client.database = require("./Database/sql.js"); // Database Setup & Functions
client.footer = `Developed By Rxiqi Development • My Prefix: ${client.default.prefix}`; // Footer of each Embed.

// COLLECTERS
client.commands = new Discord.Collection(); // Collecter for the commands.




// ERROR CONTROLLING
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

process.on('unhandledRejection', (error) => {
    Logger("[UNHANDLED REJECTION] " + (error.stack == undefined ? error.stack : error.stack), "warn");
});

process.on('uncaughtException', (err) => {
    Logger("[UNCAUGHT EXCEPTION] " + (err.stack == undefined ? err : err.stack), "critical");
});

//LOGIN TO DISCORD
client.login(client.auth.token);
