import router from 'koa-router';
import db from '../db';

const dogsRouter = router();

dogsRouter
  .prefix('/dogs')
  .get('/', get)
  .post('/', post);

async function get(ctx, next) {
  const dogs = db.get('dogs');
  ctx.body = await dogs.find();
}

async function post(ctx, next) {
  const params = ctx.request.body;

  const dogs = db.get('dogs');
  const insert = dogs.insert(params);

  ctx.body = {
    payload: params
  }
}

export default dogsRouter;
