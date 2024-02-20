const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Proporciona información sobre el usuario.'),
    async execute(interaction) {
        // interaction.user es el objeto que representa al usuario que ejecutó el comando
        // interaction.member es el objeto GuildMember, que representa al usuario en el gremio específico
        await interaction.reply(`Este comando fue ejecutado por ${interaction.user.username}, quien se unió en ${interaction.member.joinedAt}.`);
    },
};