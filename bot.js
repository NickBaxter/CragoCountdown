var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {    
        //Return Date
        var returnDate = new Date("8/24/2018");
        var daysLeft = daysToReturn(returnDate);

        //I was curious what the parameters returned.
        logger.info('--------------------------------------------');
        logger.info('Message received! Info below.');
        logger.info('user: ' + user);
        logger.info('userID: ' + userID);
        logger.info('channelID: ' + channelID);
        logger.info('message: ' + message);

        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);

        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            case 'return':
                bot.sendMessage({
                    to: channelID,
                    message: 'Papa Crago returns home in ' + daysLeft + " days" 
                });
            break;
            case 'set':
                bot.listen
            default:
                bot.sendMessage({
                    to: channelID,
                    message: "Looks like that is an unsupported option. You should try !ping tho ;)"
                })
            break;
            // Just add any case commands if you want to..
         }
     }
});

function daysToReturn(returnDate) {
    //Return Date Variables   
    var returnMonth = returnDate.getMonth() + 1; //this is plus 1 because JS months start at 0. Strange I know.
    var returnDay = returnDate.getDate();
    var returnYear = returnDate.getFullYear();
    
    //Current Date Variables
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();
    var currentYear = currentDate.getFullYear();

    //Now for the fun math!!!!
    //calculate the days till return
    daysInCurrent = daysInMonth(returnMonth) - currentDay;   //numbers of days left in current month.
    var daysInBetweenMonths = 0; //counter for number of days in all the months in between the current and return month.
    for(var i = currentMonth+1; i < returnMonth; i++) {
        daysInBetweenMonths = daysInBetweenMonths + daysInMonth(i);
    }
    //Adds it all up to find the days left until crago returns!
    var daysLeft = daysInCurrent + daysInBetweenMonths + returnDay;
    return daysLeft;
}

function daysInMonth(month) {
    var numOfDays = 0;
    if([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        logger.info("This month has 31 days!");
        numOfDays = 31;
    }
    else if([4, 6, 9, 11].includes(month)) {
        logger.info("This month has 30 days!");
        numOfDays = 30;
    }
    else if(month == 2) {
        logger.info("This month has 29 days......or sometimes 28. Have fun with that one");
        if(year%4 == 0) {//if the year can be evenly be divide by 4 it is a leap year.....usually
                numOfDays = 28;
        }
    }
    else {
        logger.info("It would appear you somehow entered the wrong info. Congrats on breaking the program you lil devil ;)");
        numOfDays = 31;     
    }
    return numOfDays;
}