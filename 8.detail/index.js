const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');
const static = require('koa-static');
const rcpClient = require('./client');
const template = require('./template');

const app = new koa();

const detailTemplate = template(__dirname + '/template/index.html');

app.use(
  mount('/static', static(__dirname + '/source/static/'))
)

// app.use(
//   async ctx => {
//     const result = await new Promise((resolve, reject) => {
//       rcpClient.write({
//         columnid: ctx.query.columnid
//       }, function (err, data) {
//         err ? reject(err) : resolve(data);
//       })
//     })

//     ctx.status = 200;

//     ctx.body = detailTemplate(result);
//   }
// )

rcpClient.write({
  columnid: 23
}, function(err, data) {
  console.log(err, data);
})


// app.listen(4000);