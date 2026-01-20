'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    static associate(models) {
      // bisa ditambah relasi ke Question/User kalau perlu
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
