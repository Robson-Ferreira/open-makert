import Server from './common/ExpressServer';
import routes from './routes';
import { enviroment } from '../config/enviroment';
import loadData from '../scripts/loadData';

const { port } = enviroment.App;

export default new Server().router(routes).listen(port);

loadData();
