const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect()

chai.use(chaiHttp)

describe('Stream test', () =>{
	it('should GET / ', function(done){
		done();
	});
	//Write login + token save function for re-use
	//Should GET all streams
	//Should GET specific stream
	//Should GET amount of viewers
	//Should GET length of stream x
	//Should GET date of stream
	//Login as TRANSPARENT 
		//Should be able to START stream
		//Should POST on stream (check if verified too)
		//Should PAUSE for privacy (3min max... )
		//Should STOP after x minutes of inactivity
	//Login as REGULAR
		//Should NOT be able to START stream
		//Should POST on stream
		//Should GET chat messages
		
});