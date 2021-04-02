import CommandNotFoundRunner from '../src/CommandRunners/commandNotFoundRunner';
import CommandRunner from '../src/Interfaces/commandRunner';
import CommandRouter from '../src/Processing/commandRouter';

class MockRunnerOne implements CommandRunner {
  constructor() {}
  run() {}
}

class MockRunnerTwo implements CommandRunner {
  constructor() {}
  run() {}
}

describe('command router', () => {
  let commandRunners: Map<string, CommandRunner>;
  let router: CommandRouter;
  beforeEach(() => {
    commandRunners = new Map<string, CommandRunner>();
    commandRunners.set('example1', new MockRunnerOne());
    commandRunners.set('example2', new MockRunnerTwo());

    router = new CommandRouter(commandRunners);
  });

  it('should return CommandNotFoundRunner if command is not recognised', () => {
    const res = router.getCommandRunner('unknown');
    expect(res).toBeInstanceOf(CommandNotFoundRunner);
  });

  it('should return the example1 command runner if found', () => {
    const res = router.getCommandRunner('example1');
    expect(res).toBeInstanceOf(MockRunnerOne);
  });

  it('should return the example2 command runner if found', () => {
    const res = router.getCommandRunner('example2');
    expect(res).toBeInstanceOf(MockRunnerTwo);
  });
});
