import { Client } from 'discord.js';
import { config } from 'dotenv';
import MessageHandler from './EventHandlers/messageHandler';
import CommandRunnerFactory from './Processing/commandRunnerFactory';
import MessageParser from './Processing/messageParser';
config();

const client = new Client();
const parser = new MessageParser(['!']);
const commandRunnerFactory = new CommandRunnerFactory();
const messageHandler = new MessageHandler(parser, commandRunnerFactory);

client.on('ready', () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
  }
});

client.on('message', (msg) => {
  messageHandler.handleMessage(msg);
});

client.login(process.env.BOT_TOKEN);
