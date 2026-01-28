'use strict';
module.exports = (sequelize, DataTypes) => {
  const MajorStat = sequelize.define('MajorStat', {
    id_majorstat: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true, 
      type: DataTypes.INTEGER,
    },
    lastMajor: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {
    tableName: 'majorstat',
  });

  return MajorStat;
};
