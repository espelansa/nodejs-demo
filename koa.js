const koa = require('koa');
const koaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new koa();
const router = new koaRouter();

// Replace with DB
const things = ['My Family', 'Programming', 'Music']

let requestBody;


// Json Prettier Middleware
app.use(json())

// Body Parser Middleware
app.use(bodyParser())

// Add additional properties to context
app.context.user = 'Esc';


// Simple Middleware Example
// app.use(async ctx => (ctx.body = { msg: 'Hello world' }));

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})


// Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

// List of things
async function index(ctx) {
  await ctx.render('index', {
    title: 'Things I Love:',
    things,
    request: requestBody,
  })
}

// Show Add Page
async function showAdd(ctx) {
  await ctx.render('add')
}

// Add thing
async function add(ctx) {
  const body = ctx.request.body;
  requestBody = JSON.stringify(body);
  things.push(body.thing);
  ctx.redirect('/');
}


// Index
// router.get('/', async ctx => {
//   await ctx.render('index', {
//     title: 'Things I Love:',
//     things
//   })
// })


router.get('/test', ctx => (ctx.body = `Hello ${ctx.user}`))
router.get('/test2/:name', ctx => (ctx.body = `Hello ${ctx.params.name}`))

// Router Middleware
app
  .use(
    router.routes()
  )
  .use(
    router.allowedMethods()
  )

app.listen(3000, () => console.log('Server Started...'))