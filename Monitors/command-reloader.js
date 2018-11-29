
var chokidar = require('chokidar');
const { basename } = require('path');
const Logger = require("../Monitors/console-monitor.js");

chokidar.watch('./Commands/Developer', {awaitWriteFinish: true}).on('change', (file) => {


    const commandName = basename(file, '.js')
    Logger(`Command ${commandName}.js`, "commandupdating");
    delete require.cache[require.resolve(`../Commands/Developer/${commandName}.js`)];
    client.commands.delete(`../Commands/Developer/${commandName}.js`);
    let props = require(`../Commands/Developer/${commandName}.js`);
    client.commands.set(`../Commands/Developer/${commandName}.js`, props);
    if (client.commands.set(commandName, props)) {


        Logger(`${commandName}.js`, "commandupdate")

    }

});
module.exports = chokidar