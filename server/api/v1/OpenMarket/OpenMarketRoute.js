import * as express from 'express';

import {
  getByParams,
  deleteById,
  create,
  update,
} from './OpenMarketController';

export default express
  .Router()
  .get('/get-by-params', getByParams)
  .post('/create', create)
  .delete('/delete/:id', deleteById)
  .put('/update/:id', update);
