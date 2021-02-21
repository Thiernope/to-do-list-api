'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      provider: {
        type: Sequelize.STRING,
        defaultValue: "local",
      },
      roleId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      profilePicture: {
        type: Sequelize.STRING,
        defaultValue:
          "http://res.cloudinary.com/tech-strikers/image/upload/v1607003723/user_profile_pics/ai4c9mqyifpsetp48rik.png",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  }
};
