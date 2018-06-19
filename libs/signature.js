const crypto = require("crypto");
const fs = require('fs');
const path = require('path');
const certs = require('x509');

const certificate = fs.readFileSync(path.join(__dirname, '../keys', 'rootCA.key'));

let keycache = []

module.exports = {
    signData: function signData(data) { // Functie om datas te signen
        if (!data) return false // Om te voorkomen dat alles vastloopt als de data leeg is

        let sign = crypto.createSign('RSA-SHA256') // De sign instantie
        sign.write(JSON.stringify(data)) // Het token wordt gesigned 
        sign.end()
        return sign.sign(certificate, 'hex') // De signature wordt teruggestuurd
    },

    verifyData: function verifyData(data, sign, pubKey, username, cb) {
        let verify = crypto.createVerify("RSA-SHA256");
        let cert
        if (keycache[username]) {
            cert = keycache[username].Certificate
        } else {
            cert = fs.readFileSync(path.join(__dirname, '../keys', pubKey)).toString();
            keycache[username] = {
                Certificate: cert
            }
        }
        try {
            if (typeof data !== "string") {
                data = JSON.stringify(data);
            }

            try {
                var pubPath = path.join(__dirname, '../keys', pubKey);
                var issuer = certs.getIssuer(pubPath);
                //issuer = issuer.toString();
                if (issuer['organizationName'] == "Circle") {
                    //issuer = issuer.toString();
                    sign = sign.toString();
                    cert = cert.toString();
                    verify.update(data);
                    let result = verify.verify(cert, sign, 'hex');
                    console.log("Verify is: " + result);
                    cb(result);
                } else {
                    cb(false);
                }
            } catch (error) {
                console.log(error);
                cb(false);
            }
        } catch (error) {
            console.log(error);
            cb(false);
        }
    }
}