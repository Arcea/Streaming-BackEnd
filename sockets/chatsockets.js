const userModel = require("./../models/Users");
const chatModel = require("./../models/Chats");
const streamModel = require("./../models/Streams");
const moment = require('moment')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const signData = require('../libs/signature').signData
function verifySignature(data, sign, user) {
    try {
        let verify = crypto.createVerify("RSA-SHA256");
        let cert = fs.readFileSync(path.join(__dirname, '../keys', user)).toString();
        try {
          verify.update(data);
          let result = verify.verify(cert, sign, 'hex');

          return result
        } catch (error) {
            console.log(error);
            return false
        }
      } catch (error) {
        console.log(error);
        return false
      }
}

let clients = []

module.exports = (io) => {
        const namespace = io.of('/chat/socket')

        namespace.on('connection', (client) => {
            client.join(client.handshake.query.stream)
            console.log('Connected: %s clients connected, added to room %s', clients.length, client.handshake.query.stream)
            broadcastViewerCount(namespace)
            updateStreamDb(namespace, client.handshake.query.stream)
            
            client.on('MESSAGE_SEND', (data) => {
                console.log('<%s> %s: %s',data.stream, data.username, data.content)
                let DBMessage
                let message
                const signature = data.signature
                delete data.signature
                // if(!verifySignature(JSON.stringify(data), signature, data.userkey)) {
                //     client.disconnect()
                //     return
                // }
                
                userModel
                    .findOne({ Name: data.username, PublicKey: data.userkey }) 
                    .then((foundUser, err) => {
                        if(!err && foundUser) {
                            DBMessage = new chatModel({
                                Content: data.content,
                                Date: moment().format(),
                                User: foundUser._id,
                                Stream: data.stream
                            }) 
                            message = {
                                Content: data.content,
                                Date: moment().format(),
                                User: foundUser,
                                Stream: data.stream,
                            }
                            message.Signature = signData(message)
                        } else {
                            //console.log(err)
                        }
                    })
                    .then(() => {
                        return DBMessage.save();
                    })
                    .then(() => broadcastMessage(namespace.to(data.stream), message))
            })
            client.on('disconnect', () => {
                updateStreamDb(namespace, client.handshake.query.stream, -1)
                broadcastViewerCount(namespace)
            })

            client.on('end', () => {
                client.disconnect()
            })
    })
};

function broadcastMessage(io, message) {
    io.emit("MESSAGE", message)
}

function broadcastViewerCount(io) {
    rooms = {}
    Object.keys(io.adapter.rooms).map((item) => {
        if(item.indexOf('socket') !== -1) return
        rooms[item] = io.adapter.rooms[item].length || 0
    })
    rooms.Signature = signData(rooms)
    io.emit("VIEWERS", rooms)
}

function updateStreamDb(io, stream, mut = 0) {
    const room = io.adapter.rooms[stream]
    let amount
    room===undefined?amount = 0: amount = room.length + mut
    streamModel
        .findById(stream)
        .update({Viewers: amount})
        .then(() => console.log('Database viewercount updated'))
}