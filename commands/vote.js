// Users can vote with "!vote <number>"
let userScore = new Map();
let participants = [];
let userVoted = [];
let isVoting = false;

const VOTE_DURATION = 43200000; //12 hours in milliseconds

let targetChannel;

module.exports = function (client, msg, args) {

    // Get target channel to post bot's messages on
    if (msg.channel.name === 'testing') {
        targetChannel = msg.guild.channels.cache.get('CHANNEL_ID');
    } else {
        targetChannel = msg.guild.channels.cache.get('CHANNEL_ID');
    }

    // Voting starts and displays submissions
    if (args.constructor === Map && isVoting === false) {
        targetChannel.send("----------------------------------------------------------------------------");
        setTimeout(function() {showResults(msg, userScore)}, VOTE_DURATION); // Call showResults when voting ends
        isVoting = true;
        let i = 1;
        for (let pairs of args.keys()) {
            userScore.set(pairs, 0);
            participants.push(pairs);
            targetChannel.send(`${i}. ${pairs} -- ${args.get(pairs)[0]}`);
            targetChannel.send("----------------------------------------------------------------------------");
            i++;
        }
    } else if (isVoting) {
        if (userVoted.includes(msg.author.username)) {
            msg.channel.send("You already voted. :expressionless:");
        } else {
            msg.channel.send(`${msg.author} has voted! :eyes:`);
            userScore.set(participants[args[0]-1], userScore.get(participants[args[0]-1]) + 1); // Adds one point to user
            userVoted.push(msg.author.username); // Adds the voter to userVoted to prevent from voting twice
        }
        
    } else  if (isVoting === false) {
        msg.channel.send(" Voting is closed. :expressionless:");
    }
}

function showResults(msg, userScore) {

    let max = 0;
    let winner;

    // Iterate over userScore and assign the user with the highest score to winner
    for (let pairs of userScore.keys()) {
        if (max < userScore.get(pairs)) {
            max = userScore.get(pairs);
            winner = pairs;
        }
    }

    targetChannel.send("----------------------------------------------------------------------------");
    targetChannel.send(":alarm_clock: Voting is over! :alarm_clock:");
    if (winner == null) {
        targetChannel.send("No one won, better luck next time. :sob:")
    } else {
        targetChannel.send(`:medal: ${winner} has won the beat battle! :medal:`); 
    }
    targetChannel.send("----------------------------------------------------------------------------");
    
    // Reset beat battle
    userScore.clear();
    participants = [];
    userVoted = [];
    isVoting = false;
}
