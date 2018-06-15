const userModel = require("./../models/Users");
const chatModel = require("./../models/Chats");
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
            clients.push(client);
            console.log('Connected: %s clients connected', clients.length)
            
            client.on('MESSAGE_SEND', (data) => {
                console.log('<%s> %s: %s',data.stream, data.username, data.content)
                let DBMessage
                let message
                if(!verifySignature(data.content, data.signature, data.userkey)) {
                    client.disconnect()
                    return
                }

                userModel
                    .findOne({ Name: data.username }) 
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
                            console.log(err)
                        }
                    })
                    .then(() => {
                        return DBMessage.save();
                    })
                    .then(() => broadcast(namespace, message))
            })
            client.on('disconnect', () => {
                clients.splice(clients.indexOf(client),1);
                console.log('Disconnected: %s sockets connected', clients.length);
            })

            client.on('end', () => {
                client.disconnect()
            })
    })
};

function broadcast(io, message) {
    io.emit("MESSAGE", message)
}