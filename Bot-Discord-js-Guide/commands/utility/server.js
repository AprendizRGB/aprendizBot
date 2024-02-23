const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 'utility',
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		await interaction.reply(`Este servidor se llama:\n${interaction.guild.name}\ny tiene ${interaction.guild.memberCount} miembros.`);
	},
};