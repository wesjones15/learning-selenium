const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

// (async function example() {
//     let driver = await new Builder()
//         .forBrowser('chrome')
//         .build();

//     try {
//         // Navigate to Url
//         await driver.get('https://www.google.com');

//         // Enter text "cheese" and perform keyboard action "Enter"
//         await driver.findElement(By.name('q')).sendKeys('patriot', Key.ENTER);

//         // get all elements of tagname h3
//         let results = await driver.findElements(By.tagName('h3'));

//         // really weird for loop in js
//         for (let result of results) {
//             console.log(await result.getText());
//             assert(result == "Nothing");
//         }

//         // console.log(await firstResult.getAttribute('textContent'));
//     }
//     catch (e) {
//         console.log("UWU i made a fucky ", e);
//     }
//     finally{
//         driver.quit();
//     }
// })();

async function googleTest (query, expected) {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.google.com');
        await driver.findElement(By.name('q')).sendKeys(query, Key.ENTER);
        let result = await driver.findElement(By.tagName('h3'));
        // const expected = "PatriotTV";
        const actual = (await result.getAttribute('textContent')).substring(0, 25);
        assert.equal(actual, expected, "should return first google result");
    } catch (e) {
        console.log("Something's gone wrong! ");
    } finally {
        driver.quit();
    }
}

googleTest("climbing", "Climbing Magazine | Rock ");