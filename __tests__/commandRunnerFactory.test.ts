import CommandNotFoundRunner from '../src/CommandRunners/commandNotFoundRunner';
import CommandRunnerFactory from '../src/Processing/commandRunnerFactory';

describe('command router', () => {
  let router: CommandRunnerFactory;
  beforeEach(() => {
    router = new CommandRunnerFactory();
  });

  it('should return CommandNotFoundRunner if command is not recognised', () => {
    const res = router.getCommandRunner('unknown');
    expect(res).toBeInstanceOf(CommandNotFoundRunner);
  });
});
