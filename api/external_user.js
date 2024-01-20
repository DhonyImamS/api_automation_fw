const httpCall = require('supertest');
const serverTest = httpCall('https://reqres.in/api');

function getListUser() {
    return serverTest.get(`/users?page=2`);
}


module.exports = {
    getListUser
}