const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 'utility',
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde con: Pong!'),
	async execute(interaction) {
		await interaction.reply(`Pong!`);
	},
};