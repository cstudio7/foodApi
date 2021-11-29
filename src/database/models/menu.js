// import db from "./index";
module.exports = (sequelize, DataTypes) => {
  const menu = sequelize.define(
    'menu',
    {
      userId: { type: DataTypes.UUID, allowNull: true },
      foodType: { type: DataTypes.STRING, allowNull: true },
      amount: { type: DataTypes.INTEGER, allowNull: true },
      image: { type: DataTypes.STRING, allowNull: true },
      location: { type: DataTypes.STRING, allowNull: true },
      available: { type: DataTypes.BOOLEAN, allowNull: true },
    },
    {}
  );
  menu.associate = (models) => {
    // association goes here
  };
  return menu;
};
