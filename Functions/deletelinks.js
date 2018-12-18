module.exports = async (client, message) => {
   
    if (message.member.hasPermission("ADMINISTRATOR"||"MANAGE_MESSAGES"||"KICK_MEMBERS"||"BAN_MEMBERS")) return;
    client.database.get('SELECT bool FROM deletelinks WHERE guildID = ?', [message.guild.id], (err, row) => {
        if (!row || !row.bool) return;
        if (row.bool === "0") return;
        if (/^(?:https:\/\/open\.spotify\.com|spotify)([\/:])user\1([^\/]+)\1playlist\1([a-z0-9]+)/gi.test(message.content)) return;
        if (/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/gi.test(message.content)) return;
        if (/(?:https?:\/\/)?discord(?:app.com\/invite|.gg)\/[\w\d]+/gi.test(message.content)) return;
        if (/^(http[s]?:\/\/(www\.)?|ftp:\/\/(www\.)?|www\.){1}([0-9A-Za-z-\.@:%_\+~#=]+)+((\.[a-zA-Z]{2,3})+)(\/(.)*)?(\?(.)*)?/gi.test(message.content)) return !message.deleted ? message.delete() : null;
    })
};
