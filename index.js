const fs = require('fs').promises
const Parser = require('rss-parser');
const parser = new Parser();

const LATEST_TWEET_PLACEHOLDER = '%{{latest_tweet}}%';
const IMAGE_SIZE_PLACEHOLDER = /%{{image_size}}%/g
const IMAGE_SIZE = '400px';
(async () => {

    const markdownTemplate = await fs.readFile('./README.md.tpl', { encoding: 'utf-8' });
    //getting the latest tweet
    const {items} = await parser.parseURL('https://rss.app/feeds/iywDECu9LYSoRCrE.xml');
    //setting latest tweet
    const [{title, link, content}] = items; 
    const latestTweetMarkdown = `[${title}](${link})`;
    //replace all placeholders with data
    const newMarkdown = markdownTemplate
        .replace(LATEST_TWEET_PLACEHOLDER, latestTweetMarkdown)
        .replace(IMAGE_SIZE_PLACEHOLDER, IMAGE_SIZE); //changing the image size of the pc image in readme
    
    //console.log(newMarkdown);
    
    await fs.writeFile('./README.md', newMarkdown);
    
    /* feed.items.forEach(item => {
      console.log(item.title + ':' + item.link + ':' + item.content)
    }); */
  
})();