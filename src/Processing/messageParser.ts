import ParsedCommand from '../Interfaces/parsedCommand';

class MessageParser {
  private readonly prefixes: string[];

  /**
   * Constructor
   * @param prefixes acceptable prefixes for commands
   */
  constructor(prefixes: string[]) {
    this.prefixes = prefixes.sort((a, b) => b.length - a.length); // sort prefixes by length
  }

  /**
   * Takes a message and attempts to parse it into a usable command structure
   *
   * @param message message to parse
   * @returns Parsed message if successful, { successful: false } if not.
   */
  public parse(message: string): ParsedCommand {
    const prefix = this.getPrefix(message);
    if (!prefix) return { successful: false };

    const remaining = message.slice(prefix.length, message.length); // strip prefix away
    if (remaining.startsWith(' ')) return { successful: false };

    const [command, ...args] = remaining.split(' ');

    return { successful: true, prefix, command, args };
  }

  /**
   * Takes a message and gets a prefix if there is one
   *
   * @param message mesasage to check
   * @returns prefix if there is one, undefined if there isn't
   */
  private getPrefix(message: string): string | undefined {
    return this.prefixes.find((prefix: string): boolean =>
      message.startsWith(prefix)
    );
  }
}

export default MessageParser;
