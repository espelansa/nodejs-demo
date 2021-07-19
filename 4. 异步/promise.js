// promise是一个状态机
// const promise = new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     resolve();
//   }, 500);
// });

// console.log(promise);

// setTimeout(() => {
//   console.log(promise, 800);
// }, 800)

/**
 * 打印结果：
 * Promise { <pending> }
 * Promise { undefined } 800
 * 可以把上述代码都包入一个自执行函数，在chrome的控制台console进行执行看看结果
 * 第二行会变成 Promise { <resolved>: undefined } 800
 */

// (function() {
//   const promise = new Promise(function(resolve, reject) {
//     setTimeout(() => {
//       reject(new Error("3"));
//     }, 300);
//   }).then((res) => {
//     // 捕获resolve内容
//     console.log(res);
//   }).catch((err) => {
//     // 捕获reject内容
//     console.log(err, 'error')
//   });
  
//   console.log(promise);
  
//   setTimeout(() => {
//     console.log(promise, 800);
//   }, 800)
// })();

/**
 * 这样可以有效捕获错误，而不是释放到全局
 * 打印结果：
 * Promise { <pending> }
 * Error: 3
    at <anonymous>:4:14 "error"
 * Promise { <fulfilled>: undefined } 800
 */

// Promise处理异步流程

(function() {
  let promise = interview();
  promise
    .then(() => {
      console.log('smile');
    })
    .catch(() => {
      console.log('cry') 
    });
})();


function interview() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve('success');
      } else {
        reject(new Error('fail'));
      }
    }, 500)
  })
}

/** */

(function() {
  let promise = interview();
  let promise2 = promise
    .then(() => {
      throw new Error('refuse')
    })
  
  setTimeout(() => {
    console.log(promise)
    console.log(promise2);
  }, 800)

})();

function interview() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0) {
        resolve('success');
      } else {
        reject(new Error('fail'));
      }
    }, 500)
  })
}

/**
 * 打印结果是：
 * Promise {<fulfilled>: "success"}
 * Promise {<rejected>: Error: refuse
    at <anonymous>:17:13}
 * 因为最后是throw一个error 所以promise执行结果是rejected，如果return一个值，那就是resolved了
 */


(function() {
  let promise = interview();
  let promise2 = promise
    .catch(() => {      // 这里是catch，因为promise必然被rejected
      return 'accept';
    })
  
  setTimeout(() => {
    console.log(promise)
    console.log(promise2);
  }, 800)

})();

function interview() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 1) {
        resolve('success');
      } else {
        reject(new Error('fail'));
      }
    }, 500)
  })
}

/**
 * 打印结果是：
 * Promise {<rejected>: Error: fail
    at <anonymous>:21:16}
 * Promise {<fulfilled>: "accept"}
 * 说明catch与then在这方面效果一样
 */

