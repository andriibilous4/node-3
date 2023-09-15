const { EventEmitter } = require('./EventEmitter');

class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    this.emit('begin');
    const start = process.hrtime();
    try {
      const data = await asyncFunc(...args);
      this.emit('data',data);
      const hrtime = process.hrtime(start);
      const time = hrtime[0] * 1e9 + hrtime[1];

      this.emit('end',time)
    }catch(e){
      console.log(e);
    }
    this.emit('end');
  }
}


module.exports = {
  WithTime
}