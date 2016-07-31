import router from 'koa-router';
import monk from 'monk';
import db from '../db';

const dogsRouter = router();

dogsRouter
  .prefix('/dogs')
  .get('/', get)
  .get('/:last/:size', loadFeed)
  .post('/', post);

async function get(ctx, next) {
  const dogs = db.get('dogs');
  ctx.body = await dogs.find({}, {limit: 4, sort: {_id: 1}});
}

async function post(ctx, next) {
  const params = ctx.request.body;

  const dogs = db.get('dogs');
  const insert = dogs.insert(params);

  ctx.body = {
    payload: params
  };
}

async function loadFeed(ctx, next) {
  let params = ctx.params;
  let last = params.last;
  let size = parseInt(params.size);
  const animals = db.get('dogs');
  let id = monk.id(last);
  ctx.body = await animals
    .find(
      {_id: {$gt: id}},
      {limit: size, sort: {_id: 1}}
    );
}

export default dogsRouter;
