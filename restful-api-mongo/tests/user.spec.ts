import chai = require('chai');
import chaiHttp = require('chai-http');
import { expect } from 'chai';
import 'mocha';

chai.use(chaiHttp);

describe('User API Service', () => {
    it.skip('Should POST a new customer', (done) => {
        const testUser = {
            "firstname": "DIMAFN",
            "lastName": "DIMALN",
            "username": "DIMAUN",
            "password": "DIMAPW"
        };

        chai
        .request('http://localhost:3000')
        .post('/users/register')
        .send(testUser)
        .end((err, resp) => {
            expect(resp).to.have.status(201);
            done();
        });
    });

    it.skip('Should NOT POST a new customer if they already exist', (done) => {
        const testUser = {
            "firstname": "DIMAFN",
            "lastName": "DIMALN",
            "username": "DIMAUN",
            "password": "DIMAPW"
        };

        const expected = {msg: 'Username already Exists'};

        chai
        .request('http://localhost:3000')
        .post('/users/register')
        .send(testUser)
        .end((err, resp) => {
            expect(resp).to.have.status(403);
            done();
        });
    });

    it.skip('Should POST a login for an existing customer', (done) => {
        const testUser = {
            "username": "DIMAUN",
            "password": "DIMAPW"
        };

        chai
        .request('http://localhost:3000')
        .post('/users/login')
        .send(testUser)
        .end((err, resp) => {
            expect(resp).to.have.status(200);
            done();
        });
    });
});
