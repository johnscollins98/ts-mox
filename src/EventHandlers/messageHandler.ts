import { Message } from 'discord.js';
import CommandRunnerFactory from '../Processing/commandRunnerFactory';
import MessageParser from '../Processing/messageParser';

class MessageHandler {
  constructor(
    private readonly messageParser: MessageParser,
    private readonly commandRouter: CommandRunnerFactory
  ) {}

  /**
   * Handles incoming discord message
   *
   * @param msg discord message
   *
   * @returns true if command was run
   */
  async handleMessage(msg: Message) {
    const parsed = this.messageParser.parse(msg.content);
    if (!parsed.successful) return false;

    const runner = this.commandRouter.getCommandRunner(parsed.command);
    const response = await runner.run(parsed.args);

    msg.reply(response);
  }
}

export default MessageHandler;
