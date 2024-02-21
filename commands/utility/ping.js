const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 'utility',
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde con: Pong!'),
	async execute(interaction) {
		await interaction.reply({ content: `Pong Secreto! en ${client.ws.ping}ms`, ephemeral: true });
		await wait(2_000);
		await interaction.editReply({ content: `Pong Secreto en ${client.ws.ping}ms ¡otra vez!`, ephemeral: true });
	},
};