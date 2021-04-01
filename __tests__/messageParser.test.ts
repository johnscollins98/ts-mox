import MessageParser from '../src/Processing/messageParser';

describe('message parser', () => {
  let parser: MessageParser;
  beforeEach(() => {
    parser = new MessageParser();
  });

  it('should run without failing', () => {
    parser.parse('test', ['!']);
  });

  it('should be unsuccessful if does not start with any of the prefixes', () => {
    const res = parser.parse('test', ['!']);
    expect(res.successful).toBe(false);
  });

  it('should have prefix, command, args undefined if not successful', () => {
    const res = parser.parse('!test', ['-']);
    expect(res).toEqual({
      successful: false,
      prefix: undefined,
      command: undefined,
      args: undefined,
    });
  });

  it('should be successful if message starts with a prefix', () => {
    const res = parser.parse('!test', ['!']);
    expect(res.successful).toBe(true);
  });

  it('should return the correct prefix if the message starts with one', () => {
    const res = parser.parse('!test', ['!']);

    expect(res.successful).toBe(true);
    expect(res.prefix).toBe('!');
  });

  it('should return the correct prefix is the message starts with one of many', () => {
    const res = parser.parse('$test', ['^', '$', '!']);

    expect(res.successful).toBe(true);
    expect(res.prefix).toBe('$');
  });

  it('should return the longest available matching prefix', () => {
    const res = parser.parse('!!test', ['!', '!!']);

    expect(res.successful).toBe(true);
    expect(res.prefix).toBe('!!');
  })

  it('should be successful if the valid prefix contains a space, and so does the message', () => {
    const res = parser.parse('$stest', ['$s']);

    expect(res.successful).toBe(true);
    expect(res.prefix).toBe('$s');
  });

  it('should be unsuccessful if a valid prefix is followed by a space', () => {
    const res = parser.parse('- test', ['-']);
    expect(res.successful).toBe(false);
  });

  it('should return empty command and args if message is only prefix', () => {
    const res = parser.parse('+', ['+']);

    expect(res.successful).toBe(true);
    expect(res.prefix).toBe('+');
    expect(res.command).toBe('');
    expect(res.args).toEqual([]);
  });

  it('should return the correct command if valid', () => {
    const res = parser.parse('-test', ['-']);

    expect(res.successful).toBe(true);
    expect(res.command).toBe('test');
  });

  it('should return the correct command if followed by a space', () => {
    const res = parser.parse('-mock ', ['-']);

    expect(res.successful).toBe(true);
    expect(res.command).toBe('mock');
  });

  it('should return the correct command if followed by a space and more text', () => {
    const res = parser.parse('-command test', ['-']);

    expect(res.successful).toBe(true);
    expect(res.command).toBe('command');
  });

  it('should return empty args if there are none', () => {
    const res = parser.parse('"func', ['"']);

    expect(res.successful).toBe(true);
    expect(res.args).toEqual([]);
  });

  it('should return one arg if there is one', () => {
    const res = parser.parse('$args arg1', ['$']);
    expect(res.successful).toBe(true);
    expect(res.args).toEqual(['arg1']);
  });

  it('should return two args if there are two', () => {
    const res = parser.parse('^args arg1 arg2', ['^']);
    
    expect(res.successful).toBe(true);
    expect(res.args).toEqual(['arg1', 'arg2']);
  })
});
