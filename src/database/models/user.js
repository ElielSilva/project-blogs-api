module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: {
      type:DataTypes.INTEGER,
      UNIQUE:true,
    },
    password: DataTypes.STRING,
    image: DataTypes.INTEGER,
  },
  {
    timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
    tableName: 'Users',
  });

  // Employee.associate = (models) => {
  //   Employee.hasOne(models.Address,
  //     { foreignKey: 'employeeId', as: 'addresses' });
  // };

  return User;
};