/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import i18n from 'i18n';
import modelOptions from '../common/modelOptions';
import log from '../../log';

export default (sequelize, DataTypes) => {
  const columns = {
    externalPk: DataTypes.INTEGER,
    name: DataTypes.STRING,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
    setcens: DataTypes.STRING,
    areap: DataTypes.STRING,
    codDist: DataTypes.STRING,
    district: DataTypes.STRING,
    codSubPref: DataTypes.STRING,
    subPrefe: DataTypes.STRING,
    region5: DataTypes.STRING,
    region8: DataTypes.STRING,
    record: DataTypes.STRING,
    publicPlace: DataTypes.STRING,
    number: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    reference: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  };

  const OpenMarket = sequelize.define('OpenMarket', columns, modelOptions);

  OpenMarket.afterBulkCreate(() => {
    log(`${JSON.stringify({
      type: 'dataLoad',
      message: i18n.__('data.sucess.log.loaded', { date: moment().format('lll') }),
    })} \n\n`);
  });

  return OpenMarket;
};
