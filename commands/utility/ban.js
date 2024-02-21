const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Seleccione a un miembro y dele Ban.')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('Seleccione a quien vamos a Banear.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('El motivo para el Ban.'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers, PermissionFlagsBits.Administrator)
		.setDMPermission(false),

        async execute(interaction) {
            const user = interaction.options.getUser('target');
            const reason = interaction.options.getString('reason') ?? 'No se proporcionó ninguna razón.';
    
            await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
            await interaction.guild.members.ban(user);
        },
};