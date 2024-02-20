const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Proporciona información sobre el servidor.'),
	async execute(interaction) {
		// interacción.guild es el objeto que representa el gremio en el que se ejecutó el comando
		await interaction.reply(`Este servidor es ${interaction.guild.name} y tiene miembros ${interaction.guild.memberCount}.`);
	},
};