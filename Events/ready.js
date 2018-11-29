const fs = require("fs");
const Logger = require("../Monitors/console-monitor.js");

module.exports = async (client) => {
    const lemonhazeInit = new Date();

    client.ascii.values.forEach(line => console.log(line));
    console.log(`Lemon Haze v${client.packages.version}`);

    if (client.default.debugMode) {
        const presences = [
            "IN DEBUG MODE",
            "my Developer Code | IN DEBUG MODE",
            "UPGRADING COMMANDS | IN DEBUG MODE",
            "RECODING COMMANDS | IN DEBUG MODE"
        ];

        setInterval(() => {
            let ry = Math.floor(Math.random() * presences.length)

            client.user.setActivity(presences[ry], {
                type: "WATCHING"
            });
        }, 16000);
    } else {
        const presences = [
            `${client.guilds.size} Guilds | ${client.default.prefix} help`,
            `${client.users.size} Users | ${client.default.prefix} help`
        ];

        setInterval(() => {
            const ry = Math.floor(Math.random() * presences.length);

            client.user.setActivity(presences[ry], {
                type: "WATCHING"
            });
        }, 18000);
    }


    fs.readdir('./Commands/General', (err, files) => {
        if (err) console.error(err);

        Logger(`\n${client.user.tag} has loaded with: Total General [Public Use] Commands ${files.length}, Users: ${client.users.size}, Watching: ${client.channels.size} Channels of ${client.guilds.size} guilds.`);

        files.forEach((f, i) => {
            if (f.slice(-2) !== "js") {}
        });
    });

    fs.readdir('./Commands/Music', (err, files) => {
        if (err) console.error(err);

        Logger(`\n${client.user.tag} has loaded with: Total Music Commands ${files.length}, Users: ${client.users.size}, Watching: ${client.channels.size} Channels of ${client.guilds.size} guilds.`);

        files.forEach((f, i) => {
            if (f.slice(-2) !== "js") {}
        });
    });

    fs.readdir('./Commands/Economy', (err, files) => {
        if (err) console.error(err);

        Logger(`\n${client.user.tag} has loaded with: Total Economy Commands ${files.length}, Users: ${client.users.size}, Watching: ${client.channels.size} Channels of ${client.guilds.size} guilds.`);

        files.forEach((f, i) => {
            if (f.slice(-2) !== "js") {}
        });
    });

    fs.readdir('./Commands/Economy', (err, files) => {


        if (err) console.error(err);

        Logger(`\n${client.user.tag} has loaded with: Total Moderator Commands ${files.length}, Users: ${client.users.size}, Watching: ${client.channels.size} Channels of ${client.guilds.size} guilds.`);

        files.forEach((f, i) => {
            if (f.slice(-2) !== "js") {}
        });
    });

    fs.readdir('./Commands/Administrator', (err, files) => {
        if (err) console.error(err);

        Logger(`\n${client.user.tag} has loaded with: Total Administrator Commands ${files.length}, Users: ${client.users.size}, Watching: ${client.channels.size} Channels of ${client.guilds.size} guilds.`);

        files.forEach((f, i) => {
            if (f.slice(-2) !== "js") {}
        });
    });

    fs.readdir('./Commands/Developer/', (err, files) => {
        if (err) console.error(err);

        Logger(`\n${client.user.tag} has loaded with: Total Developer Commands ${files.length}, Users: ${client.users.size}, Watching: ${client.channels.size} Channels of ${client.guilds.size} guilds.`);

        const readyTime = new Date();
        const TimeTookToLoad = Math.floor((readyTime - lemonhazeInit) / 1000);
        console.log(`${client.user.tag} Took ${TimeTookToLoad} second(s) to load everything up.`);
        if (client.guilds.size === 0) Logger(`\nhttps://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958591/`, "noguild");

        files.forEach((f, i) => {
            if (f.slice(-2) !== "js") {}
        });
    });
}
