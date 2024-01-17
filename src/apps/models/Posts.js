const {Model} = require("sequelize");
const Sequelize = require("sequelize");

class Posts extends Model {
	static init(sequelize) {
		super.init(
			{
				image: Sequelize.STRING,	
				description: Sequelize.STRING,
				number_likes: Sequelize.INTEGER,
				author_id: Sequelize.INTEGER
			},
			{
				sequelize
			}
		);
		return this;
	}

	static associete(models) {
		this.belongsTo(models.Users, {foreignKey: "author_id", as: "user"});
	}
}

module.exports = Posts;