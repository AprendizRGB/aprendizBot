const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Proporciona información sobre el servidor.'),
	async execute(interaction) {
		// interacción.guild es el objeto que representa el gremio en el que se ejecutó el comando
		await interaction.reply(`Este servidor se llama:\n${interaction.guild.name}\ny tiene ${interaction.guild.memberCount} miembros.`);
	},
};