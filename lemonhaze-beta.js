const Discord = require("discord.js");
const client = new Discord.Client({ fetchAllMembers: true });

// MONITORS
const Logger = require("./Monitors/console-monitor.js"); // Monitoring System for Console.Logs

// CONFIGURATION
client.auth = require("./Settings/authentication.json"); // Bot Token, API Keys, Etc
client.default = require("./Settings/default-options.json"); // Your bots default settings such as prefix.
client.ascii = require("./Settings/ascii-console.json");
client.packages = require("./package.json"); // Required to get Bot's Current Version.
client.database = require("./Database/sql.js"); // Database Setup & Functions
client.footer = `Developed By Rxiqi Development Team • My Prefix: ${client.default.prefix}`; // Footer of each Embed.

// COLLECTERS
client.commands = new Discord.Collection(); // Collecter for the commands.

require("./Monitors/command-reloader.js")(client);

// STATUS
client.on('ready', () => require('./Events/ready.js')(client));

// ERROR CONTROLLING
// client.on("error", (error) => console.error(error));
// client.on("warn", (warn) => console.warn(warn));
// client.on("debug", (debug) => console.debug(debug));

process.on('unhandledRejection', (error) => {
    Logger("[UNHANDLED REJECTION] " + (error.stack == undefined ? error.stack : error.stack), "warn");
});

process.on('uncaughtException', (err) => {
    Logger("[UNCAUGHT EXCEPTION] " + (err.stack == undefined ? err : err.stack), "critical");
});

//LOGIN TO DISCORD
client.login(client.auth.token);
