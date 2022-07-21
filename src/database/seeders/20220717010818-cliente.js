'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clientes',
      [
        {
          Email: 'silviosantos@email.com',
          Senha: "$2a$05$XYb/Ljb59dpQOVWFt6LaoO8XOuOHQFqh8Jv4gYwCNJpPrx..kUjo2",
          Saldo: 25688000.12,
        },
        {
          Email: 'fulano@email.com',
          Senha: "$2a$05$ZGx53R1I824IE6NYs05lwOgpEGe1W6gvEaVZI.cUhfikiVKhf8O0e",
          Saldo: 15484.55,
        },
        {
          Email: 'jorgin@email.com',
          Senha: "$2a$05$TPgPMDSDrG2zGaNhPBkck.W5v3xk9rJpwJgQfwMRk3a9jeUWYdV..",
          Saldo: 1481.33,
        },
        {
          Email: 'loremipsum@email.com',
          Senha: "$2a$05$KNK6HZTTZy/4b233HmKiyOyspQGv4DTtqxN0UaESH3Kv4Ie80iImK",
          Saldo: 150357.25,
        },
      ], { timestamps: false });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clientes', null, {});
  }
};
