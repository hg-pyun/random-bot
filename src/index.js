const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// for test limited 2 hours
const channelAccessToken = 'sZ36AhH4LmXUCiG+xsLZPgEhjRsVbD4lB99NvcW/q5PD1mqNyp8y7DTB6wrjv2Z/DzX12HIaWpJ8+T/PKngqb3ocqtjxfn/LZWNDJMt4ShNaY4mxa5n3HIp0X2eX4SlunBQvO8vQImPxfcYXJg/U0gdB04t89/1O/w1cDnyilFU=';

// init axios
axios.defaults.baseURL = 'https://api.line.me';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Authorization'] = `Bearer ${channelAccessToken}`;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/hook', function (req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end('<h1>RandomBot - phg2491@gamil.com<h1>');
});

app.post('/hook', function (req, res) {
    const eventObj = req.body.events[0];
    const source = eventObj.source;
    const replyToken = eventObj.replyToken;
    const receivedMessage = eventObj.message;

    console.log('eventObj', eventObj);

    axios.post('/v2/bot/message/reply', {
        replyToken,
        messages: [{
            type: "text",
            "text": receivedMessage.text
        }]
    }).then(({data})=>{
        console.log('success', data);
    }).catch((e)=>{
        console.log('error', e);
    });

    res.sendStatus(200);
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}`);
});



