require("dotenv").config();

const {upload} = require("./configs/multer");

const schemaValidator = require("./apps/middlewares/schemaValidator");
const AuthenticationMiddleware = require("./apps/middlewares/authentication");

const {Router} = require("express");

const FileController = require("./apps/controllers/FileController");

const UserController = require("./apps/controllers/UserController");
const userSchema = require("./schema/create.user.schema.json");

const AuthenticationController = require("./apps/controllers/AuthenticationController");
const authSchema = require("./schema/auth.schema.json");

const PostController = require("./apps/controllers/PostController");
const postSchema = require("./schema/post.schema.json");

const routes = new Router();

routes.post("/user", schemaValidator(userSchema), UserController.createUser);
routes.post("/auth", schemaValidator(authSchema), AuthenticationController.authenticate);

routes.use(AuthenticationMiddleware);

routes.get("/health", (req, res) => {
	return res.send({message: "connected with success"});
});

routes.put("/user", UserController.updateUser);
routes.delete("/user", UserController.deleteUser);

routes.get("/user-profile", UserController.userProfile);

routes.post("/post", schemaValidator(postSchema), PostController.createPost);
routes.delete("/post/:id", PostController.deletePost);
routes.put("/post/:id", PostController.updatePost);

routes.post("/upload", upload.single("image"), FileController.upload);

module.exports = routes;