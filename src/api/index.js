import router from 'koa-router';

import dogs from './dogs';

const apiRouter = router();
apiRouter.use(
  '/api',
  dogs.routes()
);

export default apiRouter;
