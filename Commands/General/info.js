const Discord = require('discord.js')
const moment = require("moment")
require("moment-duration-format")
let os = require('os')
let cpuStat = require("cpu-stat")
const fs = require("fs");

module.exports = (client, message) => {
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
    message.delete()
  }

  // message.guild = message.client.members.fetchMembers().then(g => g);
  const online = message.client.users.filter(m => m.presence.status === 'online' && !m.bot).size;
  const streaming = message.client.users.filter(m => m.presence.game && m.presence.game.streaming && !m.bot).size;
  const idle = message.client.users.filter(m => m.presence.status === 'idle' && !m.bot).size;
  const dnd = message.client.users.filter(m => m.presence.status === 'dnd' && !m.bot).size;
  const offline = message.client.users.filter(m => m.presence.status === 'offline' && !m.bot).size;

  const duration = moment.duration(client.uptime).format("Y [years] D [days], H [hours], m [minutes], s [seconds]");
  const ping = moment.duration(Math.round(client.ping)).format("Y [years] D [days], H [hours], m [minutes], s [seconds]");
  let cpuLol;
  cpuStat.usagePercent(function (err, percent, seconds) {
    if (err) {
      return console.log(err);
    }

    let value = `[ Invite Link ](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958591/) `;
    let contact = `[ Contact Me ](https://discord.gg/ufxFPaZ)`;
    let support = `[ Support Server ](https://discord.gg/ufxFPaZ)`;
    let website = `[ Website ](https://rxiqi-development.github.io/SyndicateCorp/index.html)`;
    let vote = `[ Vote ](https://discordbots.org/bot/518819275176148995/vote)`;
    let discordjs = `[Discord.JS v${Discord.version}](https://discord.js.org/)`
    let nodejs = `[NodeJS ${process.version}](https://nodejs.org)`
    fs.readdir('./Commands/', (err, files) => {


      
          let botembed = new Discord.RichEmbed()
            .setTitle(`**__${client.user.username}'s Statistics__**`)
            .setTimestamp()
            .setDescription(`${client.user.username} was developed for the purpose of Multi-Functionality such as Moderation, Music and much more.\nI would like to thank the following people, as it would not of been possible for ${client.user.username} to be as advanced as it is without these people.\n\n**A Big Special Thanks To**\n• **Kendra#4458** - My entire inspiration comes from her also a Main Developer of this bot\n• **ᴊʏɢᴜʏ#9535** - Helped with the fiddly stuff & Neated my coding.\n• **KingCosmic#1044** - Helped with the Leveling System`)
            .addField(`• Developer`, `\`💻\` Syndicate#4271\n\`🆔\` 485968317236903936\n\`📜\`${contact}`, true)
            .addField(`• Bot`, `\`👤\` Syndicate Corp'\n\`🆔\` ${client.user.id}\n\`🔗\`${value}`, true)
            .addField(`• Libraries  `, `${nodejs}\n${discordjs}`, true)
            .addField("Additional Information", `**
        • API Ping: ${Math.round(client.ping.toFixed(2))}ms
        • Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1073741824).toFixed(2)}GB
        • ${client.user.username} Uptime: ${duration}
        • CPU Usage:  ${percent.toFixed(2)}%
        • Total Guilds: ${client.guilds.size.toLocaleString()}
        • Total Text Channels: ${client.channels.filter(total => total.type === 'text').size.toLocaleString()}
        • Total VC Channels: ${client.channels.filter(total => total.type === 'voice').size.toLocaleString()}
        • Total Categories: ${client.channels.filter(total => total.type === 'category').size.toLocaleString()}
        • Total Voice Connections: ${client.voiceConnections.size.toLocaleString()}
        • Total Commands: ${files.length.toLocaleString()}
        • Total Humans: ${client.users.filter(u => !u.bot).size.toLocaleString()}
        • Total Bots: ${client.users.filter(u => u.bot).size.toLocaleString()}
        • Total User Statuses: 
        <:online:511639782661554253>${online.toLocaleString()} Online.
        <:offline:511639782565347360>${offline.toLocaleString()} Offline.
        <:away:511639782590382080>${idle.toLocaleString()} Idle.
        <:dnd:511639782166626326>${dnd.toLocaleString()} Do Not Disturb.
        <:streaming:511639782728794123>${streaming.toLocaleString()} Streaming.
        [ ${website} | ${vote} | ${support} ]**`, true)

            .setFooter(client.footer)
          message.channel.send(botembed)
        
        
        files.forEach(f => {
          if (f.split(".").slice(-1)[0] !== "js");
        })
      

        
      
    })
  })
}