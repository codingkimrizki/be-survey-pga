'use strict'

module.exports = (sequelize, DataTypes) => {
    const Answers = sequelize.define(
        'Answers',
        {
            id_answers: {
                type: DataTypes.INTEGER, 
                autoIncrement: true, 
                primaryKey: true,
                allowNull: false
            },
            id_questions: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            answer_value: {
                type: DataTypes.TEXT,
                allowNull: true
            },
        },
        {
            tableName: 'users',
            timestamps: true
        }
    );

    Answers.associate = (models) => {
        Answers.belongsTo(models.Questions, {
            foreignKey: 'id_questions'
        });
    };

    return Answers;
};