'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Produtos', 
      [
        {
          id: "10faeaa9-0caf-4c2f-903d-b418db35ccf4",
          nome: "Desodorante Antitranspirante Aerosol",
          categoriaId: 4,
          marca: "Nivea Men",
          fabricante: "NIVEA",
          sobre: "Desodorante Aerosol Nivea Invisible Black e White Power",
          preco: 10.90,
          estoque: 10,
          image: "Desodorante Antitranspirante Aerosol.webp",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "31ac0472-e7ee-4d9c-937e-2fd15ced7d51",
          nome: "Enxaguante Bucal Antisséptico",
          categoriaId: 4,
          marca: "Listerine",
          fabricante: "Johnson & Johnson",
          sobre: "Listerine Cool Mint é um antisséptico bucal que atua contra os germes que causam mau hálito, placa bacteriana e gengivite.",
          preco: 19.90,
          estoque: 25,
          image: "Enxaguante Bucal Antisséptico.webp",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "1246c5c9-8a9b-408f-8d1b-fd78d85e002c",
          nome: "Gel de Limpeza Actine",
          categoriaId: 3,
          marca: "Actine",
          fabricante: "DARROW",
          sobre: "O Novo Actine Gel de Limpeza, aliado a poderosa Vitamina C, proporciona a mais profunda higienização facial das peles oleosas e acneica.",
          preco: 74.90,
          estoque: 19,
          image: "Gel de Limpeza Actine 240g.webp",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "817c6392-3e05-40f8-b096-19f024f0df16",
          nome: "Isdin Foto Ultra Active",
          categoriaId: 3,
          marca: "Foto Ultra Isdin",
          fabricante: "ISDIN PRODUTOS FARMACÊUTICOS LTDA",
          sobre: "Ajuda a reduzir e prevenir alterações pigmentares causas pelo sol e a regular a produção de melanina graças ao DP3-Unify Complex que age sobre as principais fases da melanogênese.",
          preco: 136.90,
          estoque: 33,
          image: "Isdin Foto Ultra Active.webp",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "e66b2bd7-1ceb-4a0f-b342-36a4a01e3a0a",
          nome: "Loção Reparador Corpo e Rosto",
          categoriaId: 2,
          marca: "La Roche-Posay",
          fabricante: "LOREAL",
          sobre: "Cicaplast Baume B5 de La Roche-Posay é um creme multirreparador calmante com alto poder de hidratação e reparação da pele.",
          preco: 84.90,
          estoque: 31,
          image: "Loção Reparador Corpo e Rosto.jpg",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "0bc13faf-6dfa-4110-bfa8-a24f04150f46",
          nome: "Resfenol 20 Cápsulas",
          categoriaId: 1,
          marca: "Kley Hertz",
          fabricante: "KLEY HERTZ DISTRIBUIDORA",
          sobre: "Resfenol é destinado ao alívio da congestão nasal, coriza, febre, dor de cabeça e dores musculares presentes nos estados gripais.",
          preco: 16.90,
          estoque: 12,
          image: "Resfenol 20 Cápsulas.webp",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "6497da96-c4bf-4803-a7d7-41dfe1f084a8",
          nome: "Xarope Expec 120ml",
          categoriaId: 1,
          marca: "Legrand",
          fabricante: "LEGRAND PHARMA INDUST FARMAC LTDA",
          sobre: "Expec está indicado no tratamento sintomático da tosse (irritativa, não produtiva, espasmódica, seca) associada a várias condições respiratórias.",
          preco: 29.90,
          estoque: 42,
          image: "Xarope Expec 120ml.webp",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
      ], 
      {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Produtos', null, {});
     
  }
};
