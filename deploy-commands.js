const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Toma todas las carpetas de comandos del directorio de comandos que creaste anteriormente
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    // Toma todos los archivos de comandos del directorio de comandos que creaste anteriormente
    const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Toma la salida SlashCommandBuilder#toJSON() de los datos de cada comando para su implementación
    for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[ADVERTENCIA] Al comando en ${filePath} le falta una propiedad "datos" o "ejecutar" requerida.`);
        }
    }
}

// Construir y preparar una instancia del módulo REST
const rest = new REST().setToken(token);

// ¡y despliega tus comandos!
(async () => {
	try {
		console.log(`Se comenzó a actualizar los ${commands.length} comandos de la aplicación (/).`);

        // El método "put" se utiliza para actualizar completamente todos los comandos del gremio con el conjunto actual
        const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Los ${data.length} comandos de la aplicación (/) ¡Se recargaron correctamente!.`);
    } catch (error) {
       // Y, por supuesto, ¡asegúrate de detectar y registrar cualquier error!
        console.error(error);
    }
})();