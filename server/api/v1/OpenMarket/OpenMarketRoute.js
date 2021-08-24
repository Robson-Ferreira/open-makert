import * as express from 'express';

import {
  getByParams,
  getById,
  deleteById,
  create,
  update,
} from './OpenMarketController';

export default express
  .Router()
  .get('/', getByParams)
  .get('/:id', getById)
  .post('/', create)
  .delete('/:id', deleteById)
  .put('/:id', update);
