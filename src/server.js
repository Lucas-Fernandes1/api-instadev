const routes = require('./routes');
const express = require('express');
const app = express();
const {PORT} = process.env;

app.use(express.json());
app.use(routes);
app.listen(process.env.PORT, () => {
    console.log(`server is on in port ${PORT}` );
});