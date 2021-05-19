const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {client};

const commandHanlder = require("./commands");

require("dotenv").config();
client.login(process.env.BOTTOKEN);

client.on('ready', () => {
    console.log('Beep boop! I am ready!');
})

client.on("message", msg => {
    commandHanlder(client, msg);
})
