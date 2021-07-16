const glob = require('glob');

// 阻塞I/O调用方式
// let result = null;
// console.time('glob');
// result = glob.sync(__dirname + '/**/*'); // 目录下的所有文件都递归的获取到
// console.timeEnd('glob');
// console.log(result)
/**
 * 打印结果：
 *  glob: 11.079ms
 * ['/Users/Evyn/Documents/Torry/Rootant/nodejs-geektime-demo/4. 异步/nonblocking.js','/Users/Evyn/Documents/Torry/Rootant/nodejs-geektime-demo/4. 异步/note.md']
 */

// 非阻塞I/O调用方式
let result = null;
console.time('glob');
glob(__dirname + '/**/*', function(err, res) {
  result = res;
  console.log('got result');
})
console.timeEnd('glob');
console.log(1 + 1);
/**
 * 打印结果是：
 * glob: 1.66ms 减少了在nodejs里的等待时间
 * 2 而且在glob执行过程中也能执行其他操作
 * got result
 */