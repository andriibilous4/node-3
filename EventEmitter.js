
 class EventEmitter {
  listeners = {};  // key-value pair
 
  addListener(eventName, fn) {
    if(!this.listeners[eventName]){
      this.listeners[eventName] = []
    }
    this.listeners[eventName].push(fn)
  }
    
  on(eventName, fn) {
    this.addListener(eventName,fn);
  }
 
  removeListener(eventName, fn) {
    if(!this.listeners[eventName]) return;

    this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn);
  }
    
  off(eventName, fn) {
    this.removeListener(eventName,fn)
  }
 
  once(eventName, fn) {
    const onceExecute = (...args)=>{
      fn(...args);
      this.removeListener(eventName,onceExecute);
    }
    this.addListener(eventName,onceExecute);
  }
 
  emit(eventName, ...args) {
      if(!this.listeners[eventName]) return;
    this.listeners[eventName].forEach(listener => 
      listener(...args));
  }
 
  listenerCount(eventName) {
    if(!this.listeners[eventName]) return 0;
    return this.listeners[eventName].length()
  }
 
  rawListeners(eventName) {
    return this.listeners[eventName] || [];
  }
 }

 module.exports = {
  EventEmitter
 }