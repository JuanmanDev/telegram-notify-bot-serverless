const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createChat = chatId => {
    console.debug('Creating chat ' + chatId);
    const chatInfo = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: chatId,
            submittedAt: timestamp,
            updatedAt: timestamp,
            answers: [],
        },
    };
    return dynamoDb.put(chatInfo).promise()
        .then(res => candidate);
}