var request = require("request");
var app = require("../server.js")

var base_url = "http://localhost:8080/"

describe("Node Server Test", function(){

	describe("GET /", function() {
		it("returns status code 200", function() {
			request.get(base_url, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				done();
      		});
    	});
  	});	

  	describe("GET /countries", function() {
  		it("returns status code 200", function() {
			request.get(base_url, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				app.closeServer();
				done();
      		});
    	});
  	});	

});