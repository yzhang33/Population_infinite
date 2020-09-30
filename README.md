# Week 3 Simulation
This week I a creating a watched youTube titles as my data and train a GPT2 to generate youtube titles. Actually the hard part is to collect the data. My data set has to be large enough to run as training set. As well as the  context of the file. I can not just use JSON file I parsed. I actually wrote a python parser to parse my json file. All the data set and code is under week3's folder. Here is some results I had when I ran the model I trained. 
![Training](./train.png)


# Week 1 Obfuscation

### Assignment Goal:
Fake some online activities on YouTube since I love to watch YouTube.

This week we learn a automation tool called Puppeteer. This is a useful tool for me to create "fake" online activities. I started with simple "Hello World" for puppeteer.

```javascript
import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
    headless:false,
    slowMo: 10
});
const page = await browser.newPage();
await page.goto('https://youtube.com');
//await browser.close(); 

```
This allows me to open YouTube automatically. 

I noticed that watching YouTube is different from using social media. I don't need to login in order to watch videos. However, I want puppeteer to wait me log in then continue its actions. I found out that log in button's html id changes after logged in. I used below code to tell puppeteer to wait. 
```javascript
await page.waitForSelector('#avatar-btn');
```

I am "faking" my activities using random word generator tool. Usage is the same as puppeteer.
```
npm install random-words
```
After it watched all videos, my program will output a JSON file contains title watched and watched duration.
```javascript
[
  { title: '', watchedDuration: 2 },
  {
    title: 'State Of Emergency Declared In Louisville In Preparation For Peaceful Protests',
    watchedDuration: 2
  },
  {
    title: 'Trump shreds Dem governors pushing for mail-in voting',
    watchedDuration: 1
  },
  { title: 'Ingraham: Riot at the court', watchedDuration: 3 },
  {
    title: 'Hannity: Dems threatening entire country in order to upend SCOTUS norms',
    watchedDuration: 1
  },
  { title: 'Ingraham: Riot at the court', watchedDuration: 2 },
  {
    title: 'Hannity: Dems threatening entire country in order to upend SCOTUS norms',
    watchedDuration: 3
  },
  {
    title: 'Tucker: The left’s extreme reaction to Ginsburg’s death',
    watchedDuration: 3
  },
  {
    title: 'Tucker: President Trump wants US troops out of the Middle East',
    watchedDuration: 3
  },
  {
    title: 'Trump delivers remarks in Pennsylvania',
    watchedDuration: 1
  }
]

```
#### Some Errors Encountered:
```
waitFor is deprecated and will be removed in a future release. See https://github.com/puppeteer/puppeteer/issues/6214 for details and how to migrate your code.
```
waitFor() is deprecated? I used waitForSelector()instead. 
```
Error: Node is either not visible or not an HTMLElement
```
some await functionality? I use this fixed this error
```javascript 
wait page.evaluate(()=>{})
```
Puppeteer does not search new term again using the same logic. So I tried to click related videos instead. Need to figure out why searching new term not working. 

