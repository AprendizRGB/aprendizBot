module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`¡Bot iniciado como ${client.user.tag}!`);
    },
};