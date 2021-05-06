import * as express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.json({message: 'Hello World!'});
});

const port = 1337;
const host = '0.0.0.0';

app.listen(port, host, () => {
    console.log(`Listening on http://${host}:${port}`);
});