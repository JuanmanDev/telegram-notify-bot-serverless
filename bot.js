const { Telegraf } = require('telegraf');
const DynamoDBSession = require('telegraf-session-dynamodb')

const { CallbackData } = require('telegraf-callback-data');

const { Keyboard, Key } = require('telegram-keyboard')

const bot = new Telegraf(process.env.BOT_TOKEN);
const dynamoDBSession = new DynamoDBSession({
    dynamoDBConfig: {
        params: {
            TableName: "TakeoffSpaceXDynamoDbTable"
        },
        region: process.env.AWS_REGION
    }
})

const CALLBACK_TYPE_BEFORE = 'before';
const CALLBACK_TYPE_SELECT = 'this';
const CALLBACK_TYPE_AFTER  = 'after';
const CALLBACK_TYPE_EXIT   = 'exit';

const framesCD = new CallbackData('frames', ['type']);


bot.use(dynamoDBSession.middleware())

const helpMsg = `The bot just repeats anything you say in the chat.
\n*Command reference:*
    /start - Start bot
    /ping - *Pong!*
    /whoami - Show information about the current user
    /help - Show this help page`;

bot.start((ctx) => {
    return ctx.reply(`Hello from Lambda, ${ctx.from.first_name ? ctx.from.first_name : 'friend'}! Use /help to view available commands.`);
});

bot.help((ctx) => {
    return ctx.replyWithMarkdown(helpMsg);
});

bot.command('whoami', (ctx) => {
    let userInfo = JSON.stringify(ctx.from);
    let session = JSON.stringify(ctx.session);
    return ctx.reply(`User info: ${userInfo} , Session: ${session}`);
});

bot.command('ping', (ctx) => {
    return ctx.replyWithMarkdown('*Pong!*');
});

bot.command('guess', async ({ reply, replyWithPhoto }) => {
    const keyboard = Keyboard.make([
        [
            Key.callback(' ⏪ ',  framesCD.new({ type: CALLBACK_TYPE_BEFORE })),
            Key.callback(' ☑ ',   framesCD.new({ type: CALLBACK_TYPE_SELECT })),
            Key.callback(' ⏩ ',  framesCD.new({ type: CALLBACK_TYPE_AFTER  })),
        ],
        [
            Key.callback('Exit', 'exit'), // TODO EXIT
        ],
      ]);
  
    
    await replyWithPhoto('https://framex-dev.wadrid.net/api/video/Falcon%20Heavy%20Test%20Flight%20(Hosted%20Webcast)-wbSwFU6tY1c/frame/1234/', {
        ...keyboard.reply(), 
        ...keyboard.inline(),
    });
});

bot.action(framesCD.filter({ type: CALLBACK_TYPE_BEFORE }), ({ answerCbQuery }) => {
    return answerCbQuery('Hello ' + CALLBACK_TYPE_BEFORE);
});

bot.action(framesCD.filter({ type: CALLBACK_TYPE_SELECT }), ({ answerCbQuery }) => {
    return answerCbQuery('Hello ' + CALLBACK_TYPE_SELECT);
});

bot.action(framesCD.filter({ type: CALLBACK_TYPE_AFTER }), ({ answerCbQuery }) => {
    return answerCbQuery('Hello ' + CALLBACK_TYPE_AFTER);
});

bot.action(framesCD.filter({ type: CALLBACK_TYPE_EXIT }), ({ answerCbQuery }) => {
    return answerCbQuery('Hello ' + CALLBACK_TYPE_EXIT);
});

bot.on('text', (ctx) => {
    return ctx.reply(ctx.message.text);
});

module.exports = {
    bot
};