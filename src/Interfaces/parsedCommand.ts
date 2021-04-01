interface ParsedCommand {
  successful: boolean;
  prefix?: string;
  command?: string;
  args?: string[];
}

export default ParsedCommand;
