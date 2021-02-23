
module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    "Users",
    [
      {
        fullname: "Thierry",
        email: "ntirandth@gmail.com",
        username: "user1",
        password: "Mn078!!$",
        roleId: null,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Jado",
        email: "jado.ndayikeza@gmail.com",
        username: "user2",
        password: "fofo12345",
        roleId: null,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Bosco",
        email: "njeabos@gmail.com",
        username: "user3",
        password:"password2",
        roleId: null,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "user four",
        email: "user4@example.com",
        username: "user4",
        password:"password4",
        roleId: null,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
