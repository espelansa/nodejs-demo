const fs = require('fs');
const game = require('./game');
const koa = require('koa');
const mount = require('koa-mount')

let playWon = 0;

let playerLastAction = null;
let sameCount = 0;

const app = new koa();

app.use(
  mount('/favicon.ico', function (ctx) {
    ctx.status = 200;
  })
)

const gameKoa = new koa();
app.use(
  mount('/game', gameKoa)
)

// 只判断玩家胜利次数的中间件
gameKoa.use(
  async function(ctx, next) {
    if (playWon >= 3) {
      ctx.status = 500;
      ctx.body = "我不会再玩了！"
      return;
    }

    await next();

    if (ctx.playWon) {
      playWon += 1;
    }
  }
)

gameKoa.use(
  async function(ctx, next) {
    const query = ctx.query;
    const playerAction = query.action;
    if (!playerAction) {
      ctx.status = 400;
      return;
    }

    if (sameCount === 9) {
      ctx.status =  500;
      ctx.body = '我不会再玩了！';
    }

    if (playerLastAction === playerAction) {
      sameCount += 1;

      if (sameCount >= 3) {
        ctx.status = 400;
        ctx.body = '你作弊！我再也不玩了';
        sameCount = 9;
        return;
      }

    } else {
      sameCount = 0;
    }

    playerLastAction = playerAction;
    ctx.playerAction = playerAction; 
    await next();
  }
)

gameKoa.use(
  async function(ctx, next) {
    const playerAction = ctx.playerAction;
    const result = game(playerAction);

    await new Promise(resolve => {
      setTimeout(() => {
        ctx.status = 200;
        if (result === 0) {
          ctx.body = '平局';
        } else if (result === -1) {
          ctx.body = '你输了';
        } else {
          ctx.body = '你赢了';
          ctx.playWon = true;
        }

        resolve();
      })
    }, 500)
  }
)

app.use(
  mount('/', function (ctx) {
    ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8');
  })
)

app.listen(3000);

/**
 * koa核心功能
 * - 比express更极致的request/response简化
 * - 使用async function实现的中间件
 *  - 有暂停执行的能力
 *  - 在异步的情况下也符合洋葱模型
 * 
 * express更适合小型应用，koa更适合大型应用
 */