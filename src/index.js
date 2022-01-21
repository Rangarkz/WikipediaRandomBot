const telegramBot = require('node-telegram-bot-api');
const request = require('request');
require('dotenv').config();

const url='https://en.wikipedia.org/api/rest_v1/page/random/summary';


const bot = new telegramBot(process.env.TOKEN, {polling:   true});

bot.on('message', (msg)=>{
    let title="";
    let summary="";
    request(url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    title=body.title;
    summary=body.extract;
    var result=title+": \n"+"\n";
    result+=summary;
    bot.sendMessage(msg.chat.id, result);
    });
});