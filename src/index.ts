import { Client } from 'discord.js';
import { config } from 'dotenv';
config();

const client = new Client();

client.on('ready', () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
  }
});

client.login(process.env.BOT_TOKEN);
