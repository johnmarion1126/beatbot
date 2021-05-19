// Call !join to join queue for battle
// Starts battle once enough people join

const timeleft = require("./timeleft");
const submit = require("./submit");
const sample = require("./sample");
let numPlayers = [];

const VOTE_AND_BATTLE_DURATION = 216000000; //60 hours in milliseconds
const BATTLE_DURATION = 172800000; //48 hours in milliseconds

let targetChannel;
let currentNum = 5;

module.exports = function (client, msg, args) {

    // Get target channel to post bot's messages on
    if (msg.channel.name === 'testing') {
        targetChannel = msg.guild.channels.cache.get('825811010664267836'); // Channel id for testing
    } else {
        targetChannel = msg.guild.channels.cache.get('826765333612331020'); // Channel id for news
    }

    if (!numPlayers.includes(msg.author.username)) {
        targetChannel.send("----------------------------------------------------------------------------");
        targetChannel.send(`${msg.author} has joined the beat battle! :raised_hands:`);
        numPlayers.push(msg.author.username);
        currentNum -= 1;
        if (currentNum > 0) targetChannel.send(`We need ${currentNum} more people to start battle!`);
    } else {
        msg.channel.send("You're already in the current battle.");
    }
    
    if (numPlayers.length === 5) {
        targetChannel.send("A beat battle will now start!")
        setTimeout(function() {startVote(client, msg)}, BATTLE_DURATION); // Start vote when battle ends
        setTimeout(clearPlayers, VOTE_AND_BATTLE_DURATION); // Call clearPlayers when voting and battle ends
        startBattle(client, msg);
    }
}

// Call other commands to start battle
function startBattle(client, msg) {
    sample(client, msg, "start");
    timeleft(client, msg, "start");
    submit(client, msg, "start");
}

function startVote(client, msg) {
    submit(client, msg, "vote");
}

function clearPlayers() {
    numPlayers = [];
    currentNum = 5;
}