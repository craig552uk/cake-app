import 'mocha';
import * as assert from 'assert';
import * as supertest from 'supertest';
import { Cake } from './cake.model';
import { CakeController } from './cake.controller';
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
describe('GET /cakes', () => { 

    before(async () => {
        await CakeController.createCake(new Cake({ name:'Cream Cake', comment: 'Yummyy', imageUrl: 'http://foo.com/cake1.png', yumFactor: 2 }));
        await CakeController.createCake(new Cake({ name:'Birthday Cake', comment: 'My birthday cake', imageUrl: 'http://foo.com/cake2.png', yumFactor: 4 }));
        await CakeController.createCake(new Cake({ name:'Chocolate Cake', comment: 'Super Yummy', imageUrl: 'http://foo.com/cake3.png', yumFactor: 5 }));
        await CakeController.createCake(new Cake({ name:'Lemon Drizzle', comment: 'Yummy', imageUrl: 'http://foo.com/cake4.png', yumFactor: 2 }));
        await CakeController.createCake(new Cake({ name:'Mouldy Cake', comment: 'Yukkky', imageUrl: 'http://foo.com/cake4.png', yumFactor: 1 }));
    });

    after(async () => {
        await CakeController.deleteAllCakes();
    });

    it('should return an array of all Cakes', async () => {
        await testApp.get('/cakes')
            .expect(200)
            .expect('content-type', /json/)
            .expect((res) => {
                assert.ok('cakes' in res.body);
                assert.strictEqual(res.body.cakes.length, 5);

                // Ensure response objects are well-structured
                res.body.cakes.forEach(( cake: Cake ) => {
                    assert.ok('id' in cake);
                    assert.ok('name' in cake);
                    assert.ok('comment' in cake);
                    assert.ok('imageUrl' in cake);
                    assert.ok('yumFactor' in cake);
                });
            });
    });
});

// Test getting a Cake by id
describe('GET /cakes/:id', () => { 
    let cake: any;

    before(async () => {
        cake = await CakeController.createCake(new Cake({ name:'Cream Cake', comment: 'Yummyy', imageUrl: 'http://foo.com/cake1.png', yumFactor: 2 }));
        await CakeController.createCake(new Cake({ name:'Birthday Cake', comment: 'My birthday cake', imageUrl: 'http://foo.com/cake2.png', yumFactor: 4 }));
        await CakeController.createCake(new Cake({ name:'Chocolate Cake', comment: 'Super Yummy', imageUrl: 'http://foo.com/cake3.png', yumFactor: 5 }));
        await CakeController.createCake(new Cake({ name:'Lemon Drizzle', comment: 'Yummy', imageUrl: 'http://foo.com/cake4.png', yumFactor: 2 }));
        await CakeController.createCake(new Cake({ name:'Mouldy Cake', comment: 'Yukkky', imageUrl: 'http://foo.com/cake4.png', yumFactor: 1 }));
    });

    after(async () => {
        await CakeController.deleteAllCakes();
    });

    it('should return Not Found if no Cake is found', async () => {
        await testApp.get('/cakes/99999')
        .expect(404)
        .expect('content-type', /json/)
        .expect({ error: 'Not Found' });
    });

    it('should retun one Cake by id', async () => {
        await testApp.get(`/cakes/${cake.id}`)
        .expect(200)
        .expect('content-type', /json/)
        .expect((res) => {
            assert.ok('cake' in res.body);

            assert.ok('id' in res.body.cake);
            assert.ok('name' in res.body.cake);
            assert.ok('comment' in res.body.cake);
            assert.ok('imageUrl' in res.body.cake);
            assert.ok('yumFactor' in res.body.cake);
            
            assert.strictEqual(res.body.cake.id, cake.id);
            assert.strictEqual(res.body.cake.name, cake.name);
            assert.strictEqual(res.body.cake.comment, cake.comment);
            assert.strictEqual(res.body.cake.imageUrl, cake.imageUrl);
            assert.strictEqual(res.body.cake.yumFactor, cake.yumFactor);
        });
    });
});

// Test adding a Cake
describe('POST /cakes', () => { 

    xit('should require a name', async () => {  });

    xit('should require a comment', async () => {  });

    xit('should require an image URL', async () => {  });

    xit('should require a yum factor', async () => {  });

    xit('should ensure comments are at least 5 characters long', async () => {  });

    xit('should ensure comments are at most 200 characters long', async () => {  });

    xit('should ensure cake names are unique', async () => {  });

    xit('should ensure yum factor is greater than 1', async () => {  });

    xit('should ensure yum factor is no greater than 5', async () => {  });

    xit('should add a new Cake and return it', async () => {  });
});

// Test updating a Cake
describe('PUT /cakes/:id', () => { 

    it('should return Not Found if no Cake is found', async () => {
        await testApp.put('/cakes/99999')
        .expect(404)
        .expect('content-type', /json/)
        .expect({ error: 'Not Found' });
    });

    xit('should require a name', async () => {  });

    xit('should require a comment', async () => {  });

    xit('should require an image URL', async () => {  });

    xit('should require a yum factor', async () => {  });

    xit('should ensure comments are at least 5 characters long', async () => {  });

    xit('should ensure comments are at most 200 characters long', async () => {  });

    xit('should ensure cake names are unique', async () => {  });

    xit('should ensure yum factor is greater than 1', async () => {  });

    xit('should ensure yum factor is no greater than 5', async () => {  });

    xit('should update a Cake and return it', async () => {  });
});

// Test deleting a Cake
describe('DELETE /cakes/:id', () => { 

    it('should return Not Found if no Cake is found', async () => {
        await testApp.delete('/cakes/99999')
        .expect(404)
        .expect('content-type', /json/)
        .expect({ error: 'Not Found' });
    });

    xit('should delete a Cake and return the deleted record', async () => {  });
});
