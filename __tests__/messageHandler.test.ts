import messageHandler from '../src/EventHandlers/messageHandler';
import MessageParser from '../src/Processing/messageParser';
import CommandRouter from '../src/Processing/commandRouter';
import { Message } from 'discord.js';

jest.mock('discord.js');
jest.mock('../src/Processing/messageParser.ts');
jest.mock('../src/Processing/commandRouter.ts');

const mockedMessage = <jest.Mock<Message>>Message;
const mockedParser = <jest.Mock<MessageParser>>MessageParser;
const mockedRouter = <jest.Mock<CommandRouter>>CommandRouter;

describe('message handler', () => {
  let message: jest.Mocked<Message>;
  let parser: jest.Mocked<MessageParser>;
  let router: jest.Mocked<CommandRouter>;

  beforeEach(() => {
    message = new mockedMessage() as any;
    message.content = '!test';

    parser = new mockedParser() as any;

    router = new mockedRouter() as any;
    router.getCommandRunner.mockReturnValue({ run: jest.fn() });
  });

  it('should reply if parsed successfully', async () => {
    parser.parse.mockReturnValueOnce({ successful: true });

    await messageHandler(message, parser, router);

    expect(message.reply).toHaveBeenCalledTimes(1);
  });

  it('should not reply if not parsed successfully', async () => {
    parser.parse.mockReturnValueOnce({ successful: false });

    await messageHandler(message, parser, router);

    expect(message.reply).not.toHaveBeenCalled();
  });
});
