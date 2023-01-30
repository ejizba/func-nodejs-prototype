const { HttpRequest, InvocationContext } = require('@azure/functions');
const { expect } = require('chai');
require('mocha');
const { helloWorld1 } = require('../../src/functions/helloWorld1');

describe('helloWorld', () => {
    it('should return message with name from query', async () => {
        const request = new HttpRequest({
            method: 'GET',
            query: {
                name: 'Eric'
            },
            url: 'http://localhost:7071/api/helloWorld'
        });
        const response = await helloWorld1(request, new InvocationContext());
        expect(response.body).to.equal('Hello, Eric!');
    });

    it('should return message with name from body', async () => {
        const request = new HttpRequest({
            method: 'POST',
            url: 'http://localhost:7071/api/helloWorld',
            body: {
                string: 'Eric'
            }
        });
        const response = await helloWorld1(request, new InvocationContext());
        expect(response.body).to.equal('Hello, Eric!');
    });

    it('should return message with no name', async () => {
        const request = new HttpRequest({
            method: 'GET',
            url: 'http://localhost:7071/api/helloWorld'
        });
        const response = await helloWorld1(request, new InvocationContext());
        expect(response.body).to.equal('Hello, world!');
    });
})