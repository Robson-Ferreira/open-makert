import * as express from 'express';

import {
  getByParams,
  deleteById,
  create,
  update,
} from './OpenMarketController';

export default express
  .Router()
  .get('/', getByParams)
  .post('/', create)
  .delete('/:id', deleteById)
  .put('/:id', update);
