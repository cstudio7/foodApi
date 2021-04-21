import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.status(200).send({ status: 200, message: 'Welcome to test Api!' }));
app.all('*', (req, res) => res.status(404).send({ status: 404, message: 'Page Not Found' }));

export default app;
