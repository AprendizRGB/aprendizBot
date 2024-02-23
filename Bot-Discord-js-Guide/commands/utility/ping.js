const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	category: 'utility',
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde con: Pong!'),
	async execute(interaction) {
		await interaction.reply({ content: `Pong Secreto!`, ephemeral: true });
		/*await wait(2_000);
		await interaction.editReply({ content: `Pong Secreto ¡otra vez! ${client.ws.ping()}`, ephemeral: true });*/
	},
};

// en ${client.ws.ping}ms 