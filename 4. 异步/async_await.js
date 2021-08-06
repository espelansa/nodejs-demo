// 以下两段代码是等价的
console.log(async function() {
  // return 4
  throw new Error('5')
}()) // 不要忘记自执行

console.log(function() {
  return new Promise((resolve, reject) => {
    // resolve 4
    reject (new Error('5'));
  })
}())

// async-await 在chrome浏览器里执行
(function() {
  const result = (async function() {
    const content = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(6);
      }, 500)
    })
  
    console.log("content", content);
    return 4;
  })() // 这里自执行不要忘记了
  
  setTimeout(() => {
    console.log('result', result);
  }, 800)
})();

/**
 * content Promise {<pending>}
 * result Promise {<fulfilled>: 4}
 */

// 如果在 new Promise 前面加一个await

/**
 * content 6
 * result Promise {<fulfilled>: 4}
 */


// 捕捉错误
(function() {
  const result = (async function() {
    try {
      var content = await new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('8'));
        }, 500)
      })
    } catch (error) {
      console.log('error', error.message);
    }
  
    console.log("content", content);
    return 4;
  })() // 这里自执行不要忘记了
  
  setTimeout(() => {
    console.log('result', result);
  }, 800)
})();

/**
 * error 8
 * content undefined
 * result Promise {<fulfilled>: 4}
 */

// 改造面试代码

(async function() {
  try {
    await interview(1);
    await interview(2);
    await interview(3);

  } catch (error) {
    return console.log('cry at' + error.round);
  }
  console.log('smile')
})()