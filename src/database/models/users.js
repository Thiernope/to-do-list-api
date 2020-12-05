export default (sequelize, DataTypes) => {
    const Users = sequelize.define(
      "Users",
      {
        fullname: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        profilePicture: DataTypes.STRING,
        roleId: DataTypes.INTEGER,
        provider: DataTypes.STRING,
        isVerified: DataTypes.BOOLEAN
      }, {}
    );
  
    Users.associate = models => {}
    return Users;
  };
  