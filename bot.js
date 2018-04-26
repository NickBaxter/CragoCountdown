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
        //current date
        var d = new Date();
        //Return Date
        var r = new Date("8/20/2018");

        var dayDiff = +r.getDate() - +d.getDate();
        var monthDiff = r.getMonth() - d.getMonth();

        //I was curious what the parameters returned.
        logger.info('--------------------------------------------');
        logger.info('Message received! Info below.');
        logger.info('user: ' + user);
        logger.info('userID: ' + userID);
        logger.info('channelID: ' + channelID);
        logger.info('message: ' + message);
        logger.info('evt:' + evt);


        var args = message.substring(1).split(' ');
        var cmd = args[0];

        daysToReturn(r);
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'A Ding Pong!'
                });
            break;
            case 'time':
                bot.sendMessage({
                    to: channelID,
                    message: 'Time: ' + d.getTime() + 
                                '\nYear: ' + d.getFullYear() +
                                '\nMonth: ' + (+d.getMonth()+1) + 
                                '\nDay: ' + d.getDate()
                });
            break;
            case 'return':
                bot.sendMessage({
                    to: channelID,
                    message: 'Papa Crago returns home in ' + monthDiff + " months and " + dayDiff + " days" 
                });
            break;
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

function daysToReturn(date) {
    date = date ;
    logger.info('date: ' + date);

    //this is plus 1 because JS months start at 0. Strange I know.
    month = date.getMonth() + 1;
    day = date.getDate();
    year = date.getFullYear();

    //numbers of days to be determined in the current and return months.
    var daysInCurrent = 0;
    var daysInReturn = 0;

    logger.info('Year: ' + year + '\nMonth: ' + month + '\nDay: ' + day);

    if([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        logger.info("This month has 31 days!");

    }
    else if([4, 6, 9, 11].includes(month)) {
        logger.info("This month has 30 days!");
    }
    else if(month == 2) {
        logger.info("This month has 29 days......or sometimes 28. Have fun with that one");
    }
    else {
        logger.info("It would appear you somehow entered the wrong info. Congrats on breaking the program you lil devil ;)");
    }

}