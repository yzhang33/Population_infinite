import puppeteer from 'puppeteer';
import randomWords from 'random-words'

var watchHistory = [];
const browser = await puppeteer.launch({headless: false});

const page = await browser.newPage();

await page.setViewport({width: 1280, height: 720});

console.log('going to youtube')
await page.goto('https://www.youtube.com');
await page.waitForSelector('#avatar-btn');
await page.click('form');

const randomSearch = randomWords({ exactly:5, min: 3, max: 10 });
await page.type('#search', randomSearch[1]);

await page.keyboard.press('Enter');

// wait for the link for the first video appear.
await page.waitForSelector('a#video-title');

console.log('found video, opening the first one.')

// click the link for the first video appear.
await page.click('a#video-title');
var count = 0;
while(count<10) {
    await page.waitFor('h1 yt-formatted-string');

    const videoTitle = await page.evaluate(function() {
    return document.querySelector('h1 yt-formatted-string').innerText;
    });
    var duration = Math.floor((Math.random()*3)+1);
    watchHistory.push({
        title: videoTitle,
        watchedDuration:duration
    });
    console.log('watching video ' + videoTitle);

    // watch the video for the watchDuration seconds
    await page.waitFor(duration * 1000);

    await page.waitForSelector('#related #items #contents a');

    await page.click('#related #items #contents a');
    count++ ;
}

console.log(watchHistory);
await browser.close();