const { Keyboard, Key } = require("telegram-keyboard");

const {
    guessStartMessage,
    guessFinishMessage,
    guessButtonExitMessage,
    guessButtonRestartMessage,
    byeMessage,
    startGuessButtonMessage,
} = require("./messages");

const {
    CALLBACK_TYPE_BEFORE_ACTION,
    CALLBACK_TYPE_SELECT_ACTION,
    CALLBACK_TYPE_AFTER_ACTION,
    CALLBACK_TYPE_EXIT_ACTION,
    CALLBACK_TYPE_RESTART_ACTION,
    CALLBACK_TYPE_BEFORE_NAME,
    CALLBACK_TYPE_SELECT_NAME,
    CALLBACK_TYPE_AFTER_NAME,
    CALLBACK_TYPE_EXIT_NAME,
    CALLBACK_TYPE_RESTART_NAME,
    CALLBACK_TYPE_GUESS_ACTION,
    CALLBACK_TYPE_GUESS_NAME,
} = require("./framesCD");


const FIRST_FRAME = 0;
const LAST_FRAME = 61696;
const URL_FRAMES = "https://framex-dev.wadrid.net/api/video/Falcon%20Heavy%20Test%20Flight%20(Hosted%20Webcast)-wbSwFU6tY1c/frame/";


// Sends to the user on a context the equestion to check where is the takeoff (before, now, after)
// Also ends the search if there is no more frames to check.
async function askForFrame({ reply, replyWithPhoto, session }) {

    session.currentFrame = Math.trunc((session.lastFrame - session.firstFrame) / 2) + session.firstFrame;

    if (session.firstFrame >= session.lastFrame
        || session.firstFrame > session.currentFrame
        || session.lastFrame < session.currentFrame) {
        reply(guessFinishMessage + session.currentFrame);
        replyWithPhoto(URL_FRAMES + session.currentFrame);
        return;
    }
    const keyboard = Keyboard.make([
        [
            Key.callback(" ⏪ ", CALLBACK_TYPE_BEFORE_ACTION),
            Key.callback(" ☑ ", CALLBACK_TYPE_SELECT_ACTION),
            Key.callback(" ⏩ ", CALLBACK_TYPE_AFTER_ACTION),
        ],
        [
            Key.callback(guessButtonExitMessage, CALLBACK_TYPE_EXIT_ACTION),
            Key.callback(guessButtonRestartMessage, CALLBACK_TYPE_RESTART_ACTION),
        ],
    ]);

    await replyWithPhoto(URL_FRAMES + session.currentFrame, {
        ...keyboard.reply(),
        ...keyboard.inline(),
    });
}

// Connects Telegraf commands to Guess main logic
exports.connectGuessToBot = function(bot) {

    bot.command("guess", startGuess);
    bot.action(CALLBACK_TYPE_GUESS_NAME, startGuess);

    bot.action(CALLBACK_TYPE_BEFORE_NAME, async (ctx) => {
        ctx.session.lastFrame = ctx.session.currentFrame;
        await askForFrame(ctx);
    });

    bot.action(CALLBACK_TYPE_SELECT_NAME, async (ctx) => {
        ctx.session.firstFrame = ctx.session.lastFrame = ctx.session.currentFrame;
        await askForFrame(ctx);
    });

    bot.action(CALLBACK_TYPE_AFTER_NAME, async (ctx) => {
        ctx.session.firstFrame = ctx.session.currentFrame + 1;
        await askForFrame(ctx);
    });

    bot.action(CALLBACK_TYPE_EXIT_NAME, async (ctx) => {
        const keyboard = Keyboard.make([Key.callback(startGuessButtonMessage, CALLBACK_TYPE_GUESS_ACTION)]);
        
        await ctx.reply(byeMessage, {
            ...keyboard.inline(),
        });
    });

    
    bot.action(CALLBACK_TYPE_RESTART_NAME, startGuess);
};

async function startGuess(ctx) {
    const { reply } = ctx;

    await reply(guessStartMessage);

    ctx.session.firstFrame = FIRST_FRAME;
    ctx.session.lastFrame = LAST_FRAME;

    await askForFrame(ctx);
}
