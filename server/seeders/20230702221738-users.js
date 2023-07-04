'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Usuarios', 
      [
        {
        id: 1,
        nome: "Joao Henrique",
        email: "johrossato@gmail.com",
        senha: "12345678",
        cpf: "12345678900",
        adm: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          nome: "Larissa",
          email: "larissa@gmail.com",
          senha: "12345678",
          cpf: "12345678900",
          adm: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
      ], 
      {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Usuarios', null, {});
     
  }
};
