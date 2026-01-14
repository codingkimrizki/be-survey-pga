'use strict'

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        'Users',
        {
            id_users: {
                type: DataTypes.INTEGER, 
                autoIncrement: true, 
                primaryKey: true,
                allowNull: false
            },
            id_user_role: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            email: { 
                type: DataTypes.STRING, 
                allowNull: false,
                unique: true 
            },
            password: {
                type: DataTypes.STRING, 
                allowNull: false,
            }
        },
        {
            tableName: 'users',
            timestamps: true
        }
    );

    Users.associate = (models) => {
        Users.belongsTo(models.UserRole, {
            foreignKey: 'id_user_role'
        });
    };

    return Users;
};