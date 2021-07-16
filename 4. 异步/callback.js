// 1. 使用普通try-catch的方式来捕获错误

// try {
//   interview(function() {
//     console.log('smile');
//   })
// } catch (error) {
//   console.log('cry', error);
// }

// function interview(callback) {
//   setTimeout(() => {
//     if (Math.random < 0.1) {
//       callback('success');
//     } else {
//       throw new Error('fail');
//     }
//   }, 500)
// }

/**
 * 上述写法结果是：
 * 错误并没有被try-catch捕获到，反而是这个错误被抛到了nodejs全局
 * 在nodejs里造成全局错误是一个非常严重的事情，它会导致我们的nodejs程序崩溃，这也是nodejs程序里比较难处理的部分
 * 原因是try-catch的机制是在try-catch所在的调用栈上层调用的函数抛出错误都会被try-catch捕获到
 * 而nodejs的事件循环，每一个事件循环都是一个全新的调用栈，这个可以参考后续的课程内容
 * 所以这个setTimeout里的错误就会被抛到nodejs全局，而不是try-catch里被抓取到
 */

// 2. 根据上述案例进行该写

// interview(function(res) {
//   if (res instanceof Error) { // 这样写每一个callback都要判断一下的话太烦了
//     return console.log('cry');
//   }
//   console.log('smile');
// })

// function interview(callback) {
//   setTimeout(() => {
//     if (Math.random() < 0.5) {
//       callback('success');
//     } else {
//       callback(new Error('fail'));
//     }
//   }, 500)
// }

// 3. 根据nodejs callback规范来写

// interview(function(res) {
//   if (res) {
//     return console.log('cry');
//   }
//   console.log('smile')
// });

// function interview(callback) {
//   setTimeout(() => {
//     if (Math.random() < 0.8) {
//       callback(null, 'success');
//     } else {
//       callback(new Error('fail'))
//     }
//   }, 500);
// }

// 4. callback异步流程控制
// 4.1 回调地狱 如果我们面试有三轮的话...
// interview(function(err) {
//   if (err) {
//     return console.log('cry at 1st round');
//   }

//   interview(function(err) {
//     if (err) {
//       return console.log('cry at 2nd round');
//     }

//     interview(function(err) {
//       if (err) {
//         return console.log('cry at 3rd round');
//       }

//       console.log('smile')
//     })
//   })
// });

// 4.2 异步并发问题 每次都是添加一个计数器，会特别麻烦
// let count = 0;
// interview(function(res) {
//   if (res) {
//     return console.log('cry');
//   }
//   console.log('smile')
//   count++;
// });

// interview(function(res) {
//   if (res) {
//     return console.log('cry');
//   }
//   console.log('smile')
//   count++;
// });

// 5. async.js解决异步并发控制问题
