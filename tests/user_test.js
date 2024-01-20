
// const chai = require('chai');
// const expect = chai.expect;

// const expect = require('chai').expect;

const { expect } = require('chai');
const { getUser, createUser } = require('../api/user');
const { getListUser } = require('../api/external_user');

describe('Test for Endpoint User', async () => {
    it('check endpoint get user return 404 for unknown user inside system', async () => {
        const responseApi = await getUser('dhony');
        // console.log(responseApi.status);
        // console.log(responseApi.body);

        expect(responseApi.status).to.equal(404);
        expect(responseApi.body.message).to.equal('User not found');
    });

    it('check endpoint get user return 200 for registered user inside system', async () => {
        const searchUserName = 'dhony_prikitiew';

        const responseApi = await getUser(searchUserName);
        // console.log(responseApi.status);
        // console.log(responseApi.body);

        expect(responseApi.status).to.equal(200);
        expect(responseApi.body.username).to.equal(searchUserName);
    });

    it('check endpoint create user should return success', async () => {
        const dataUser = {
            "id": 0,
            "username": "dhony_prikitiew",
            "firstName": "dhony",
            "lastName": "prikitiew",
            "email": "prikitiew@gmail.com",
            "password": "1234",
            "phone": "111223344",
            "userStatus": 1
          };

        let responseApi = await createUser(dataUser);
        // console.log(responseApi.status);
        // console.log(responseApi.body);

        expect(responseApi.status).to.equal(200);

        // check bahwa user yang sudah ke create muncul ketika d search di api get user 
        responseApi = await getUser(dataUser.username);
        expect(responseApi.status).to.equal(200);
        expect(responseApi.body.username).to.equal(dataUser.username);
    });

    it.only('check endpoint get external user return 200 for registered user Tobias inside system', async () => {
        const responseApi = await getListUser();
        console.log(responseApi.status);
        console.log(responseApi.body.data);

        const listUserData = responseApi.body.data;
        
        // cara 1
        const searchData = listUserData.filter(function(el) {
            if (el.first_name === 'Tobias') {
                return true;
            }
            return false;
        });
        console.log(searchData);
        expect(searchData.length).to.not.equal(0);

        // cara 2
        let isDataFound = false;
        let counter = 0;
        while ( counter < responseApi.body.data.length && isDataFound === false) {
            if (responseApi.body.data[counter].first_name === 'Tobias') {
                isDataFound = true;
            }
            counter = counter + 1;
        }
        expect(isDataFound).to.equal(true);
    });

});

describe('Test for Endpoint User - negative case', async () => {
    it('check endpoint create user should return error when username blank', async () => {
        const dataUser = {
            "id": 0,
            "username": '',
            "firstName": "dhony",
            "lastName": "prikitiew",
            "email": "prikitiew@gmail.com",
            "password": "1234",
            "phone": "111223344",
            "userStatus": 1
          };

        let responseApi = await createUser(dataUser);
        // console.log(responseApi.status);
        // console.log(responseApi.body);

        expect(responseApi.status).to.equal(200);

        // check bahwa user yang sudah ke create muncul ketika d search di api get user 
        responseApi = await getUser(dataUser.username);
        expect(responseApi.status).to.equal(200);
        expect(responseApi.body.username).to.equal(dataUser.username);
    });
});