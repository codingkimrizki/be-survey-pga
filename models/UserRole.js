'use strict'

module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    'UserRole',
    {
      id_user_role: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name_role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user'
      }
    },
    {
      tableName: 'user_role',
      timestamps: true
    }
  );

  UserRole.associate = (models) => {
    UserRole.hasMany(models.Users, {
      foreignKey: 'id_user_role'
    });
  };

  return UserRole;
};

