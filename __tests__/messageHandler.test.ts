import MessageParser from '../src/Processing/messageParser';
import CommandRunnerFactory from '../src/Processing/commandRunnerFactory';
import MessageHandler from '../src/EventHandlers/messageHandler';
import { Message } from 'discord.js';

jest.mock('discord.js');
jest.mock('../src/Processing/messageParser.ts');
jest.mock('../src/Processing/commandRunnerFactory.ts');

const mockedMessage = <jest.Mock<Message>>Message;
const mockedParser = <jest.Mock<MessageParser>>MessageParser;
const mockedFactory = <jest.Mock<CommandRunnerFactory>>CommandRunnerFactory;

describe('message handler', () => {
  let message: jest.Mocked<Message>;
  let parser: jest.Mocked<MessageParser>;
  let factory: jest.Mocked<CommandRunnerFactory>;

  beforeEach(() => {
    message = new mockedMessage() as any;
    message.content = '!test';

    parser = new mockedParser() as any;

    factory = new mockedFactory() as any;
    factory.getCommandRunner.mockReturnValue({ run: jest.fn() });
  });

  it('should reply if parsed successfully', async () => {
    parser.parse.mockReturnValueOnce({ successful: true });
    const messageHandler = new MessageHandler(parser, factory);

    await messageHandler.handleMessage(message);

    expect(message.reply).toHaveBeenCalledTimes(1);
  });

  it('should not reply if not parsed successfully', async () => {
    parser.parse.mockReturnValueOnce({ successful: false });

    const messageHandler = new MessageHandler(parser, factory);
    messageHandler.handleMessage;

    expect(message.reply).not.toHaveBeenCalled();
  });
});
