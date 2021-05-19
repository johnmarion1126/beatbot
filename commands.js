// Manages commands

const test = require("./commands/test.js");
const join = require("./commands/join.js");
const timeleft = require("./commands/timeleft.js");
const submit = require("./commands/submit.js");
const vote = require("./commands/vote.js");
const sample = require("./commands/sample.js");
const help = require("./commands/help.js");

const commands = { 
    test,
    join,
    timeleft,
    submit,
    vote,
    sample,
    help,
};

module.exports = async function (client, msg) {
    let tokens = msg.content.split(" ");
    let command = tokens.shift();

    try {
        if (command.charAt(0) === "!") { 
            command = command.substring(1);
            commands[command](client, msg, tokens);  
        }
    } catch (e) {
        msg.channel.send("Command doesn't exists. :pensive:");
        msg.channel.send('Check "!help" for available commands.');
    }   
}