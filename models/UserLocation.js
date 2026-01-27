'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLocation = sequelize.define('UserLocation', {
    id_location: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true, 
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    location_source: {
      type: DataTypes.ENUM('gps', 'ip'),
      allowNull: true,
    },
  }, {
    tableName: 'user_location',
  });

  return UserLocation;
};
