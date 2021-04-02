import { Message } from 'discord.js';

interface CommandRunner {
  run(): void;
}

export default CommandRunner;
