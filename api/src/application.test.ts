import 'mocha';
import * as libassert from 'assert';
import * as supertest from 'supertest';
import { app } from './application';

// Create test wrapper for application
const testApp = supertest(app) as supertest.SuperTest<supertest.Test>;


// Test root endpoint
describe('GET /', () => { 
    it('should return a pleasant greeting', async () => {
        await testApp.get('/')
            .expect(200)
            .expect('content-type', /json/)
            .expect({ message: 'Hello World!' });
    });
});

// Test getting Cakes
describe('GET /cakes', () => { });

// Test getting a Cake by id
describe('GET /cakes/:id', () => { });

// Test adding a Cake
describe('POST /cakes', () => { });

// Test updating a Cake
describe('PUT /cakes/:id', () => { });

// Test deleting a Cake
describe('DELETE /cakes/:id', () => { });
