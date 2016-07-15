import router from 'koa-router';
import db from '../db';

const dogsRouter = router();

dogsRouter
  .prefix('/dogs')
  .get('/', get)
  .post('/', post);

async function get(ctx, next) {
  ctx.body = 'Dogs';
}

async function post(ctx, next) {
  ctx.body = 'Dogs';

  // const dogs = db.get('dogs');
  // const insert = dogs.insert({ dog: 'cao' });
}


export default dogsRouter;
