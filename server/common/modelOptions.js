import { enviroment } from '../../config/enviroment';

export default {
  underscore: true,
  schema: enviroment.dbConfig.schema || 'public',
};