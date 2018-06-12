const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect()

chai.use(chaiHttp)

describe('Action test', () =>{
	it('should GET / ', function(done){
		done();
	});
	//Should login
	//Should NOT login
	//Should use token
	//Check same token 2nd time
	//Check DB on taken action (action >0 // specific action)
	//Specific date of action
	//Specific user of action
	//NOT login NO action logged
});