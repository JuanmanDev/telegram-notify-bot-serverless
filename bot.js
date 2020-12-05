const { Telegraf } = require('telegraf');
const DynamoDBSession = require('telegraf-session-dynamodb')

const {
    welcomeMessage,
    helpMessage,
    cleanMessage,
    unkownNameUserMessagePart,
} = require("./messages");

const { connectGuessToBot } = require("./guess");

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

connectGuessToBot(bot);

bot.start((ctx) => {
    return ctx.reply(welcomeMessage.replace("{{name}}",
     ctx.from.first_name ? ctx.from.first_name : unkownNameUserMessagePart));
});

bot.help((ctx) => {
    return ctx.replyWithMarkdown(helpMessage);
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
    return ctx.replyWithMarkdown(cleanMessage);
});


bot.on('text', (ctx) => {
    return ctx.reply(ctx.message.text);
});

module.exports = {
    bot
};