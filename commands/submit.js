// Users can submit their tracks with "!submit <link>"

const vote = require("./vote");

let isInBattle = false;
let userSubmissions = new Map();

const VOTE_AND_BATTLE_DURATION = 216000000; //60 hours in milliseconds

let targetChannel;

module.exports = function (client, msg, args) {

    // Get target channel to post bot's messages on
    if (msg.channel.name === 'testing') {
        targetChannel = msg.guild.channels.cache.get('825811010664267836'); // Channel id for testing
    } else {
        targetChannel = msg.guild.channels.cache.get('826765467594260510'); // Channel id for beat battle
    }

    // Battle starts
    if (args === "start") {
        setTimeout(clearMap, VOTE_AND_BATTLE_DURATION); // Call clearMap when voting and battle ends
        isInBattle = true;
    } 
    
    // Voting starts
    else if (args === "vote") { 
        isInBattle = false;
        targetChannel.send("----------------------------------------------------------------------------");
        targetChannel.send(":partying_face: Beat battle is over! :partying_face:")
        targetChannel.send(":pencil: Voting will now start! :pencil:");
        vote(client, msg, userSubmissions); // Calls vote command to start vote
    } 
    
    // User submissions
    else if (isInBattle) {
        if (args != null && args[0].substring(0,4) != 'http') {
            msg.channel.send('Must give a working link to song after "!submit". :expressionless:');
        } else {
            userSubmissions.set(msg.author.username, args);
            msg.channel.send(`Submission received from ${msg.author} :clap:`);
        }
    } else {
        msg.channel.send("No current battle. :confused:");
    }
}

function clearMap() {
    userSubmissions.clear();
}