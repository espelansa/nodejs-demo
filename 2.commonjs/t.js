console.log('hello world of t')

// 3. exports是一个默认对象，你可以在上面挂载任意东西
exports.hello = "world"

// 4.
setTimeout(() => {
  console.log(exports);
}, 2000)

// 5. 改变export类型
module.exports = function minus(a, b) {
  return  a - b;
}