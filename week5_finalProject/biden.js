import rw from '@runwayml/hosted-models';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

//discord bot
require('dotenv').config();

const TOKEN = process.env.BIDEN_TOKEN;
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
    if (msg.guild.id === serverID && msg.channel.id === channelID) {
        if(msg.content != ""){
            const model = new rw.HostedModel({
                url: "https://biden-bc69b790.hosted-models.runwayml.cloud/v1/",
                token: "ASLC1ZeMiXNZJijGRs+UlQ==",
              });              
              var randomNum = Math.floor((Math.random() * 1000) + 1);
              //// You can use the info() method to see what type of input object the model expects
              // model.info().then(info => console.log(info));
              const inputs = {
                "prompt": 'I',
                "max_characters": 500,
                "top_p": 0.9,
                "seed": randomNum
              };
              model.query(inputs).then(outputs => {
                const { generated_text, encountered_end } = outputs;
                // use the outputs in your project
                msg.channel.send(generated_text);
              });
        }
    }
}