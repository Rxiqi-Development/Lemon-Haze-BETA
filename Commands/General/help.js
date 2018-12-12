const Discord = require('discord.js')

const Logger = require("../../Monitors/console-monitor.js")
module.exports = async (client, message, args) => {
    var cmd = (client.default.prefix)
   
    message.delete()
    
    let help1 = new Discord.RichEmbed()
        .setTitle("**HELP MENU**")
        .setColor("#15f153")
        .addField("**__Help Commands__**", `\u200b`)
        .addField(`**${cmd} config**`, "options:\nmodlog, \nwelcome, \nlogchannel, \ntogglelevel (true/false), \nsetwelcome (mention channel *optional welcome message*)")
        .addField(`**${cmd} info**`, "Show's information regarding Syndicate Corporation Bot.")
        .addField(`**${cmd} rank**`, "Show's Level Information. **Works on mention too** (Only works if levelling is enabled)")
        .addField(`**${cmd} warn**`, "Usage: warn <mention_user> <amount_of_warnings> <reason>")
        
        .setFooter("Help Menu", "http://2.bp.blogspot.com/-tNrXcMRf5bQ/T33uP1EH5VI/AAAAAAAAEU0/4_ZLqajaKR4/s320/help_and_support.gif")
        
    message.member.send(help1).then(() => message.channel.send("Check your DMs.").then(message => message.delete(80*80))).catch(() => Logger(`Unable to send DM to ${message.author.tag} in ${message.guild.name}, sent to server instead.`, "warn") + message.reply(help1)) //then(message => message.delete(60*60)).catch(error => message.channel.send(`${error}`));

   
    }

    //[[{"prefix":">","bot":{"id":"517539575594221568","bot":true,"username":"Immortal bot","discriminator":"1257","avatar":"8088007846cfd5d7dc8e30306dbd6e3b","lastMessageChannelID":null,"createdTimestamp":1543461450242,"defaultAvatarURL":"https://cdn.discordapp.com/embed/avatars/2.png","tag":"Immortal bot#1257","avatarURL":"https://cdn.discordapp.com/avatars/517539575594221568/8088007846cfd5d7dc8e30306dbd6e3b.webp","displayAvatarURL":"https://cdn.discordapp.com/avatars/517539575594221568/8088007846cfd5d7dc8e30306dbd6e3b.webp"},"owner":{"id":"375667241800433674","bot":false,"username":"dragonslayer23","discriminator":"6510","avatar":"f4ab86d6dd3f1f75331f0866798e3775","lastMessageChannelID":"456171707607154689","createdTimestamp":1509636450005,"defaultAvatarURL":"https://cdn.discordapp.com/embed/avatars/0.png","tag":"dragonslayer23#6510","avatarURL":"https://cdn.discordapp.com/avatars/375667241800433674/f4ab86d6dd3f1f75331f0866798e3775.webp","displayAvatarURL":"https://cdn.discordapp.com/avatars/375667241800433674/f4ab86d6dd3f1f75331f0866798e3775.webp"},"status":"Denied"}]]