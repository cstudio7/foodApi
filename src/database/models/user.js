// import db from "./index";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      username: { type: DataTypes.STRING, allowNull: true },
      role: { type: DataTypes.STRING, allowNull: true }
    },
    {}
  );
  user.associate = (models) => {
    // association goes here
  };
  return user;
};
