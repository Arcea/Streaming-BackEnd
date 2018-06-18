let clients = []

module.exports = (io) => {
    const namespace = io.of('/streams/socket')

    namespace.on('connection', (client) => {
        //client.join(client.handshake.query.stream)
        clients.push(client)
        console.log(client)
        console.log('Connected: %s clients connected, added to room %s', clients.length, client.handshake.query.stream)

        client.on('disconnect', () => {
            clients.splice(clients.indexOf(client), 1);
        })

        client.on('end', () => {
            client.disconnect()
        })
    })
};