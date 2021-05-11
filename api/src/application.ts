import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import { HttpError, NotFound, InternalServerError } from 'http-errors';
import { Cake } from './cake.model';
import { CakeController } from './cake.controller';

// Construct HTTP application
export const app = express();

// Assign POST parser middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Log HTTP requests
app.use((req, res, next) => {
    function requestLogger() {
        res.removeListener('finish', requestLogger);
        res.removeListener('close', requestLogger);
        console.log(`${res.statusCode} ${req.method} ${req.url}`);
    }
    res.on('finish', requestLogger);
    res.on('close', requestLogger);
    next();
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

// GET /cakes
app.get('/cakes', async (req, res, next) => { 
    try {
        let cakes = await CakeController.getAllCakes();
        res.json({ cakes });
    } catch (e) { next(e); }
});

// GET /cakes/:id
app.get('/cakes/:id', async (req, res, next) => { 
    try {
        // Get Cake id from URL  
        const id = parseInt(req.params.id, 10);

        // Attempt to get record
        let cake = await CakeController.getOneCake(id);

        res.json({ cake });
    } catch (e) { next(e); }
});

// POST /cakes
app.post('/cakes', async (req, res, next) => { 
    try {
        // POST data
        const name = req.body.name;
        const comment = req.body.comment;
        const imageUrl = req.body.imageUrl;
        const yumFactor = parseInt(req.body.yumFactor, 10);

        // Create a new Cake
        let cake = await CakeController.createCake(new Cake({ name, comment, imageUrl, yumFactor }))

        res.json({ cake });
    } catch (e) { next(e); }
});

// PUT /cakes/:id
app.put('/cakes/:id', async (req, res, next) => { 
    try {
        // Get Cake id from URL  
        const id = parseInt(req.params.id, 10);

        // Attempt to get record
        let cakeOld = await CakeController.getOneCake(id);

        // Update with POST data
        if ( 'name' in req.body ) { cakeOld.name = req.body.name; }
        if ( 'comment' in req.body ) { cakeOld.comment = req.body.comment; }
        if ( 'imageUrl' in req.body ) { cakeOld.imageUrl = req.body.imageUrl; }
        if ( 'yumFactor' in req.body ) { cakeOld.yumFactor = parseInt(req.body.yumFactor, 10); }
        
        // Update the Cake
        let cakeNew = await CakeController.updateCake(cakeOld);

        res.json({ cake: cakeNew });
    } catch (e) { next(e); }
});

// DELETE /cakes/:id
app.delete('/cakes/:id', async (req, res, next) => { 
    try {
        // Get Cake id from URL  
        const id = parseInt(req.params.id, 10);

        // Attempt to get record
        let cake = await CakeController.getOneCake(id);

        // Delete the Cake
        await CakeController.deleteCake(cake);

        res.json({ cake });
    } catch (e) { next(e); }
});


// 404 Not Found
// If no previous route handler has matched the request, this one is called
app.use(() => {
    throw new NotFound();
});

// Error handler
// This catches any error thrown in the aplication
// If the error is an HttpError, it is used in the response
// For all other errors, the error is logged and an Internal Server Error is returned
app.use((err: any, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof HttpError) {
        // Respond with thrown HTTP Errors
        res.status(err.statusCode);
        res.json({ error: err.message });
    } else {
        // Log other Errors and respond with Internal Server Error
        console.error(err);
        const ise = new InternalServerError();
        res.status(ise.statusCode);
        res.json({ error: ise.message });
    }
});
