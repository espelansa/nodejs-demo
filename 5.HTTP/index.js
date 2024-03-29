const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const game = require('./game');

let playWon = 0;

let playerLastAction = null;
let sameCount = 0;

http.createServer(function(req, res) {
  const parsedUrl = url.parse(req.url);
  
  if (parsedUrl.pathname === '/favicon.ico') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (parsedUrl.pathname === '/game') {
    const query = querystring.parse(parsedUrl.query);
    const playerAction = query.action;

    if (playWon >= 3 || sameCount === 9) {
      res.writeHead(500);
      res.end('我再也不和你玩了！')
      return;
    }

    if (playerLastAction && playerLastAction === playerAction) {
      sameCount += 1;
    } else {
      sameCount = 0;
    }

    playerLastAction = playerAction;

    if (sameCount >=3) {
      res.writeHead(400);
      res.end('你作弊！')
      sameCount = 9;
      return;
    }

    const gameResult = game(playerAction);
    
    res.writeHead(200);
    if (gameResult == 0) {
      res.end('平局！');
    } else if (gameResult == 1) {
      playWon += 1;
      res.end('你赢了！');

    } else {
      res.end('你输了！');
    }
  }
  
  if (parsedUrl.pathname === '/') {
    fs.createReadStream(__dirname+'/index.html').pipe(res);
  }
  
}).listen(3000);