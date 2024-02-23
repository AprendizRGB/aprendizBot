const Discord = require('discord.js');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const { discord_token, mongodb_uri, db_name } = require('./config.json');

const client = new Discord.Client();
const PREFIX = '!';

let db;

MongoClient.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Conexión a la base de datos establecida');
        db = client.db(db_name);

        const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`./events/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, db));
            } else {
                client.on(event.name, (...args) => event.execute(...args, db));
            }
        }

        client.commands = new Discord.Collection();
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            client.commands.set(command.name, command);
        }
    })
    .catch(error => console.error('Error al conectar a la base de datos:', error));

client.login(discord_token);