// Displays how much time is left in current beat battle
let currentState = "waiting";
let interval;

const BATTLE_DURATION = 172800; //48 hours in seconds
const VOTE_DURATION = 43200;//12 hours in seconds
const HOUR = 3600; //1 hour in seconds
const MINUTE = 60; //1 minute in seconds
const ONE_SECOND = 1000; //1 second in milliseconds

let hours = null;
let minutes = null;
let seconds = null;

let totalSeconds = null;
let tempTotalSeconds = null;
let time = null;

module.exports = function (client, msg, args) {
    if (args === "start") {
        currentState = "battle";
        totalSeconds = BATTLE_DURATION; 
        time = getTime(totalSeconds);
        interval = setInterval(countDown, ONE_SECOND); // Timer counts down every one second
    } else if (time == null) {
        msg.channel.send("No current battle. :confused:");
    } else {
        msg.channel.send(`:alarm_clock: ${time} remaining. :alarm_clock:`);
    }
}

function countDown(msg) {
    totalSeconds -= 1;
    time = getTime(totalSeconds);
    if (totalSeconds === 0) {

        // Battle ends, start voting
        if (currentState === "battle") {
            currentState = "voting";
            totalSeconds = VOTE_DURATION; //Set for 8 hours
        } 
        
        // Voting ends
        else if (currentState === "voting") {
            currentState = "waiting";
            totalSeconds = 0;
            time = null;
            clearInterval(interval);
        }
    }
}

// Displays time in hours:minutes:seconds
function getTime(totalSeconds) {
    tempTotalSeconds = totalSeconds;
    hours = Math.floor(tempTotalSeconds / HOUR);
    tempTotalSeconds %= HOUR;
    minutes = Math.floor(tempTotalSeconds / MINUTE);
    seconds = tempTotalSeconds % MINUTE;
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}