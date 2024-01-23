require("dotenv").config();
require("./database/index");
const routes = require("./routes");
const express = require("express");
const cors = require("cors")

const app = express();

const {PORT} = process.env;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT, () => {
	console.log(`server is on in port ${PORT}` );
});