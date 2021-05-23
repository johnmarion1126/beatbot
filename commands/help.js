// Shows available commands
module.exports = function (client, msg, args) {
    msg.channel.send(":clipboard: COMMAND LIST :clipboard:-----------------------------------------------");
    msg.channel.send('"!join" : Join the queue for a battle. Will start once there is enough people.');
    msg.channel.send('"!timeleft": Checks how much time is left for the battle or for the voting.' );
    msg.channel.send('"!vote" : Follow this command with a number to vote for your favorite track.');
    msg.channel.send('"!submit" : Follow this command with a link to submit your track.');
    msg.channel.send('"!sample" : Follow this command with a link to submit a sample.');
    msg.channel.send("----------------------------------------------------------------------------");
}
