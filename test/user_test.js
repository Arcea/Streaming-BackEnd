const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect()

chai.use(chaiHttp)

describe('User test', () =>{
	it('should GET / ', function(done){
		done();
	});
	//Should Login (check token for otter tests)
	//Check certification
	//Use token with certification
	//Use same token (should not work)
	//use different token for y function
});