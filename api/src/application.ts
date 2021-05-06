import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import { HttpError, NotFound, InternalServerError, BadRequest } from "http-errors";

// Construct HTTP application
export const app = express();

// Assign POST parser middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Define Cake class
export class Cake {
    id: number;
    name!: string;
    comment!: string;
    imageUrl!: string;
    yumFactor!: number;

    constructor(id: number, name: string, comment: string, imageUrl: string, yumFactor: number) {

        if ( !id ) { throw new BadRequest('Cake id is required'); }
        if ( !Number.isInteger(id) ) { throw new BadRequest('Cake id must be numeric'); }

        this.id = id;
        this.setName(name);
        this.setComment(comment);
        this.setImageUrl(imageUrl);
        this.setYumFactor(yumFactor);
    }

    update(cake: Partial<Cake>): Cake {
        if( cake.name ){ this.setName(cake.name); }
        if( cake.comment ){ this.setComment(cake.comment); }
        if( cake.imageUrl ){ this.setImageUrl(cake.imageUrl); }
        if( cake.yumFactor ){ this.setYumFactor(cake.yumFactor); }
        return this;
    }

    setName(name:string) {
        if ( !name ) { throw new BadRequest('Cake name is required'); }
        if ( name.length === 0 ) { throw new BadRequest('Cake name is required'); }
        this.name = name;
    }

    setComment(comment: string) {
        if ( !comment ) { throw new BadRequest('Cake comment is required'); }
        if ( comment.length < 5 ) { throw new BadRequest('Cake comment must be greater than 5 characters'); }
        if ( comment.length > 200 ) { throw new BadRequest('Cake comment must be less than 200 characters'); }
        this.comment = comment;
    }

    setImageUrl(imageUrl: string) {
        if ( !imageUrl ) { throw new BadRequest('Cake image URL s required'); }
        this.imageUrl = imageUrl;
    }

    setYumFactor(yumFactor: number) {
        if ( !yumFactor ) { throw new BadRequest('Cake yum factor is required'); }
        if ( !Number.isInteger(yumFactor) ) { throw new BadRequest('Cake yum factor must be numeric'); }
        if ( yumFactor < 1 ) { throw new BadRequest('Cake yum factor must be between 1 and 5'); }
        if ( yumFactor > 5 ) { throw new BadRequest('Cake yum factor must be between 1 and 5'); }
        this.yumFactor = yumFactor;
    }
}

// An array of cakes
export let CAKES: Cake[] = [];

// Helper function to reset array during tests
export function clearCakes(){
    CAKES = [];
}

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.get('/cakes', (req, res, next) => { 
    res.json({ cakes: CAKES });
});

app.get('/cakes/:id', (req, res, next) => { 

    // Get Cake id from URL
    const id = parseInt(req.params.id, 10);

    // Find Cake in array
    const cake = CAKES.find( c => c.id === id );

    if(!cake) {
        throw new NotFound();
    }

    res.json({ cake });
});

app.post('/cakes', (req, res, next) => { 

    // POST data
    const id = CAKES.length;
    const name = req.body.name;
    const comment = req.body.comment;
    const imageUrl = req.body.imageUrl;
    const yumFactor = parseInt(req.body.yumFactor, 10);

    // Create a new Cake object
    const cake = new Cake(id, name, comment, imageUrl, yumFactor);

    // Save Cake in array
    CAKES.push(cake);

    res.json({ cake });
});

app.put('/cakes/:id', (req, res, next) => { 
    
    // Get Cake id from URL  
    const id = parseInt(req.params.id, 10);

    // POST data
    const name = req.body.name;
    const comment = req.body.comment;
    const imageUrl = req.body.imageUrl;
    const yumFactor = parseInt(req.body.yumFactor, 10);
    
    // Find Cake in array
    const cake = CAKES.find( c => c.id === id );

    if(!cake) {
        throw new NotFound();
    }

    // Update record
    cake.update({ name, comment, imageUrl, yumFactor });

    res.json({ cake });
});

app.delete('/cakes/:id', (req, res, next) => { 
    
    // Get Cake id from URL  
    const id = parseInt(req.params.id, 10);

    // Find Cake in array
    const cake = CAKES.find( c => c.id === id );

    if(!cake) {
        throw new NotFound();
    }

    // Delete cake from array
    CAKES.splice(id, 1);

    res.json({ cake });
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
