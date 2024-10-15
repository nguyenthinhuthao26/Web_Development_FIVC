const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan');
app.use(morgan('combined'));

const db = require('./config/db');
db.connect();

const cors = require('cors');
app.use(cors());

app.use(express.json());

const exampleRoute = require('./routes/example.router');
app.use('/example', exampleRoute);

app.listen(port, () => {
    console.log(`My server listening on port ${port}`);
});
