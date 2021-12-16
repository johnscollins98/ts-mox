import { APIMessage, StringResolvable } from 'discord.js';

interface CommandRunner {
  run(args?: string[]): Promise<StringResolvable | APIMessage>;
}

export default CommandRunner;
