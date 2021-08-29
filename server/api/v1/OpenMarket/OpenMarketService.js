/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/named */
import i18n from 'i18n';
import { Op } from 'sequelize';
import moment from 'moment';
import OpenMarketValidation from './OpenMarketValidation';
import NotFoundError from '../../../exceptions/NotFoundError';
import log from '../../../../log';
import { OpenMarket } from '../../../models';

export default class OpenMarketService {
  async validate(operation, data) {
    if (
      OpenMarketValidation(this.req)
      && Object.keys(OpenMarketValidation(this.req)).length > 0
      && OpenMarketValidation(this.req)[operation]
    ) {
      await OpenMarketValidation(this.req)[operation].strict().validate(data);
    }
  }

  __getConditions(query) {
    const {
      district,
      region5,
      name,
      neighborhood,
    } = query;

    const whereCondition = {};

    if (district) {
      whereCondition.district = {
        [Op.iLike]: `%${district}%`,
      };
    }

    if (region5) {
      whereCondition.region5 = {
        [Op.iLike]: `%${region5}%`,
      };
    }

    if (name) {
      whereCondition.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    if (neighborhood) {
      whereCondition.neighborhood = {
        [Op.iLike]: `%${neighborhood}%`,
      };
    }

    return whereCondition;
  }

  async getByParams(req, query) {
    const conditions = this.__getConditions(query);
    const data = await OpenMarket.findAll({
      where: conditions,
    });

    if (data.length === 0) {
      return {
        message: i18n.__('data.empty.message')
      };
    }

    log(`${JSON.stringify({
      type: 'search',
      request: JSON.stringify(req.ip),
      date: moment().format('lll'),
      query,
    })} \n\n`);

    return data;
  }

  async getById(req, id) {
    await this.validate('getById', { id });
    const data = await OpenMarket.findOne({
      where: { id },
    });

    if (data.length === 0) {
      return i18n.__('data.empty.message');
    }

    log(`${JSON.stringify({
      type: 'getById',
      request: JSON.stringify(req.ip),
      date: moment().format('lll'),
    })} \n\n`);

    return data;
  }

  async create(req) {
    const { body } = req;
    await this.validate('create', body);

    log(`${JSON.stringify({
      type: 'update',
      request: req.ip,
      body: JSON.stringify(body),
      date: moment().format('lll'),
    })} \n\n`);

    const data = await OpenMarket.create(body, {
      returning: true,
      req: this.req,
    });

    return data;
  }

  async deleteById(id, req) {
    await this.validate('delete', { id });
    const actionQuery = await OpenMarket.findOne({ where: { id } });
    if (actionQuery === null) {
      throw new NotFoundError(i18n.__('validation.data.doesnt.exist'));
    }

    log(`${JSON.stringify({
      type: 'delete',
      request: JSON.stringify(req.ip),
      deleteId: id,
      date: moment().format('lll'),
    })} \n\n`);

    return OpenMarket.destroy({
      where: { id },
      bulkQuery: [actionQuery],
      req,
      isDelete: true,
    });
  }

  async update(id, req) {
    const { body } = req;
    await this.validate('update', { ...body, id });

    const actionQuery = await OpenMarket.findOne({ where: { id } });

    if (actionQuery === null) {
      throw new NotFoundError(i18n.__('validation.data.doesnt.exist'));
    }

    log(`${JSON.stringify({
      type: 'update',
      request: JSON.stringify(req.ip),
      body: { ...body, id },
      date: moment().format('lll'),
    })} \n\n`);

    const data = await OpenMarket.update(body, {
      where: { id },
      returning: true,
      req: req,
      plain: true,
      bulkQuery: actionQuery,
    }).then((res) => res[1]);

    return data;
  }
}
