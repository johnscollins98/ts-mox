import { Client } from 'discord.js';
import { config } from 'dotenv';
import messageHandler from './EventHandlers/messageHandler';
import CommandRouter from './Processing/commandRouter';
import MessageParser from './Processing/messageParser';
config();

const client = new Client();

client.on('ready', () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
  }
});

client.on('message', (msg) => {
  const parser = new MessageParser();
  const router = new CommandRouter();
  messageHandler(msg, parser, router);
})

client.login(process.env.BOT_TOKEN);
