'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', 
    { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type:Sequelize.INTEGER
      }, 
      title: {
        allowNull: false,
        type:Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type:Sequelize.STRING,
      },
      published: {
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
        type:Sequelize.DATE,
      },
      updated: {
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
        type:Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // Configuram o que deve acontecer ao atualizar ou excluir um usuário
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        // Informa que o campo é uma Foreign Key (Chave estrangeira)
        references: {
          // Informa a tabela da referência da associação
          model: 'Users',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
      }, // Chave estrangeira, referenciando o id de `Users`
    }
    });
  },

  down: async (queryInterface, Sequelize) => { 
  await queryInterface.dropTable('BlogPosts');
  }
};
