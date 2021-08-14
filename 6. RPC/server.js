const net = require('net');

const server = net.createServer(socket => {
  // socket在计算机网络编程里一般代表这个网络写入和读取的代理的对象
  socket.on('data', function(buffer) {
    console.log(buffer, buffer.toString())
  })
});

server.listen(4000);

/**
 * server没有启动前 node client 会报错
 * <Buffer 67 6f 6f 64 20 65 76 65 6e 69 6e 67> good evening
 */