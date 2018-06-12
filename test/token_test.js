const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect()

chai.use(chaiHttp)

describe('Token test', () =>{
	it('should GET / ', function(done){
		done();
	});
	//Should LOGIN
	//Should not LOGIN
	//Get TOKEN
	//Use TOKEN
	//No re-use same token
	//should get x url with token
	//should not get y url without token
	//should not get y url with same token used before
	//generation of token
});