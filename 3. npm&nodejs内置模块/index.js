const EventEmitter = require("events").EventEmitter;

class GT extends EventEmitter {
  constructor() {
    super();
    setInterval(() => {
      this.emit('newlesson', { price: Math.random() * 100 }, 'happy');
    }, 3000);
  }
}

const gk = new GT();

gk.addListener('newlesson', (res1, res2) => {
  if (res.price < 80) {
    console.log('BUY!', res1, res2)
  }
})