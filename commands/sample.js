// Chooses a random sample to for the current beat battle
// Users can also submit samples with "!sample <link>"
let samples = [];
let sampleUsed;
let randomNum;
let targetChannel;
let sampleBattleNum = 0;

module.exports = function (client, msg, args) {
    // Get target channel to post bot's messages on
    if (msg.channel.name === 'testing') {
        targetChannel = msg.guild.channels.cache.get('CHANNEL_ID'); 
    } else {
        targetChannel = msg.guild.channels.cache.get('CHANNEL_ID');
    }

    // Battle start
    if (args === "start") {
        if (samples.length === 0) {
            msg.channel.send("Samples is empty. :confused:");
        } else {
            sampleBattleNum += 1;

            // Choose a random sample and delete from list
            randomNum = Math.floor(Math.random() * samples.length);
            sampleUsed = samples.splice(randomNum, 1);
            targetChannel.send("----------------------------------------------------------------------------");
            targetChannel.send(`:fire: Beat Battle #${sampleBattleNum} :fire:`)
            targetChannel.send(":arrow_down_small: Sample for this battle :arrow_down_small:");
            targetChannel.send(`${sampleUsed}`);
            targetChannel.send("----------------------------------------------------------------------------");
        }
    } 
    
    // User submissions
    else if (args[0] == null || args[0].substring(0,4) != 'http') {
        msg.channel.send('"!sample" must be followed with a link. :expressionless:'); // Invalid link
    } else {
        samples.push(args[0]); //Adds link to sample list
        msg.channel.send("Thank you for the sample! :slight_smile:");
    }
}
