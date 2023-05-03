const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

//TODO: You need to modify this model (or create a new one to suit your needs)
class User extends Model {
  static async findUser(recordid) {
    try {
      const user = await User.findByPk(recordid);
      return user ? user : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

User.init(
  {
    // I changed the User model and introduced this to help you
    // You may leave this record id as is for your solution
    recordid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //TODO: you need to start changing the fields below to suit your needs
    firstname: {
      type: DataTypes.STRING,
      // REMOVE the 'unique' constraint if your field doesn't need it
      //unique: true,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agenum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    favorability: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    usecase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
