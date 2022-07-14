import { HttpRequest, InvocationContext } from '@azure/functions-prototype';
import { expect } from 'chai';
import 'mocha';
import { helloWorld } from '../../src/functions/helloWorld';

describe('helloWorld', () => {
    it('should return message with name from query', async () => {
        const request: HttpRequest = {
            headers: {},
            method: 'GET',
            params: {},
            query: {
                name: 'eric'
            },
            url: 'http://localhost:7071/api/helloWorld'
        };
        const response = await helloWorld(new InvocationContext(), request);
        expect(response.body).to.equal('Hello, Eric!');
    });

    it('should return message with name from body', async () => {
        const request: HttpRequest = {
            headers: {},
            method: 'GET',
            params: {},
            query: {},
            url: 'http://localhost:7071/api/helloWorld',
            body: 'Eric'
        };
        const response = await helloWorld(new InvocationContext(), request);
        expect(response.body).to.equal('Hello, Eric!');
    });

    it('should return message with no name', async () => {
        const request: HttpRequest = {
            headers: {},
            method: 'GET',
            params: {},
            query: {},
            url: 'http://localhost:7071/api/helloWorld'
        };
        const response = await helloWorld(new InvocationContext(), request);
        expect(response.body).to.equal('Hello, world!');
    });
})