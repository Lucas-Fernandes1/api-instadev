const Sequelize = require("sequelize");

const databaseConfig = require("../configs/db");

class DataBase {
	constructor () {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);
	}
}

module.exports = new DataBase();