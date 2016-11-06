var request = require("request"),
    assert = require('assert'),
    util = require('../util.js'),
    base_url = "http://localhost:80/user";


describe("Get all user", function () {
    it("returns the correct JSON structure ", function (done) {
        request.get(base_url, function (error, response, body) {

            var allUser = JSON.parse(body);
            var user = allUser[1];

            //create a structure to compare 
            var structure = {
                user_id: Number,
                name: '',
                email: '',
                password: '',
                lat: Number,
                lng: Number,
                sign_date: '',
                token: ''
            }
            //funcion to compare properties
            var isOk = util.hasSameProperties(structure, user);
            assert.ok(isOk, 'the structure is not equal');
            done();
        });
    });
});

describe("Add user", function () {
    it("should add user ", function (done) {
        var user = {
            name: 'ricardo',
            email: 'ricardo@',
            password: 'passwd',
            lat: -42.934104,
            lng: -22.228512
        };

        //send data to register a user, and verify if the register was ok
        request.post(base_url,
            { json: {
                'name': 'some name',
                'email': 'someemail@domain.com',
                'password': 'password',
                'lat': -42.934104,
                'lng': -22.228512
            }},
            function (err, res) {
                var response = res.body;
                //set a local variable with the user id to use in others tests
                this.userId = res.body.user_id;
                var structure = {
                    user_id: Number,
                    name: '',
                    email: '',
                    password: '',
                    lat: Number,
                    lng: Number,
                    sign_date: '',
                    token: ''
                }
                //funcion to compare properties
                var isOk = util.hasSameProperties(structure, response);
                assert.ok(isOk, 'the structure is not equal');
                done();

            });
    });
});

//TODO it's not working yet
// describe("Add a token", function () {
//     it("Should add a token to an user", function (done) {
//         var url = base_url + '/token';
//         console.log(url);
//         request.post(base_url,
//             { json: {
//                     "email": "someemail@domain.com",
//                     "token": "SomeLongToken"
//             }},
//             function (err, res) {
//                 assert.equal(200, res.statusCode);
//                 done();
//             }
//         );
//     });
// });


describe("Delete a  user", function () {
    it("should delete the user", function (done) {
        var url = base_url;
        request.delete(base_url,
        {json:{
            'email':'someemail@domain.com'
            }
        },
         function (error, response, body) {
            assert.equal(200, response.statusCode);
            done();
        });
    });
});



