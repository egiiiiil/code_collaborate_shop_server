import { expect, should } from 'chai';
//var expect = require('chai').expect;
import request from 'request';
//var request = require('request');

it('Main page content', function (done) {
  request('http://localhost:8080', function (error, response, body) {
    expect(response).to.equal('Hello World');
    done();
  });
});
