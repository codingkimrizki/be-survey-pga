'use strict'

module.exports = (sequelize, DataTypes) => {
    const Questions = sequelize.define(
        'Questions',
        {
            id_questions : {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            question_text: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            question_type: {
                type: DataTypes.ENUM("Y/N", "suggest"),
                allowNull: false,
            },  
        },
        {
            tableName: 'questions',
            timestamps: true
        }
    );

    Questions.associate = (models) => {
      Questions.hasMany(models.Answers, {
        foreignKey: 'id_questions'
        });
    };

    return Questions;
};
