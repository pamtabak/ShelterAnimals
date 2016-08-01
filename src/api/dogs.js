import router from 'koa-router';
import monk from 'monk';
import db from '../db';
import asyncBusboy from 'async-busboy';
import fs from 'fs';
import os from 'os';
import path from 'path';
import fse from 'fs-extra';

const dogsRouter = router();

dogsRouter
  .prefix('/dogs')
  .get('/:size', get)
  .get('/one/:_id', getOne)
  .get('/:last/:size', loadFeed)
  .put('/photo', savePhoto)
  .post('/', post);

async function get(ctx, next) {
  const dogs = db.get('dogs');
  let params = ctx.params;
  let size = parseInt(params.size);
  ctx.body = await dogs.find({}, {limit: size, sort: {_id: 1}});
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

async function getOne(ctx, next) {
  let params = ctx.params;
  let _id = params._id;
  const animals = db.get('dogs');
   _id = monk.id(_id);
  ctx.body = await animals.findOne({_id: _id});
}

async function savePhoto(ctx, next) {
  const {files, fields} = await asyncBusboy(ctx.req);
  console.log(JSON.parse(fields.data));
  let newData = JSON.parse(fields.data);
  let extension = path.extname(files[0].filename);
  let fileName = newData._id + extension;
  let tmpPath = path.join(os.tmpdir(), fileName);
  let savedPath = path.join(__dirname, '/../www/tmp/' + fileName);
  let stream = await fs.createWriteStream(tmpPath);
  files[0].pipe(stream);
  fse.move(tmpPath, savedPath, async function(err) {
    if (err) return err;
    const animals = db.get('dogs');
    let id = monk.id(newData._id);
    newData.image = '/tmp/' + fileName;
    console.log(newData);
    delete newData._id;
    let x = await animals.findOneAndUpdate({_id: id}, newData);
    ctx.body = x;
    return x;
  });

}

export default dogsRouter;
