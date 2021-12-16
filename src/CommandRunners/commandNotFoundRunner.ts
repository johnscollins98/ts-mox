import { APIMessage, StringResolvable } from 'discord.js';
import CommandRunner from '../Interfaces/commandRunner';

class CommandNotFoundRunner implements CommandRunner {
  constructor() {}

  /**
   * Command that is run when none cna be found.
   *
   * @param args List of string args
   * @returns message response
   */
  async run(args?: string[]): Promise<StringResolvable | APIMessage> {
    return 'Command Not Found';
  }
}

export default CommandNotFoundRunner;
