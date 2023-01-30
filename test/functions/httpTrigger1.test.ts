import { HttpRequest, InvocationContext } from '@azure/functions';
import { expect } from 'chai';
import 'mocha';
import { httpTrigger1 } from '../../src/functions/httpTrigger1';

describe('httpTrigger1', () => {
    it('should return message with name from query', async () => {
        const request = new HttpRequest({
            method: 'GET',
            query: {
                name: 'Eric',
            },
            url: 'http://localhost:7071/api/httpTrigger1',
        });
        const response = await httpTrigger1(request, new InvocationContext());
        expect(response.body).to.equal('Hello, Eric!');
    });

    it('should return message with name from body', async () => {
        const request = new HttpRequest({
            method: 'POST',
            url: 'http://localhost:7071/api/httpTrigger1',
            body: {
                string: 'Eric',
            },
        });
        const response = await httpTrigger1(request, new InvocationContext());
        expect(response.body).to.equal('Hello, Eric!');
    });

    it('should return message with no name', async () => {
        const request = new HttpRequest({
            method: 'GET',
            url: 'http://localhost:7071/api/httpTrigger1',
        });
        const response = await httpTrigger1(request, new InvocationContext());
        expect(response.body).to.equal('Hello, world!');
    });
});
