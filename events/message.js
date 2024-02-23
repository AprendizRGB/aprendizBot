module.exports = {
    name: 'message',
    execute(message, db) {
        if (message.author.bot) return;
        if (!message.content.startsWith(PREFIX)) return;

        const args = message.content.slice(PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        const cmd = message.client.commands.get(command);
        if (!cmd) return;

        try {
            cmd.execute(message, args, db);
        } catch (error) {
            console.error(error);
            message.reply('Hubo un error al ejecutar ese comando.');
        }
    },
};