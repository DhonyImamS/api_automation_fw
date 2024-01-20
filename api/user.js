const httpCall = require('supertest');
const serverTest = httpCall('https://petstore.swagger.io/v2/');

function getUser(username) {
    // return serverTest.get('user/' + username);
    return serverTest.get(`user/${username}`);
}

function createUser(data) {
    return serverTest
        .post('user')
        .send(data);
}

module.exports = {
    getUser,
    createUser,
}