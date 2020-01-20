const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');



async function testScrabbleCheatResponse(query, expected) {
    let driver = await new Builder()
        .forBrowser('chrome')
        .build();

    try {
        // Navigate to Url
        await driver.get('https://scrabble-cheat.herokuapp.com');

        // Enter text query and perform keyboard actions "tab" and "Enter"
        await driver.findElement(By.className('tileStyle')).sendKeys(query, Key.TAB, Key.ENTER);
        
        // Wait until backend api fulfills request and loads result elements
        await driver.wait(until.elementLocated(By.className('row result')));

        // get all elements of tagname h1
        let results = await driver.findElements(By.tagName('h1'));
    
        // iterate through each result and compare to expected value
        for (let i = 0; i < expected.length; i++) {
            assert(await results[i].getAttribute('textContent') == expected[i]);
            console.log(await results[i].getAttribute('textContent'), expected[i]);
        }        
    } catch (e) {
        console.log("The test has failed");
    } finally {
        driver.quit();
    }
}

const query = 'WESTERN';
const expected = ['Scrabble Cheat', 'Word', 'Score', 'WESTERN', '10', 'NEWEST', '9', 'RENEWS', '9'];

testScrabbleCheatResponse(query, expected);