import dotenv from 'dotenv';
import Koa from 'koa';
import cors from 'kcors';
import api from './api';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';

// Load env variables ASAP
dotenv.config();
const app = new Koa();

app
  .use(cors())
  .use(bodyParser())
  .use(serve(__dirname + '/www'))
  .use(api.routes());

app.listen(process.env.PORT || 8000);
