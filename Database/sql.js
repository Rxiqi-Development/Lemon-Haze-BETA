const sql = require("sqlite3");
const database = new sql.Database("./Database/lemonhaze.sqlite");
const Logger = require("../Monitors/console-monitor.js")

try {
	let djsVersion = require("../node_modules/discord.js/package.json").version;
	if (djsVersion !== '11.4.2') {
		Logger("\nOutdated Discord.JS Version\nPlease Update And Try Again!", "critical")
		process.exit(1)
	}
	let botVersion = require("../package.json").version;
	if (botVersion !== '1.0.2') {
		Logger("\nOutdated Lemon Haze BETA Version\nPlease Update From The Github And Try Again!", "critical")
		process.exit(1)
	} else {
		console.log("Initialized database connection.");
		const databaseInit = new Date();
		const tables = {
			blacklist: [
				"id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
				"userID TEXT NOT NULL",
				"moderator TEXT NOT NULL",
				"reason TEXT NOT NULL"
			],
			config: [
				"id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
				"option TEXT NOT NULL",
				"value TEXT NOT NULL",
				"guildID TEXT NOT NULL"
			],
			economy: [
				"id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
				"userID TEXT NOT NULL",
				"userName TEXT NOT NULL",
				"money INTEGER NOT NULL",
				"lastDaily TEXT NOT NULL"
			],
			register: [
				"id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
				"userID TEXT NOT NULL",
				"userName TEXT NOT NULL",
				"registered TEXT NOT NULL"
			],
			logs: [
				"id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
				"guildID TEXT NOT NULL",
				"channelID TEXT NOT NULL"
			],
			prefix: [
				"id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
				"prefix TEXT NOT NULL",
				"guildID TEXT NOT NULL"
			],
			modlog: [
				"id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
				"guildID TEXT NOT NULL",
				"whom TEXT NOT NULL",
				"moderator TEXT NOT NULL",
				"reason TEXT NOT NULL"
			],
			welcome: [
				"id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
				"guildID TEXT NOT NULL",
				"channelID TEXT NOT NULL",
				"welcome_message TEXT NOT NULL"
			],
			muted: [
				"id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
				"userID TEXT NOT NULL",
				"guildID TEXT NOT NULL"
				
			],
		};

		for (let table in tables) {
			
			database.run(`CREATE TABLE ${table} (${tables[table].join(", ")})`, () => {
				const readyTime = new Date();
				const TimeTookToLoad = Math.floor((readyTime - databaseInit) / 1000);
				console.log(`Database Took ${TimeTookToLoad} second(s) to load table ${table}.`);
			});
		}
	}
} catch (err) {
	Logger(err.stack == undefined ? err : err.stack, "critical")
}

module.exports = database;
