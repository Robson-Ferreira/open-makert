/* eslint-disable array-callback-return */
/* eslint-disable import/named */
import xlsFile from 'read-excel-file/node';
import * as path from 'path';
import { Op } from 'sequelize';
import Logger from '../server/common/Logger';

import { OpenMarket, sequelize } from '../server/models';

const objectTransform = (arr) => {
  const [
    externalPk,
    longitude,
    latitude,
    setcens,
    areap,
    codDist,
    district,
    codSubPref,
    subPrefe,
    region5,
    region8,
    name,
    record,
    publicPlace,
    number,
    neighborhood,
    reference,
  ] = arr;

  return {
    externalPk,
    longitude,
    latitude,
    setcens,
    areap,
    codDist,
    district,
    codSubPref,
    subPrefe,
    region5,
    region8,
    name,
    record,
    publicPlace,
    number,
    neighborhood,
    reference,
  };
};

const loadData = async () => {
  const transaction = await sequelize.transaction();

  try {
    const file = path.join(__dirname, 'imports', 'DEINFO_AB_FEIRASLIVRES_2014.xlsx');
    const sheet = 'FEIRA_LIVRE';

    const data = [];

    const [openMarketValues] = await Promise.all([
      OpenMarket.findAll(),
      xlsFile(file, { sheet }).then((rows) => {
        rows.map(async (value, index) => {
          if (index !== 0) {
            data.push(objectTransform(value));
          }
        });
      }),
    ]);

    const bulkData = [];
    const bulkDelete = [];

    await Promise.all([
      data.map((d) => {
        const find = openMarketValues.find((o) => o.externalPk === d.externalPk);
        if (!find) {
          bulkData.push(d);
        }
      }),
      openMarketValues.map((o) => {
        const find = data.find((d) => o.externalPk === d.externalPk);
        if (!find) {
          bulkDelete.push(o.externalPk);
        }
      }),
    ]);

    if (data.length > 0) {
      await OpenMarket.bulkCreate(bulkData, { transaction });
    }

    if (bulkDelete.length > 0) {
      await OpenMarket.destroy({
        where: {
          externalPk: {
            [Op.in]: bulkDelete,
          },
        },
      },
      {
        transaction,
      });
    }

    await transaction.commit();
    return data;
  } catch (error) {
    Logger.error(error);
    await transaction.rollback();
  }
};

export default loadData;
