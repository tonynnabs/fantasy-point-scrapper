const puppeteer = require('puppeteer');

const chromeOptions = {
    executablePath: `C:/Program Files (x86)/Google/Chrome/Application/chrome.exe`,
    headless: false,
    defaultViewport: null,
    slowMo: 10,
}

export default async function handler(req, res) {
    const url = req.body.url;
    const browser = await puppeteer.launch(chromeOptions)
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    const acceptButton = await page.waitForSelector(".js-accept-all-close", { visible: true });
    await page.waitForTimeout(Math.floor(Math.random() * 5000) + 2999)
    await Promise.all([
        acceptButton.click(), 
    ]);

    const points = await page.$eval('.EntryEvent__PrimaryValue-l17rqm-4', (result) => result.innerText);
    const title = await page.$eval('.Title-sc-9c7mfn-0', (result) => result.innerText);

    page.close();
    browser.close();
    res.status(200).json({ points: points, title: title })
}