import dotenv from 'dotenv';
import Koa from 'koa';
import cors from 'koa-cors';
import api from './api';

// Load env variables ASAP
dotenv.config();
const app = new Koa();

app
  .use(api.routes())
  .use(cors());

app.listen(process.env.PORT || 8000);
