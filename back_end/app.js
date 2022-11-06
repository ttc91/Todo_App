const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./config/db/index')
const router = require('./src/routes/index')

app.use(bodyParser.json());
app.use(morgan('tiny'));

router.routes(app);

const port = 3000;

db.connect();

app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`)
});
