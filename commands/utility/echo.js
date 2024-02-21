const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
	category: 'utility',
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Responde con tu aporte')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('La respuesta para hacer eco')
				// Asegúrese de que el texto quepa en una descripción insertada, si el usuario elige esa opción
				.setMaxLength(2_000))
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('El canal en el que hacer eco')
				// Garantiza que el usuario solo pueda seleccionar un TextChannel para la salida
				.addChannelTypes(ChannelType.GuildText))
		.addBooleanOption(option =>
			option.setName('embed')
				.setDescription('Si el eco debe ser o no embed')),
	async execute(interaction) {
		await interaction.reply(`Este comando fue ejecutado por ${interaction.user.username}, quien se unió en ${interaction.member.joinedAt}.`);
	},
};

/*const data = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Responde con tu aporte!')
	.addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back'));*/