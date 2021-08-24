import OpenMarketService from './OpenMarketService';
import Logger from '../../../common/Logger';

const getByParams = async (req, res, next) => {
  try {
    const { query } = req;
    Logger.debug(`Request -> ${JSON.stringify(req.ip)}`);
    Logger.debug(`Query -> ${JSON.stringify(query)}`);
    const action = new OpenMarketService();
    const data = await action.getByParams(req, query);
    res.json(data);
  } catch (error) {
    Logger.error(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    Logger.debug(`Request -> ${JSON.stringify(req.ip)}`);
    Logger.debug(`Search Id -> ${JSON.stringify(id)}`);
    const action = new OpenMarketService();
    const data = await action.getById(req, id);
    res.json(data);
  } catch (error) {
    Logger.error(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    Logger.debug(`Request -> ${JSON.stringify(req.ip)}`);
    Logger.debug(`Body -> ${JSON.stringify(req.body)}`);
    const action = new OpenMarketService();
    const data = await action.create(req);
    res.body = data;
    res.json(data);
  } catch (error) {
    Logger.error(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    Logger.debug(`Request -> ${JSON.stringify(req.ip)}`);
    Logger.debug(`Body -> ${JSON.stringify(req.body)}`);
    Logger.debug(`Id Updated -> ${id}`);
    const action = new OpenMarketService();
    const data = await action.update(id, req);
    res.json(data);
  } catch (error) {
    Logger.error(error);
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    Logger.debug(`Request -> ${JSON.stringify(req.ip)}`);
    Logger.debug(`Id Deleted -> ${id}`);
    const action = new OpenMarketService();
    const data = await action.deleteById(id, req);
    res.json(data);
  } catch (error) {
    Logger.error(`Error Deleted -> ${error}`);
    next(error);
  }
};

export {
  getByParams, create, deleteById, update, getById
};
