import { app } from './application';

const port = 1337;
const host = '0.0.0.0';

app.listen(port, host, () => {
    console.log(`Listening on http://${host}:${port}`);
});