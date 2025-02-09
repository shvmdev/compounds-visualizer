"use strict";
const { Model, STRING, TEXT } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Compound extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Compound.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			imageSource: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			imageAttribute: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			dateModified: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Compound",
			tableName: "Compounds",
			timestamps: false,
		}
	);
	return Compound;
};
