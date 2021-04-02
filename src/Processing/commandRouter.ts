import CommandNotFoundRunner from '../CommandRunners/commandNotFoundRunner';
import CommandRunner from '../Interfaces/commandRunner';

class CommandRouter {
  /**
   * Constructor for command router.
   * @param commandRunners Map of string -> CommandRunner to route to.
   */
  constructor(private readonly commandRunners: Map<string, CommandRunner>) {}

  /**
   * Find an object that implements the CommandRunner interface.
   * If the command isn't found, returns a CommandNotFoundRunner.
   *
   * @param command string command to retrieve a runner for
   * @returns found instance of CommandRunner or CommandNotFoundRunner
   */
  getCommandRunner(command: string): CommandRunner {
    const res = this.commandRunners.get(command);

    if (!res) {
      return new CommandNotFoundRunner();
    }

    return res;
  }
}

export default CommandRouter;
