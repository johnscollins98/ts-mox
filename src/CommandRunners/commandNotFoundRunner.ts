import { Message } from 'discord.js';
import CommandRunner from '../Interfaces/commandRunner';

class CommandNotFoundRunner implements CommandRunner {
  constructor() {}

  run() {
    throw new Error('Not Implemented');
  }
}

export default CommandNotFoundRunner;
