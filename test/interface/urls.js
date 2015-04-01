var path = require('path');

// Start with a webdriver instance:
var sw = require('selenium-webdriver');
var By = require('selenium-webdriver').By;
var driver = new sw.Builder()
  .withCapabilities(sw.Capabilities.chrome())
  .build()

// And then...
var chai = require('chai');
var chaiWebdriver = require('chai-webdriver');
chai.use(chaiWebdriver(driver));

var index = path.resolve(__dirname, '../../index.html');

// And you're good to go!
driver.get('file:///' + index);
driver.findElement(By.id('url1')).sendKeys('http://sitedomain.com/?&test=1&param=2')
chai.expect('#url1res').dom.to.contain.text("param = 2");
// chai.expect('#url1res').dom.to.contain.text("test = 1");
driver.quit();