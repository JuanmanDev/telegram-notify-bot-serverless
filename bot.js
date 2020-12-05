const { Telegraf } = require("telegraf");
const DynamoDBSession = require("telegraf-session-dynamodb");
const { Keyboard, Key } = require("telegram-keyboard");

const {
    welcomeMessage,
    helpMessage,
    cleanMessage,
    unkownNameUserMessagePart,
    startGuessButtonMessage,
} = require("./messages");


const {
    CALLBACK_TYPE_START_NAME,
    CALLBACK_TYPE_GUESS_ACTION,
} = require("./framesCD");

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

connectGuessToBot(bot, startMessageAction);

bot.start(startMessageAction);
bot.action(CALLBACK_TYPE_START_NAME, startMessageAction);
async function startMessageAction(ctx) {
    const keyboard = Keyboard.make([Key.callback(startGuessButtonMessage, CALLBACK_TYPE_GUESS_ACTION)]);
    
    await ctx.reply(welcomeMessage.replace("{{name}}", ctx.from.first_name ? ctx.from.first_name : unkownNameUserMessagePart), {
        ...keyboard.inline(),
    });
}

bot.help((ctx) => {
    return ctx.replyWithMarkdown(helpMessage);
});

bot.command("whoami", (ctx) => {
    let userInfo = JSON.stringify(ctx.from);
    let session = JSON.stringify(ctx.session);
    return ctx.reply(`User info: ${userInfo} , Session: ${session}`);
});

bot.command("ping", (ctx) => {
    return ctx.replyWithMarkdown("*Pong!*");
});

bot.command("clean", (ctx) => {
    ctx.session = null;
    return ctx.replyWithMarkdown(cleanMessage);
});

bot.on("text", (ctx) => {
    return ctx.reply(ctx.message.text);
});

module.exports = {
    bot
};