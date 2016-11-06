var request = require("request"),
    assert = require('assert'),
    util = require('../util.js'),
    base_url = "http://localhost:80/mark";


//get all markers
describe("Get all markers", function () {
    it("returns the correct JSON structure ", function (done) {
        request.get(base_url, function (error, response, body) {
            var allUser = JSON.parse(body);
            var user = allUser[0];

            //create a structure to compare 
            var structure = {
                case_id: Number,
                user_id: Number,
                category_id: Number,
                lat: Number,
                lng: Number,
                comments: '',
                create_date: '',
                image: '',
                address: '',
                neighborhood: '',
                name: ''
            }
            //funcion to compare properties
            var isOk = util.hasSameProperties(structure, user);
            assert.ok(isOk, 'the structure is not equal');
            done();
        });
    });

});



//testing add new marker
describe("Add markers", function () {
    it("Should add a new marker", function (done) {
        request.post(base_url,
            {
                json: {
                    "user_id": 2,
                    "category_id": 1,
                    "lat": -22.21362937070308,
                    "lng": -45.909483432769775,
                    "comments": "some commment",
                    "address": "some street, some city",
                    "neighborhood": "some neighborhood",
                    "picture": "data:image/gif;base64,R0lGODlhCQAJAMQAAAAAAP///5+LG4d3HYZ2HX5sFWtfIE9HIkpCIFVFDTczJFpIDDUwIkc2CT4wDD8yETUmBiATBiAVChoNAyMaExgOCg8DAQ8CABADAQ0AAA4BARAEBBIHB////wAAAAAAACH5BAEAAB0ALAAAAAAJAAkAAAUsYCeOZJdp3JaNWcUoCrV2FnLchyRGRt8/qwlhQBw4RJmEYFnAsCCLxqVEDQEAOw=="
            }
            },
            function (err, res) {               
                assert.ok(200, res.statusCode);
                done();
            });
    });
});


//get marker by user
describe("Get markers by user", function () {
    it("Should get markers by user", function (done) {
        var url = base_url + '/user?user_id=2';
        request.get(url ,function (err, res) {               
                assert.ok(200, res.statusCode);
                done();
            });
    });

    //will not get markers from a user that doesn't exist
    it("Shouldn't get markers by user that doesn't exist", function (done) {
        var url = base_url + '/user?user_id=23216549';
        request.get(url ,function (err, res) {               
                assert.ok(400, res.statusCode);
                done();
            });
    });

});