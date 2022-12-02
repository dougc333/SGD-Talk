const puppeteer = require('puppeteer')


const url = 'http://localhost:5000/testform'

async function run(){
    console.log("a");
    const browser = await puppeteer.launch();
    console.log("b");
    const page = await browser.newPage();
    console.log("c");

    console.log("page",page);
    await page.goto(url);
    await page.type('input[id=foo]',"a5a5a5a5");
    
    //await page.screenshot({path:'screenshot.png'})
    await browser.close()

}

run();