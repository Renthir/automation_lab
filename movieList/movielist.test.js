const {Builder, Capabilities, By} = require('selenium-webdriver')
require('chromedriver')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()


beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
    await driver.sleep(1000)
})

afterAll(async () => {
    await driver.sleep(1000)
    await driver.quit()
})

const movieName = 'Vampire Hunter D: Bloodlust'

describe('movie functions', () => {
    test('Can movie be crossed out?', async () => {
        await driver.findElement(By.xpath('//input')).sendKeys(`${movieName}` + '\n')
        let newMovie = await driver.findElement(By.xpath(`//li/span[text()='${movieName}']`))
        // expect(newMovie.isDisplayed()).toBeTruthy()
        await driver.sleep(1000)

        await newMovie.click()
        let message = await driver.findElement(By.id('message')).getText()
        expect(message).toBe(`${movieName} watched!`)

        await driver.sleep(1000)
    })

    test('Can movie be added back?', async () => {
        let newMovie = await driver.findElement(By.xpath(`//li/span[text()='${movieName}']`))
        await newMovie.click()
        let message = await driver.findElement(By.id('message')).getText()
        expect(message).toBe(`${movieName} added back!`)
        
        await driver.sleep(1000)
    })

    test('Can movie be deleted?', async () => {
        // let newMovie = await driver.findElement(By.xpath(`//li/span[text()='${movieName}']`))
        await driver.findElement(By.xpath(`//button[text()='x']`)).click()
        let message = await driver.findElement(By.id('message')).getText()
        expect(message).toBe(`${movieName} deleted!`)
    })
})