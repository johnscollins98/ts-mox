import CommandNotFoundRunner from '../CommandRunners/commandNotFoundRunner';
import CommandRunner from '../Interfaces/commandRunner';

class CommandRunnerFactory {
  constructor() {}

  /**
   * Find an object that implements the CommandRunner interface.
   * If the command isn't found, returns a CommandNotFoundRunner.
   *
   * @param command string command to retrieve a runner for
   * @returns found instance of CommandRunner or CommandNotFoundRunner
   */
  getCommandRunner(command?: string): CommandRunner {
    return new CommandNotFoundRunner();
  }
}

export default CommandRunnerFactory;
