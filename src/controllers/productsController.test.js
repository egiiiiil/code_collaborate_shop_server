import { expect, should } from 'chai';
import request from 'request';

// describe = describes the tests (wrapper)
// it = singular test
// it = contains a name for the test and a function for the actual test
// request (in this case) is like a fetch

describe('productsController', function () {
  it('Status Code 200 from Server', function (done) {
    request(
      'http://localhost:8080/api/products/',
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it('Find specific itemId', function (done) {
    request(
      'http://localhost:8080/api/products/62553684729c44d7ab0bd7a8',
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it('Get Jart Deck Renaissance III', function (done) {
    request(
      'http://localhost:8080/api/products/62553684729c44d7ab0bd7a8',
      function (error, response, body) {
        const { brand, name, type } = JSON.parse(body);
        expect(response.statusCode).to.equal(200);
        expect(brand).to.equal('Jart');
        expect(type).to.equal('deck');
        expect(name).to.equal('Renaissance III');
        done();
      }
    );
  });
});

describe('Get products', function () {
  it('Status 200', function (done) {
    request(
      'http://localhost:8080/api/products/',
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it('Get object with message as response', function (done) {
    request(
      'http://localhost:8080/api/products/',
      function (error, response, body) {
        const { msg } = JSON.parse(body);
        expect(msg).to.equal('Hello World');
        done();
      }
    );
  });

  it('If items in database, return 200', function (done) {
    request(
      'http://localhost:8080/api/products/',
      function (error, response, body) {
        const {} = JSON.parse(body);
        expect(response).to.equal();
        done();
      }
    );
  });
});
