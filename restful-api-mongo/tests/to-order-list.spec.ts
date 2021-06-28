import chai = require('chai');
import chaiHttp = require('chai-http');
import { expect } from 'chai';
import 'mocha';

chai.use(chaiHttp);

describe('To-Order-List API Service', () => {
    it.skip('Should POST a new order', (done) => {
        const testOrder = {
            "name": "DIMAORder",
            "numbrOfHoles": 1,
            "savings": 12,
            "size": 3 
        }

        chai
        .request('http://localhost:3000')
        .post('/orders')
        .send(testOrder)
        .end((err, resp) => {
            expect(resp).to.have.status(200);
            done();
        });
    });

    it.skip('Should GET all orders', (done) => {
        chai
        .request('http://localhost:3000')
        .post('/orders')
        .end((err, resp) => {
            expect(resp).to.have.status(200);
            done();
        });
    });
});
