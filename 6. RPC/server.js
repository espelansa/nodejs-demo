const net = require('net');

// const server1 = net.createServer(socket => {
//   // socket在计算机网络编程里一般代表这个网络写入和读取的代理的对象
//   socket.on('data', function(buffer) {
//     console.log(buffer, buffer.toString())
//   })
// });

// server1.listen(4000);

/**
 * server没有启动前 node client.js会报错
 * server启动后，node client.js会自动出现如下字符：
 * <Buffer 67 6f 6f 64 20 65 76 65 6e 69 6e 67> good evening
 */

const server2 = net.createServer(socket => {

  socket.on('data', function(buffer) {
    const seqBuffer = buffer.slice(0, 2); 
    const lessonId = buffer.readInt32BE(2);

    setTimeout(() => {
      const buffer = Buffer.concat([
        seqBuffer,
        Buffer.from(data[lessonId])
      ]);
      socket.write(buffer);
    }, 10 + Math.random() * 1000);
    
  })
})

server2.listen(4001);

const data = {
  136797: "01 | 课程介绍",
  136798: "02 | 内容综述",
  136799: "03 | Node.js是什么？",
  136800: "04 | Node.js可以用来做什么？"
}