'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categoria', 
      [
        {
        nome: "Medicamentos",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
        },
        {
          nome: "Beleza",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          nome: "Dermocosmeticos",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          nome: "Higiene",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
      ], 
      {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categoria', null, {});
  }
};
