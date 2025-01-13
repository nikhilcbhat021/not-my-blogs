//lib imports
import { Hono } from 'hono'


// local imports
import * as configs from './config.json';
import { authRouter } from './routes/auth.route';
import { blogRouter } from './routes/blog.route';


const app = new Hono();

// logger middleware
app.use('/', async(c, next) => {
  console.log(`Hello from - ${c.req.path}`);
  next();
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post(`/${configs.apiv1}/auth/signup`, async(c) => {
  return c.text(`Hello from - ${c.req.path}`);
})
app.post(`/${configs.apiv1}/auth/signin`, async(c) => {
  return c.text(`Hello from - ${c.req.path}`);
})


app.post(`/${configs.apiv1}/blog`, async(c) => {
  return c.text(`Hello from - ${c.req.path}`);
})
app.put(`/${configs.apiv1}/blog`, async(c) => {
  return c.text(`Hello from - ${c.req.path}`);
})
app.get(`/${configs.apiv1}/blog/:id`, async(c) => {
  return c.text(`Hello from - ${c.req.path}`);
})

export default app
