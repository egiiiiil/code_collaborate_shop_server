import { expect, should } from 'chai';
import request from 'request';

// describe = describes the tests (wrapper)
// it = singular test
// it = contains a name for the test and a function for the actual test
// request (in this case) is like a fetch

describe('productsController', function () {
	it('Status Code 200 from Server', function (done) {
		request(
			'https://skatebordslol.herokuapp.com/api/products/',
			function (error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
			}
		);
	});

	it('Find specific itemId', function (done) {
		request(
			'https://skatebordslol.herokuapp.com/api/products/62553684729c44d7ab0bd7a8',
			function (error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
			}
		);
	});

	it('Get Jart Deck Renaissance III', function (done) {
		request(
			'https://skatebordslol.herokuapp.com/api/products/62553684729c44d7ab0bd7a8',
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
	it('Check total numbers of items', function (done) {
		request(
			'https://skatebordslol.herokuapp.com/api/products/',
			function (error, response, body) {
				const { products } = JSON.parse(body);
				expect(products.length).to.equal(44);
				done();
			}
		);
	});

	it('Check type of product (truck)', function (done) {
		request(
			'https://skatebordslol.herokuapp.com/api/products/?category=truck',
			function (error, response, body) {
				const { products } = JSON.parse(body);
				const isTrucks = products.every((product) => product.type === 'truck');
				expect(isTrucks).to.equal(true);
				done();
			}
		);
	});
	it('Check type of product (skateboard)', function (done) {
		request(
			'https://skatebordslol.herokuapp.com/api/products/?category=skateboard',
			function (error, response, body) {
				const { products } = JSON.parse(body);
				const isTrucks = products.every(
					(product) => product.type === 'skateboard'
				);
				expect(isTrucks).to.equal(true);
				done();
			}
		);
	});
	it('Check type of product (wheels)', function (done) {
		request(
			'https://skatebordslol.herokuapp.com/api/products/?category=wheels',
			function (error, response, body) {
				const { products } = JSON.parse(body);
				const isTrucks = products.every((product) => product.type === 'wheels');
				expect(isTrucks).to.equal(true);
				done();
			}
		);
	});
});
