const Users = require("../models/Users");
const {Op} = require("sequelize");

class UserController {
	async createUser(req, res) {

		const {email, user_name} = req.body;

		const verifyUser = await Users.findOne({
			where: {
				[Op.or]: [
					{email},
					{user_name}
				]
			}
		});

		if(verifyUser) {
			return res.status(400).json( {message: "User already exists!"});
		}
        
		const user = await Users.create(req.body);
		if(!user) {
			return res.status(400).json( {message: "Failed to create user."});
		}
		return res.send({ message: "User created!" });
	}
}

module.exports = new UserController();