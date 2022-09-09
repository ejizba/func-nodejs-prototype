import { HttpRequest, InvocationContext } from '@azure/functions';
import { expect } from 'chai';
import 'mocha';
import { httpTrigger1 } from '../../src/functions/httpTrigger1';

function createTestInvocationContext(): InvocationContext {
    return new InvocationContext({
        functionName: 'testFunctionName',
        invocationId: 'testInvocationId',
        logHandler: (level, ...args) => {
            switch (level) {
                case 'error':
                    console.error(...args);
                    break;
                case 'warning':
                    console.warn(...args);
                    break;
                default:
                    console.log(...args);
            }
        }
    });
}


describe('httpTrigger1', () => {
    it('should return message with name from query', async () => {
        const request = new HttpRequest({
            method: 'GET',
            query: {
                name: 'Eric'
            },
            url: 'http://localhost:7071/api/httpTrigger1'
        });
        const response = await httpTrigger1(createTestInvocationContext(), request);
        expect(response.body).to.equal('Hello, Eric!');
    });

    it('should return message with name from body', async () => {
        const request = new HttpRequest({
            method: 'POST',
            url: 'http://localhost:7071/api/httpTrigger1',
            body: {
                string: 'Eric'
            }
        });
        const response = await httpTrigger1(createTestInvocationContext(), request);
        expect(response.body).to.equal('Hello, Eric!');
    });

    it('should return message with no name', async () => {
        const request = new HttpRequest({
            method: 'GET',
            url: 'http://localhost:7071/api/httpTrigger1'
        });
        const response = await httpTrigger1(createTestInvocationContext(), request);
        expect(response.body).to.equal('Hello, world!');
    });
})