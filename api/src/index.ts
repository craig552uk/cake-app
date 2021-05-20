import { app } from './application';

// Get config from environment or use local dev defaults
const HTTP_PORT = process.env.HTTP_PORT || '1337';
const HTTP_HOST = process.env.HTTP_HOTS || '0.0.0.0';

app.listen(parseInt(HTTP_PORT, 10), HTTP_HOST, () => {
    console.log(`Listening on http://${HTTP_HOST}:${HTTP_PORT}`);
});