const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
//definimos el modelo /
sequelize.define('temperamento', {
	id: {
	type: DataTypes.INTEGER,
	autoIncrement: true,
	primaryKey: true,
	},
	name: {
	type: DataTypes.STRING,
	}
},{timestamps: false});
};