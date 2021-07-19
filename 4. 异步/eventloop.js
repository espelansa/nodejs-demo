// 大概模拟执行逻辑

const eventloop = {
  queue: [],

  loop() {
    while(this.queue.length) {
      let callback = this.queue.shift();
      callback();
    }
    setTimeout(this.loop.bind(this), 50);
  },

  add(callback) {
    this.queue.push(callback);
  }
}

eventloop.loop();

setTimeout(() => {
  eventloop.add(function() {console.log(1)})
}, 500);

setTimeout(() => {
  eventloop.add(function() {console.log(2)})
}, 800);
