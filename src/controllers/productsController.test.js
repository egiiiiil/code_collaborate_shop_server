import { expect, should } from 'chai';
//var expect = require('chai').expect;
import request from 'request';
//var request = require('request');

// describe = describes the tests (wrapper)
// it = singular test
// it = contains a name for the test and a function for the actual test
// request (in this case) is like a fetch
describe('productsController', function () {
  it('Status Code 200', function (done) {
    request(
      'http://localhost:8080/api/products/',
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it('Status Code 200', function (done) {
    request(
      'http://localhost:8080/api/products/',
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });
});
