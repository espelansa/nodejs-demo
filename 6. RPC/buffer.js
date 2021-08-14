const buffer1 = Buffer.from('geekbang');
const buffer2 = Buffer.from([1,2,3,4]);

const buffer3 = Buffer.alloc(20); // 制定buffer生成的长度

console.log(buffer1);
console.log(buffer2);
console.log(buffer3);

/** 
 * <Buffer 67 65 65 6b 62 61 6e 67>
 * <Buffer 01 02 03 04>
 * <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
*/

buffer2.writeInt8(12, 1);
console.log(buffer2);
buffer2.writeInt16BE(512, 2);
console.log(buffer2);
buffer2.writeInt16LE(512, 2);
console.log(buffer2);

/**
 * <Buffer 01 0c 03 04>
 * <Buffer 01 0c 02 00>
 * <Buffer 01 0c 00 02>
 */

// Protocol Buffers (Google)
// protocol-buffers (专门为nodejs)