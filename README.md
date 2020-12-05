# Telegram SpaceX TakeOff JuanmanDev

TODOS:
- Migrate to TypeScript
- Minify (in relation with TypeScript)
- Cache conecction to DynamoDB (maybe)
- Document This

- Linting DONE

## Basic Proyect Structure:

- serverless.yml: Describes serverless Architecture: 
    - 2 post calls:
        - setWebhook configures the bot call to Telegram servers
        - webhook handles all messages received from telegram an do the logic
- handler.js: Main entry point from serverles functions
- bot.js: Created the bt instance to handle basic messages such: start, help and clean command, and call guess.js to configure als the bot part.
- guess.js: Main logic for fint the takeoff fr telegram bot
- messages.js: Strings to be displayed to the users
- framesCD: Handlers way to manage buttons actions on Telegram

<br/><br/>

Run `serverless desploy` to get your telegram bot working!





<br/><br/><br/><br/><br/><br/><br/><br/>

________
Forked from https://github.com/muhannad0/telegram-notify-bot-serverless

Used blogpost: https://muhannad0.github.io/post/serverless-telegram-bot-on-aws/


# Serverless Telegram Bot on AWS

A simple NodeJS Telegram bot using the Serverless Framework.

## Frameworks Used
+ [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)
+ [Telegraf Bot Framework](https://telegraf.js.org/)

## Requirements
+ AWS credentials [configured](https://serverless.com/framework/docs/providers/aws/guide/credentials/).
+ [NodeJS](https://nodejs.org/) 12.x.
+ A [Telegram](https://telegram.org/) account.

## Installation

+ Install the Serverless Framework
```
npm install -g serverless
```

+ Install the required plugins
```
npm install
```

+ Create a [Telegram bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot) using [@BotFather](https://telegram.me/BotFather).

+ Add the token received to `serverless.env.yml` file
```
cat serverless.env.yml

TELEGRAM_TOKEN: <your_token>
```

+ Deploy the application.
```
serverless deploy
```

+ Using `setWebhook` URL the configuration, register the webhook on Telegram
```
curl -X POST https://<api_endpoint_url>/prod/setWebhook
```

## Usage
Now you can `/start` a conversation with the bot.

## Removal
+ To delete the project from AWS.
```
serverless remove
```

## Acknowledgements
+ [Serverless Telegram Bot - Python Example](https://github.com/serverless/examples/tree/master/aws-python-telegram-bot)
+ [Telegram notifications bot with Firebase Cloud Functions](https://medium.com/@maail/telegram-notifications-bot-with-firebase-cloud-functions-4d88fd88cd78)