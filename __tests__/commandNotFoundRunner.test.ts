import CommandNotFoundRunner from '../src/CommandRunners/commandNotFoundRunner';

describe('command not found runner', () => {
  it('should return a not implemented message when calling run', () => {
    const runner = new CommandNotFoundRunner();
    expect(runner.run([])).resolves.toBe('Command Not Found');
  });
});
