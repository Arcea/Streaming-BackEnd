const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect()
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
                console.log(savedToken);
                done();
        })
	});
	it('should use token', function(done){
		chai.request(app)
			.get('/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'bearer ' + savedToken)
			.end(function (err, res){
				console.log(res);
                res.should.have.status(200);
                res.header.should.have.property('token');
                savedToken = res.header.token;
                console.log(savedToken);
            done();
        })
	});
	//Should not be able to get x
});