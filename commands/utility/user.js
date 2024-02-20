const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 'utility',
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		await interaction.reply(`Este comando fue ejecutado por ${interaction.user.username}, quien se unió en ${interaction.member.joinedAt}.`);
	},
};