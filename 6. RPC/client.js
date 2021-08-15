const net = require('net');

// const socket1 = new net.Socket({});

// socket1.connect({
//   host: '127.0.0.1',
//   port: 4000
// });

// socket1.write('good evening');


const lessonIds = [
  136797,
  136798,
  136799,
  136800
]

const socket2 = new net.Socket({});

let seq = 0;

let id = Math.floor(Math.random() * lessonIds.length);

socket2.connect({
  host: '127.0.0.1',
  port: 4001
});

socket2.write(encode(id));

socket2.on('data', buffer => {
  
  const seqBuffer = buffer.slice(0, 2);
  const titleBuffer = buffer.slice(2);

  console.log(seqBuffer.readInt16BE(), titleBuffer.toString());

  //  id = Math.floor(Math.random() * lessonIds.length);
  //  socket2.write(encode(id));
})

function encode(index) {
  let buffer = Buffer.alloc(6);
  buffer.writeInt16BE(seq);
  buffer.writeInt32BE(
    lessonIds[index], 2
  )
  console.log(seq, lessonIds[index]);
  seq++;
  return buffer;
}

// 持续发包，收到包的时间也不确定
// setInterval(function() {
//   id = Math.floor(Math.random() * lessonIds.length);
//   socket2.write(encode(id));
// }, 100)

// 同时把100个包发出去
for (let k = 0; k < 100; k++) {
  id = Math.floor(Math.random() * lessonIds.length);
  socket2.write(encode(id));
}

// 结果是只收到2个包的结果
// TCP的底层机制导致的，会自动把我们同时发的一些包拼接起来，拼成一个大包，一次性发给网络另一端
// 涉及到粘包切分逻辑