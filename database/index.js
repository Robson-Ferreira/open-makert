import Sequelize from 'sequelize';
import databaseConfig from '../config/databaseConfig';
import Logger from '../server/common/Logger';

const connect = new Sequelize(databaseConfig);

try {
  connect.authenticate();
  Logger.info('Successfully connected to the database');
} catch (err) {
  Logger.error('Unable to connect to the database:', err);
}

export default connect;
