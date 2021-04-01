import ParsedCommand from '../Interfaces/parsedCommand';

class MessageParser {
  constructor() {}

  /**
   * Takes a message and attempts to parse it into a usable command structure
   *
   * @param message message to parse
   * @param prefixes list of allowed prefixes
   * @returns Parsed message if successful, { successful: false } if not.
   */
  public parse(message: string, prefixes: string[]): ParsedCommand {
    prefixes = prefixes.sort((a, b) => b.length - a.length); // sort prefixes by length

    const prefix = this.getPrefix(message, prefixes);
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
   * @param prefixes list of allowed prefixes
   * @returns prefix if there is one, undefined if there isn't
   */
  private getPrefix(message: string, prefixes: string[]): string | undefined {
    return prefixes.find((prefix: string): boolean =>
      message.startsWith(prefix)
    );
  }
}

export default MessageParser;
