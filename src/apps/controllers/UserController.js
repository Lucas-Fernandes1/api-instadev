const Users = require("../models/Users");
const {Op} = require("sequelize");

const bcryptjs = require("bcryptjs");

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

	async updateUser(req, res) {
		
		const {
			name,
			avatar,
			bio, 
			gender, 
			old_password, 
			new_password, 
			confirm_new_password
		} = req.body;

		const user = await Users.findOne({
			where: {
				id: req.userId
			}
		});
	
		if (!user) {
			return res.status(400).json({message: "User not exists"});
		}
	
		let encryptedPassword = "";
	
		if (old_password) {
			if (!await user.checkPassword(old_password)) {
				return res.status(401).json({error: "Old password does not mastch"});
			}

			if (!new_password || !confirm_new_password) {
				res.status(401).json({
					error: "We need a new_password and confirm_new_password attributes"
				});
			}

			if (new_password != confirm_new_password) {
				res.status(401).json({error: "New password and confirm does not match."});
			}

			if (new_password === old_password) {
				res.status(401).json({error: "The new password is the same as the old one"});
			}

			encryptedPassword = await bcryptjs.hash(new_password, 8);
		}

		await Users.update(
			{
				name: name || user.name,
				avatar: avatar || user.avatar,
				bio: bio || user.bio,
				gender: gender || user.gender,
				password_hash: encryptedPassword || user.password_hash
			},
			{
				where: {
					id: user.id
				}
			}
		);
		return res.status(200).json({message: "User updated!"});
	}

	async deleteUser(req, res) {
		const userToDelete = await Users.findOne({
			where: {
				id: req.userId
			}
		});

		if(!userToDelete) res.status(400).json({message: "User not exists"});

		await Users.destroy({
			where: {
				id: req.userId
			}
		});

		return res.status(200).json({message: "User deleted!"});

	}

	async userProfile(req, res) {
		const user = await Users.findOne({
			where: {
				id: req.userId,
			},
			attributes: ["id", "name", "email", "user_name", "gender", "bio", "avatar"],
		});

		if (!user) res.status(400).json({message: "User not exists!"});

		return res.status(200).json({user});
	}
}

module.exports = new UserController();