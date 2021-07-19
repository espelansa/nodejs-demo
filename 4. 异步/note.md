## 非阻塞I/O
- I/O 即 Input/Output, 一个系统的输入和输出
- 阻塞I/O和非阻塞I/O的区别在于系统接收输入再到输出期间，能不能接收其他输入
  - 排队打饭的食堂阿姨是阻塞I/O
  - 餐厅点菜的服务生是非阻塞I/O 
  - 输入是点菜，输出是端菜
- 理解非阻塞I/O的要点在于
  - 确定一个进行Input/Output的系统
  - 思考在I/O过程中，能不能进行其他I/O

## NodeJS System
![alt nodejs架构](./nodejs.jpg)

- 图片左边基本都是在一个Node.js线程里完成的（除了你的应用程序又开了一个新的线程）
- nodejs所有的I/O操作都是非阻塞的，它会把大量的计算能力分发到其他C++线程去计算，等到其他C++线程计算完毕后再把结果回调到nodejs线程，nodejs线程再把结果返回给应用程序
- 左边是点菜员（服务生），右边则是厨师、洗碗工等


## 异步编程之callback
- 回调函数格式规范
  - error-first callback
  - Node-style callback
- 第一个参数是error, 后面的参数才是结果
- npm: async （已过时）
- thunk （已过时）


## Promise
- 当前事件循环中得不到的结果，会在未来的事件循环中给到你结果
- 是一个状态机
  - pending
  - fulfilled/resolved
  - rejected
- resolved状态的Promise会回调后面的第一个.then
- rejected状态的Promise会回调后面的第一个.catch
- 任何一个rejected状态且后面没有.catch的Promise，都会造成浏览器/node环境的全局错误
- 执行then和catch会返回一个新Promise，该Promise最终状态根据then和catch的回调函数的执行结果来决定
  - 回调函数结果是throw, 该Promise是rejected状态
  - 回调函数结果是return，该Promise是resolved状态

