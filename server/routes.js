import Router from 'express/lib/router';

import OpenMarketRoute from './api/v1/OpenMarket/OpenMarketRoute';

export default function routes(app) {
  app
    .use(
      '/api/v1',
      Router()
        .use('/open-market', OpenMarketRoute),
    );
}
