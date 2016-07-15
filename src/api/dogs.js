import router from 'koa-router';

const dogsRouter = router();

dogsRouter
  .prefix('/dogs')
  .get('/', get);

async function get(ctx, next) {
  ctx.body = 'Dogs';
}

export default dogsRouter;
