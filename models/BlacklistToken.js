// models/blacklistToken.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlacklistToken = sequelize.define(
    'BlacklistToken',
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiredAt: {
        type: DataTypes.DATE,
        allowNull: true, // opsional, kalau mau otomatis hapus token yang expired
      },
    },
    {
      tableName: 'blacklist_token',
      timestamps: true,
    }
  );

  return BlacklistToken;
};
