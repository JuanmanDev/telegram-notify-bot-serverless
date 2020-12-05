const helpMessage = `The bot just repeats anything you say in the chat.
\n*Command reference:*
    /start - Start bot
    /guess - Start the guess the take off from SpaceX
    /ping - *Pong!*
    /whoami - Show information about the current user
    /clean - Removes all user data
    /help - Show this help page`;
exports.helpMessage = helpMessage;

const unkownNameUserMessagePart = "friend";
exports.unkownNameUserMessagePart = unkownNameUserMessagePart;

const welcomeMessage = "Hello from Lambda, {{name}}! Use /help to view available commands.";
exports.welcomeMessage = welcomeMessage;

const cleanMessage = "*Pong!* - All user data cleared";
exports.cleanMessage = cleanMessage;


const guessStartMessage = `Welcome to guess the takeoff, every round you will receive a image with a SpaceX takeoff, and you have to reply telling me if the takoff is:
    ⏪ Before the image
    ☑ Inside the image
    ⏩ After the image`;
exports.guessStartMessage = guessStartMessage;

const guessFinishMessage = "You finish, your frame is the: ";
exports.guessFinishMessage = guessFinishMessage;

const guessButtonExitMessage = " 🚪 Exit ";
exports.guessButtonExitMessage = guessButtonExitMessage;

const guessButtonRestartMessage = " 🔄 Restart ";
exports.guessButtonRestartMessage = guessButtonRestartMessage;

const byeMessage = " Bye! 👋 ";
exports.byeMessage = byeMessage;

const startGuessButtonMessage = " 🚀 Find the Take Off 🚀 ";
exports.startGuessButtonMessage = startGuessButtonMessage;