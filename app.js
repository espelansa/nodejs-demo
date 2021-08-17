const koa = require('koa');
const koaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');

const app = new koa();
const router = new koaRouter();

// Replace with DB
const things = ['My Family', 'Programming', 'Music']


// Json Prettier Middleware
app.use(json())

// Simple Middleware Example
// app.use(async ctx => (ctx.body = { msg: 'Hello world' }));

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

// Index
router.get('/', async ctx => {
  await ctx.render('index', {
    title: 'Things I Love:',
    things
  })
})


router.get('/test', ctx => (ctx.body = "Hello Test"))


// Router Middleware
app
  .use(
    router.routes()
  )
  .use(
    router.allowedMethods()
  )

app.listen(3000, () => console.log('Server Started...'))