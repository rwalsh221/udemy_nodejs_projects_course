// section 3: lesson 43 - 44

const EventEmitter = require('events');

const customEmitter = new EventEmitter();

customEmitter.on('response', (name, id) => {
  console.log(`data recieved user ${name} with id:${id}`);
});

customEmitter.on('response', () => {
  console.log(`some other logic `);
});

customEmitter.emit('response', 'john', 34);
