    // set up ========================
    var express  = require('express');
    var bodyParser = require('body-parser');    	 
    var path = require('path');
    var countries = require('country-list')();
    var exports = module.exports = {};

    var app      = express();                        // create our app express	

    // configuration =================
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(express.static(__dirname + '/main'));					// to get static content (css, js) from public folder

    // application ======================================================================

    // routes ======================================================================
    app.get('/countries', function(req, res) {
        res.status(200).json(countries.getNames()); // load country list
    	console.log("countries loaded")
    });

    
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/main/index.html')); // load the single view file (angular will handle the page changes on the front-end)
    	console.log("Cookies: ", req.cookies)
    });

    // listen (start app with node server.js) ======================================
    var server = app.listen(8080, function(){
        console.log("App listening on port 8080");
        });

    exports.closeServer = function(){
        server.close();
    };