const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect
const app = require('../app')
require('dotenv').config()

chai.use(chaiHttp)
let savedToken;

describe('Application running..', () =>{
	it('should GET / ', function(done){
		chai.request(app)
        .get('/')
        .end(function (err, res){
            res.should.have.status(403);
            done();
        })
	});
	it('should GET token', function(done){
        chai.request(app)
            .get('/login')
            .end(function (err, res){
                res.should.have.status(200);
                res.header.should.have.property('token');
                savedToken = res.header.token;
                console.log("TOKEN" + savedToken);
                done();
        })
	});
	it('should use token', function(done){
		chai.request(app)
			.get('/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'bearer ' + savedToken)
			.end(function (err, res){
                res.should.have.status(200);
                res.body.should.have.property("message");
                expect(res.body).to.have.property('message', "Page found");
            done();
        })
	});
	it('should NOT be allowed to use the same token', function(done){
		chai.request(app)
			.get('/cheese')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'bearer ' + savedToken)
			.end(function (err, res){
                res.should.have.status(403);
                res.body.should.have.property("message");
                expect(res.body).to.have.property('message', "Invalid token");
            done();
        })
	});
});