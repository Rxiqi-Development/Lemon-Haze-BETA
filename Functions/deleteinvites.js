module.exports = async (client, message) => {
    if(message.author.bot) return;
    if (message.member.hasPermission("ADMINISTRATOR"||"MANAGE_MESSAGES"||"KICK_MEMBERS"||"BAN_MEMBERS")) return;
    client.database.get('SELECT bool FROM deleteinvites WHERE guildID = ?', [message.guild.id], (err, row) => {
        if (!row || !row.bool) return;
        if (row.bool === "0") return;

        if (!/(?:https?:\/\/)?discord(?:app.com\/invite|.gg)\/[\w\d]+/gi.test(message.content)) return;


        return !message.deleted ? message.delete() : null;
    })
};