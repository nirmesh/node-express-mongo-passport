process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Product = require('../models/product');
let chai = require('chai');
let assert = require('chai').assert;
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

//Our parent block
describe('Products', () => {
beforeEach((done) => { //Before each test we empty the database
  Product.remove({}, (err) => { 
     done();		   
  });		
});
describe('Products', () => {
      it('it should GET all the products', (done) => {
        chai.request(server)
            .get('/products/get')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
     
  });
});


describe('/POST book', () => {
  it('it should not POST a product without price field', (done) => {
    let product = {
      name: "Mug",
    }
    chai.request(server)
      .post('/products/create')
      .send(product)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.errors.should.have.property('price');
        done();
      });
  });
  it('it should POST a product ', (done) => {
    let product = {
      name: "test prod5",
      price:"45"
    }
    chai.request(server)
      .post('/products/create')
      .send(product)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('product successfully added!');
        res.body.book.should.have.property('name');
        res.body.book.should.have.property('price');
        done();
      });
  });
});

});
