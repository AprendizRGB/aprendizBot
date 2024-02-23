const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('borrar')
		.setDescription('Borra mensajes del canal')
		.addStringOption(option =>
			option
				.setName('cantidad')
				.setDescription('Seleccione la cantidad que vamos eliminar.')
				.setRequired(true)),

        async execute(interaction) {
            const number = interaction.options.getString('cantidad') ?? 1;
    
            await interaction.reply({ content: `Se eliminó ${number} mensaje(s)`, ephemeral: true });
            await interaction.channel.bulkDelete(number, true);
        },
};