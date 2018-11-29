const sql = require("sqlite3");
const database = new sql.Database("./Database/lemonhaze.sqlite");
console.log("Initialized database connection.")
let databaseInit = new Date();
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
		"registered TEXT NOT NULL",

	],


}

for (let table in tables) {
	database.run(`CREATE TABLE ${table} (${tables[table].join(", ")})`, () => {
		let readyTime = new Date(), TimeTookToLoad = Math.floor((readyTime - databaseInit) / 1000);
		console.log(`Database Took ${TimeTookToLoad} second(s) to load table ${table}.`)
	});

}

module.exports = database
