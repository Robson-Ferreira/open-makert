/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/named */
import i18n from 'i18n';
import OpenMarketValidation from './OpenMarketValidation';
import NotFoundError from '../../../exceptions/NotFoundError';

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
      region,
      name,
      neighborhood,
    } = query;

    const whereCondition = {};

    if (district) {
      whereCondition.district = district;
    }

    if (region) {
      whereCondition.region5 = region;
    }

    if (name) {
      whereCondition.name = name;
    }

    if (neighborhood) {
      whereCondition.neighborhood = neighborhood;
    }

    return whereCondition;
  }

  async getByParams(query) {
    const conditions = this.__getConditions(query);
    const data = await OpenMarket.findAll({
      where: conditions,
    });
    if (data.length === 0) {
      return i18n.__('data.empty.message');
    }
    return data;
  }

  async create() {
    const { body } = this.req;
    await this.validate('create', body);

    return OpenMarket.create(body, {
      returning: true,
      req: this.req,
    });
  }

  async deleteById(id, req) {
    await this.validate('delete', { id });
    const actionQuery = await OpenMarket.findOne({ where: { id } });
    if (actionQuery === null) {
      throw new NotFoundError(i18n.__('validation.data.doesnt.exist'));
    }

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
      throw new NotFoundError(req, i18n.__('validation.data.doesnt.exist'));
    }

    return OpenMarket.update(body, {
      where: { id },
      bulkQuery: [actionQuery],
      req,
    });
  }
}
