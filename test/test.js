var request = require("request"),
    assert = require('assert'),
    server = require("../server.js"),
    util = require('./util.js'),
    base_url = "http://localhost:80/";



function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}


 describe("Test", function () {
    describe("Test if server is running", function () {
        it("returns status code 200", function (done) {
            request.get(base_url, function (error, response, body) {
                //expect(response.statusCode).toBe(200);
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });
    
    //importing tests
    importTest("Test User API", './userSpecs/user_specs');
    importTest("Test Mark API", './markSpecs/mark_specs');
    importTest("Test Case API", './caseSpecs/case_specs');
    importTest("Test Graphs API", './graphsSpecs/graphs_specs');    
});

