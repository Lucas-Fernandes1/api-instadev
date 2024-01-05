require("dotenv").config();

const schemaValidator = require("./apps/middlewares/schemaValidator");
const userSchema = require("./schema/create.user.schema.json");

const {Router} = require("express");

const UserController = require("./apps/controllers/UserController");
const AuthenticationController = require("./apps/controllers/AuthenticationController");
const authSchema = require("./schema/auth.schema.json");

const routes = new Router();

routes.post("/user", schemaValidator(userSchema), UserController.createUser);

routes.post("/auth", schemaValidator(authSchema), AuthenticationController.authenticate);

routes.get("/health", (req, res) => {
	return res.send({message: "connected with success in port 3000!"});
});

module.exports = routes;