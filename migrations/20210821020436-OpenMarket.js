'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('open_markets', { 
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		external_pk: Sequelize.INTEGER,
		name: Sequelize.STRING,
		longitude: Sequelize.STRING,
		latitude: Sequelize.STRING,
		setcens: Sequelize.STRING,
		areap: Sequelize.STRING,
		cod_dist: Sequelize.STRING,
		district: Sequelize.STRING,
		cod_sub_pref: Sequelize.STRING,
		sub_prefe: Sequelize.STRING,
		region5: Sequelize.STRING,
		region8: Sequelize.STRING,
		record: Sequelize.STRING,
		public_place: Sequelize.STRING,
		number: Sequelize.STRING,
		neighborhood: Sequelize.STRING,
		reference: Sequelize.STRING,
		created_at: Sequelize.DATE,
		updated_at: Sequelize.DATE,
	});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('coins');
  }
};
