require("dotenv").config();

const crypto = require("crypto");
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect()
const assert = chai.assert;
const app = require("../app");
chai.use(chaiHttp)



describe('User Authentication', () =>{
	it('Should reject unauthorized access', function(done){
        chai.request(app).get('/').end(function(error, response, body){
            assert.equal(response.status, 401);
            assert.equal(response.body.errorCode, 1402);
            done();
        });
    });
    
    it('Should deny invalid authentication attempts', function(done){
        chai.request(app).post('/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('Name', "Thijmen Boot")
        .set('Signature', "bla bla bla signature")
        .set('Token', "TOKEN12345678")
        .end(function(error, response, body) {
            assert.isNotEmpty(error);
            done();
        });
    });
    
    it('Should accept valid authentication attempts', function(done){
        this.timeout(0);
        chai.request(app).get('/login').end(function(error, response, body) {
            name = "Thijmen Boot";
            responseToken = response.headers.token;
            signature = signToken({}); 

            chai.request(app).get('/streams')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Name', "Thijmen Boot")
            .set('Signature', signature)
            .set('Token', responseToken)
            .end(function(error, response, body) {
                assert.equal(response.status, 200);
                done();
            });
        });
	});
});

const test_certificate = '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDDlnxQXMNaeADa\nZkCJLrxuwgR1gWAMh\/8Dhpb+V8K6JaEfuxk8nZ+vmblXHbVktxfOYy+xSxZVgjf1\nIj04x0xY6An14w4N0pVqMp+I\/STyMMsBqQSa0pdQe9uJ3mamiGVtz3EKqvxqbl2X\nVQEdon7cow6fA6jGvoahRmU7ERITkguAIAveZjdVpVmznKrkTsPljgOwVe6n5Vs0\nxtY4jb\/tlHz54Pt0306LnzgwkdNGb8PKc5rsQz5gtQa0aeH2+L8ROBU5\/aDrvYVj\nKUNp269HF8Ux0Kn4\/lfLqIi8Wzox9c7WLvwnHBkadKh4Vf2ZCqb4NJdj0LNyUrZI\ncNKOQdvRAgMBAAECggEBAJeZ1zW7ETjYd2DRjQhID4qSHD6wTzCnYQTsl7EBeVAr\nxp3\/ueoACzxjHQPnZShxuqQgwWDc4KzayGDbbzTJVeY7xSywF76jEWlFX98gyDhp\nlZDt30HaJaseteZBWrOOWYAqIGaybgBZF3YrTzgXMdn3EWgzv+h82YG8PM7xxl8f\no3fXH97LmatWT06g1GQrozLeBHBKKz75bwxmRF+0YTVKLA1ZIb5VgcnJoxgfD8mp\n2HSKqyd7oMyBAy66hGQEil7w09X4Gl7pSwPnDj0qSRsDMu38Q9tTSdxA9KOgq+7J\nMVO3u5XTr5PqyjH4kSJBlp9sHtlB5nxnfC55MbD0uSECgYEA5uKaviojWp++OQaV\ned0UnxJZTxm2LxpLGUnpM9aS8TnrmcVeiRRazCydUc6p8GjfTS59B\/3TqCq3yjLP\nvFvuEv1KtcL6PV8xcDk8UPfn73Sk4ynifOgwEWjvcx630gOckoIeW5JEtIHTBeSo\nW++l\/E+i0\/Q0GGaVJUfl+Vq6+5UCgYEA2Nz3RREVJqLkyTl9gV\/DGjL2LY5\/Ro6y\noPRX9f1D4vuRQVi\/h+s4a9Z1SqF5YQW7RND73fWwXSwh\/IkIL24arQckDvLgRXzn\n9FHmKb+MfLf9T2I2mG5A9Z+ymVtzvB9yKSnRZO9vs6iyF\/62\/+CX0FbapPCM5MDI\nN5SJmQlncE0CgYEAurw55WXVVD1wr1SI3pgVTpabjuM\/uxbr+FcT+q4oCFwNFkBQ\nNlQ1H39R+dFJFrzrJdRcoXMElbV\/ElVIOJKtmcQsgZdhpvNv29Ee3Gm0t7HCjkvY\n96cfAWW6jIQirgPnxYLhpLRHRyrdDp4iIMFRoSCTlBOlcrq9E\/rzoFpmcoUCgYA4\nZG1gZmrLmzxHH04FoHNJksr1WcK7BExrEl71NqC6m5RQG9XicEZBtIjXmVnI4wap\nhHaaZ1MvR1SnKLMaMlV5fQvhX0L2jt56Z\/mkDY1ouSeDxxRPWwxFUvvMaT2VQ9AZ\n6CftSV4Qp+N33eKUc0DHCm7cyTi6G291FIkbZJijWQKBgQCOs+QIRXhoZRYKCTXr\nFfd7+2InV8G\/w0gBOYxnojIkB4WEBodlWfT7fqMkJOdIppQj6iM3Z0qaN4\/JTkQY\nyS8Z01y6VuG+SQI8yAfIDNOL7Nwpea+qCwhlXuHdeOj8dihdgLfK0kApKgQCykTd\nWWmnXmZnfaHiaVSFgr+o6tNAMw==\n-----END PRIVATE KEY-----\n';
function signToken(data) { // Functie om datas te signen
    if(!data) return false // Om te voorkomen dat alles vastloopt als de data leeg is
  
    let sign = crypto.createSign('RSA-SHA256') // De sign instantie
    sign.write(JSON.stringify(data)) // Het token wordt gesigned 
    sign.end() 
    return sign.sign(test_certificate, 'hex') // De signature wordt teruggestuurd
}
