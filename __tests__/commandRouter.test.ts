import CommandNotFoundRunner from '../src/CommandRunners/commandNotFoundRunner';
import CommandRunner from '../src/Interfaces/commandRunner';
import CommandRouter from '../src/Processing/commandRouter';

describe('command router', () => {
  let router: CommandRouter;
  beforeEach(() => {
    router = new CommandRouter();
  });

  it('should return CommandNotFoundRunner if command is not recognised', () => {
    const res = router.getCommandRunner('unknown');
    expect(res).toBeInstanceOf(CommandNotFoundRunner);
  });
});
