import rw from '@runwayml/hosted-models';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

//discord bot
require('dotenv').config();

const TOKEN = process.env.TOKEN;
const serverID = process.env.SERVERID;
const channelID = process.env.CHANNELID;

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(TOKEN);

client.once('ready', () => {
    console.log('Ready!');
  });
  
client.on('message', gotMessage);

function gotMessage(msg) {
    // Only for this server and this channel
    if (msg.guild.id === serverID && msg.channel.id === channelID) {
        if (msg.content === 'who am I') {
            const model = new rw.HostedModel({
                url: "https://bot-dis-84e10ad3.hosted-models.runwayml.cloud/v1/",
                token: "5/3ElRCwndkTNhmRgsP9Ww==",
              });
              //// You can use the info() method to see what type of input object the model expects
              // model.info().then(info => console.log(info));
              var randomWords = require('random-words');
              var randomNum = Math.floor((Math.random() * 1000) + 1);
              const inputs = {
                "prompt": randomWords(),
                "max_characters": 100,
                "top_p": 0.9,
                "seed": randomNum
              };
            
              model.query(inputs).then(outputs => {
                const { generated_text, encountered_end } = outputs;
                // use the outputs in your project
                msg.channel.send(generated_text);
              });
        }
        if(msg.content == "hello my friend"){
            const fs = require('fs');
            var quotes=[];
            fs.readFile('./quotes.txt','utf8',(err,data)=>{
                if(err){
                    console.error(err);
                    return
                }
                var msgSend = data.split("\n");
                var msgStr = msgSend[Math.floor((Math.random() * msgSend.length) + 0)];
                msg.channel.send(msgStr);
            })
        }
    }
  }
