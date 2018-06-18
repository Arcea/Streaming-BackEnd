const crypto = require("crypto");
const fs = require('fs');
const path = require('path');

const certificate = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDlcG7dTSo5U0Bl\nzOn0LRrLFnTS1oeNhG9mpep+vpU234i6AMxtP3lwAv3h3j+KpX0uGQySHLhDslwf\naz6lMtpyjH44okkiPDyNRiCFNM6hpH05wa5UjQAm24nYoij\/MKpNypUmKe2CED8u\ngjOuvSLkhvhXUVpRdDBBT9rPxZpuKvbX+9EdztGnNVQNYZhutzlgYRyEhilqWZRC\npl6WupCJLzbAW8lFN52cZUvSvJIw9RtrGN8jjU7qbla2iYWl8Qkqj\/bUci6pVyV3\nO7xG4IyyMdKdYkmb\/yLAtIarz9Ya2KqA4CBGQn5UmbTepAC7QLyCnJ5egwH25mqp\nsaTH3WkfAgMBAAECggEBAIX7vVIQYMrvGdkY67pCqLXWHEyPKMN0hhV8aE6xfrN3\noAF2u+pEOec2aAoBXjvZ3hsQV63vhY9K1c8nMoMIClcAQilSY8DRSk75l74SE2SD\niPk0aFhJqsAGTh4qvCQhyCH7XlPWAjOEx1CiignNu1WWl+ltwX91iURqnI3eiAsy\ngnH9X\/aiDKfYeD5bAbt\/95ul15AsXV0tSLynEorhcoojRgYo7HUuzYJ3p4+65o6b\nWuDP4yc4Cric1krTZcYnEPb1Tl5pBbvfgBHebBCiBNpEJCwMA9WoR+Iuw86fH98y\n+fLFAHYZWIHaWCA5WC\/CXe68NWXOEu0OUfj+iAcktSECgYEA\/X2RuGEmV73Pr3gG\n6vrduw75Xp\/B8WNWxQRSPSZMpAr52vq6e9gh8aMDtwX5l9Dm8nODz\/92LbnUmcve\nNPqVIETQoYL4wZC3SGYkXqJH4Mi4U\/XrNaZ7D\/UFehDZFLOD+SN\/fzeQrcA76eEG\nl0ti+Tm\/tlRGshENAqPvZg3+qi8CgYEA57Xo4Ez2efBtLlPK07lyBLf+WKdGEk3A\nPxs5rjLzGFRnDsU6pZTgaIF1C+QERM79Ep4abWq\/FLeHtGWf02sT1WDdqN4Tz3zH\nhGLqjIv8iYBNItnmZj6MEexGjuunyXLRLTxkxlyvPfjujzTAFDQKpiVjtHyYvNs5\nqbAKcNRypBECgYBoTzufe5qjkF\/d\/K4cE48aYlcLMQJFqnMSL20H7LKs7jdSfMow\nHAgbvtDQh4zlg\/kE27Pp611eA5IQl2ugsVycIrUXQSXLwRkqmZ1ts6mQPghbxF49\nfXw2XMUcLcKmWhh8dLcKSnsmhGwjGY30w\/i+RZ02EgflTk7kP0FL5YZd0QKBgQDM\n48czp\/p\/IwF4aLG+fIn88DHhdLB6ePQZGVrs1bKt\/dxPbEmKp1W0M10rkYnQynNv\n5gwaWrzydcNy2jX0vgeAtDHtI8rCu2S1hL5AX3yEncYXnjSkjoRPSO2vbWQltviO\nlovJ96UiGJ\/iU9PRSZ9tATzkGRT6UqPvj3H8CXAB8QKBgG\/ntwR4\/iwoU5ULl9yH\nwV8NFwMBoQ8oGCa8+BI7OPbXebT1KKCKY5EtQX1onJFJkEka5FSYi9waYtuR9DoR\nuL1wrxN5VKdmgfaN0PTzn9ihICW4m8LWasGAEHJ17jn9ih+d5gv4FxNcOe0aqSy8\nbpaEczDL4yCibpZn9DrRib1D\n-----END PRIVATE KEY-----\n';

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
            console.log(typeof data, data)
            if (typeof data !== "string") {
                data = JSON.stringify(data);
            }
            sign = sign.toString();
            cert = cert.toString();
            verify.update(data);
            console.log(data)
            let result = verify.verify(cert, sign, 'hex');
            console.log(result)
            cb(result);
        } catch (error) {
            console.log(error);
            cb(false);
        }
    }
}