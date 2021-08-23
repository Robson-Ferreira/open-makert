import EventEmitter from 'events';
import * as fs from 'fs';
import * as path from 'path';

const event = new EventEmitter();
const pathFile = path.join(__dirname, '/log.txt');

event.on('log', (message) => {
  fs.appendFileSync(pathFile, message, (err) => {
    if (err) throw err;
  });
});

const log = (message) => {
  event.emit('log', message);
};

export default log;
