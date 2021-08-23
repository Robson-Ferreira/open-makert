import modelOptions from '../common/modelOptions';

export default (sequelize, DataTypes) => {
  const columns = {
    externalPk: {
      field: 'external_pk',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
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

  return OpenMarket;
};
