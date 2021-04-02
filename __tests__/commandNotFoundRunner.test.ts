import CommandNotFoundRunner from '../src/CommandRunners/commandNotFoundRunner';

describe('command not found runner', () => {
  it('should throw a not implemented error when calling run', () => {
    const runner = new CommandNotFoundRunner();

    function test() {
      runner.run();
    }

    expect(test).toThrowError(new Error('Not Implemented'));
  });
});
