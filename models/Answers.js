'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    static associate(models) {
      Answers.belongsTo(models.Questions, {
        foreignKey: 'id_questions',
        as: 'question'
      })
    }
  }

  Answers.init(
    {
      id_questions: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: true
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Answers',
      tableName: 'answers'
    }
  );

  return Answers;
};
