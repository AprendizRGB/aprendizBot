// Requerir las clases "discord.js" necesarias.
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Crea una nueva instancia de "client"
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//Cargando archivos de comando
//Adjuntar una propiedad ."commands" a su instancia de "client" para que pueda acceder a sus comandos.
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[ADVERTENCIA] Al comando en ${filePath} le falta una propiedad "datos" o "ejecutar" requerida.`);
		}
	}
}

// Cuando el "client" esté listo, ejecuta este código (solo una vez).
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

//Recibir interacciones de comando
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No se encontró ningún comando que coincida con ${interaction.commandName}.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: '¡Hubo un error al ejecutar este comando!', ephemeral: true });
		} else {
			await interaction.reply({ content: '¡Hubo un error al ejecutar este comando!', ephemeral: true });
		}
	}
});

// Inicia sesión en Discord con el token de tu cliente
client.login(token);