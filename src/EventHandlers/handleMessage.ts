import { Message } from 'discord.js';
import CommandRouter from '../Processing/commandRouter';
import MessageParser from '../Processing/messageParser';

/**
 * Handles incoming discord messages
 *
 * @param msg discord message
 * @param parser instance to parse message
 * @param router command router
 *
 * @returns true if command was run
 */
const handleMessage = async (
  msg: Message,
  parser: MessageParser,
  router: CommandRouter
): Promise<boolean> => {
  const parsed = parser.parse(msg.content, ['!']);
  if (!parsed.successful) return false;

  const runner = router.getCommandRunner(parsed.command);

  const response = await runner.run(parsed.args || []);
  msg.reply(response);

  return true;
};

export default handleMessage;
