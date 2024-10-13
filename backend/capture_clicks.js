const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Set headless to false to see the browser
    const page = await browser.newPage();
    const url = process.argv[2]; // Get URL from command line arguments

    await page.goto(url);

    // Wait for the page to load completely
    await page.waitForTimeout(2000); // Wait for 2 seconds

    // Add your click capturing logic here
    page.on('click', async (event) => {
        const clickData = {
            x: event.clientX,
            y: event.clientY,
            timestamp: Date.now(),
        };

        // Take a screenshot
        const screenshotPath = `screenshots/click_${Date.now()}.png`;
        await page.screenshot({ path: screenshotPath });
        clickData.screenshot = screenshotPath;

        // Append click data to JSON file
        fs.readFile('clickData.json', (err, data) => {
            if (err) throw err;
            const json = JSON.parse(data);
            json.push(clickData);
            fs.writeFile('clickData.json', JSON.stringify(json, null, 2), (err) => {
                if (err) throw err;
                console.log('Click logged:', clickData);
            });
        });
    });

    // Prevent closing the browser immediately
    await page.waitForTimeout(60000); // Wait for 1 minute for testing
    await browser.close();
})();
