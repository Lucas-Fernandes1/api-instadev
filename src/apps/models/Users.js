// const Sequelize = require("sequelize");
const bcryptjs = require("bcryptjs");
const  {Model, Sequelize} = require ("sequelize");

class Users extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				user_name: Sequelize.STRING,
				email: Sequelize.STRING,
				avatar: Sequelize.STRING,
				bio: Sequelize.STRING,
				gender: Sequelize.STRING,
				password_hash: Sequelize.STRING,
				password: Sequelize.VIRTUAL
			},
			{
				sequelize,
			},
		);

		this.addHook("beforeSave", async(user) => {
			if (user.password)	 {
				user.password_hash = await bcryptjs.hash(user.password, 8); /* Hook que antes de salvar altera o campoo virtual*/
			}
		});	
		return this;
	}

	checkPassword(password) {
		return bcryptjs.compare(password, this.password_hash);
	}
}

module.exports = Users;