const { Telegraf } = require('telegraf');
const DynamoDBSession = require('telegraf-session-dynamodb')

const { CallbackData } = require('telegraf-callback-data');

const { Keyboard, Key } = require('telegram-keyboard')

const bot = new Telegraf(process.env.BOT_TOKEN);

const dynamoDBSession = new DynamoDBSession({
    dynamoDBConfig: {
        params: {
            TableName: process.env.DYNAMODB_TABLE
        },
        region: process.env.AWS_REGION
    },
});
bot.use(dynamoDBSession.middleware());

const FIRST_FRAME = 0;
const LAST_FRAME = 61696;
const URL_FRAMES = 'https://framex-dev.wadrid.net/api/video/Falcon%20Heavy%20Test%20Flight%20(Hosted%20Webcast)-wbSwFU6tY1c/frame/';

const CALLBACK_TYPE_BEFORE = 'before';
const CALLBACK_TYPE_SELECT = 'this';
const CALLBACK_TYPE_AFTER  = 'after';
const CALLBACK_TYPE_EXIT   = 'exit';

const framesCD = new CallbackData('frames', ['type']);



const helpMsg = `The bot just repeats anything you say in the chat.
\n*Command reference:*
    /start - Start bot
    /guess - Start the guess the take off from SpaceX
    /ping - *Pong!*
    /whoami - Show information about the current user
    /clean - Removes all user data
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

bot.command('clean', (ctx) => {
    ctx.session = null;
    return ctx.replyWithMarkdown('*Pong!* - All user data cleared');
});



bot.command('guess', async (ctx) => {
    const { reply, replyWithPhoto, session } = ctx;

    await reply(`Welcome to guess the takeoff, every round you will receive a image with a SpaceX takeoff, and you have to reply telling me if the takoff is:
    ⏪ Before the image
    ☑ Inside the image
    ⏩ After the image`);

    ctx.session.firstFrame = FIRST_FRAME;
    ctx.session.lastFrame = LAST_FRAME;
    
    await askForFrame(ctx);
});

async function askForFrame({ reply, replyWithPhoto, session }) {
    
    session.currentFrame = Math.trunc((session.lastFrame - session.firstFrame) / 2) + session.firstFrame;
  
    if (session.firstFrame >= session.lastFrame 
        || session.firstFrame > session.currentFrame 
        || session.lastFrame < session.currentFrame 
        ) {
        reply("You finish, your frame is the: " + session.currentFrame);
        replyWithPhoto(URL_FRAMES + session.currentFrame);
        return;
    }
    const keyboard = Keyboard.make([
        [
            Key.callback(' ⏪ ',  framesCD.new({ type: CALLBACK_TYPE_BEFORE })),
            Key.callback(' ☑ ',   framesCD.new({ type: CALLBACK_TYPE_SELECT })),
            Key.callback(' ⏩ ',  framesCD.new({ type: CALLBACK_TYPE_AFTER  })),
        ],
        [
            Key.callback(' EXIT ',  framesCD.new({ type: CALLBACK_TYPE_EXIT  })),
        ],
      ]);
      
    
    await replyWithPhoto(URL_FRAMES + session.currentFrame, {
        ...keyboard.reply(), 
        ...keyboard.inline(),
    });
}

bot.action(framesCD.filter({ type: CALLBACK_TYPE_BEFORE }), async (ctx) => {
    ctx.session.lastFrame = ctx.session.currentFrame;
    await askForFrame(ctx);
});

bot.action(framesCD.filter({ type: CALLBACK_TYPE_SELECT }), async (ctx) => {
    ctx.session.currentFrame = ctx.session.lastFrame;
    await askForFrame(ctx);
});

bot.action(framesCD.filter({ type: CALLBACK_TYPE_AFTER }), async (ctx) => {
    ctx.session.firstFrame = ctx.session.currentFrame + 1;
    await askForFrame(ctx);
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