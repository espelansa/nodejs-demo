// 1.
// console.log('start require');
// require('./t.js');
// console.log('end require');
/**
 * 打印结果是：
 * start require
 * hello world of t
 * end require
 */

// 2.
// console.log('start require');
// const t = require('./t.js');
// console.log('end require', t);
/**
 * 打印结果是：
 * start require
 * hello world of t
 * end require {}
 */

// 3. 在t.js加入exports.hello = "world"后
// console.log('start require');
// const t = require('./t.js');
// console.log('end require', t);
/**
 * 打印结果是：
 * start require
 * hello world of t
 * end require { hello: 'world' }
 */

// 4. 验证引入对象和输出对象是不是同一个(在t.js里加了一句setTimeOut)
// console.log('start require');
// let t = require('./t.js');
// console.log('end require', t);

// t.additional = 'test';
/**
 * 打印结果是：
 * start require
 * hello world of t
 * end require { hello: 'world' }
 * { hello: 'world', additional: 'test' }
 * 显然是同一个。
 */

// 5. 改变exports类型
console.log('start require');
let t = require('./t.js');
console.log('end require', t);
t.additional = 'test';
/**
 * 打印结果：
 * start require
 * hello world of t
 * end require [Function: minus]
 * { hello: 'world' }
 * 说明t.js里的exports还是exports自己，module.exports是修改了被lesson.js引用了的export内容，addtional也是挂到了module.exports上面
 */

 
 
 
 
 
 