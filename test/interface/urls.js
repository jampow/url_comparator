var path = require('path');

var sw = require('selenium-webdriver');
var By = require('selenium-webdriver').By;

var chai = require('chai');
var chaiWebdriver = require('chai-webdriver');

var index = path.resolve(__dirname, '../../index.html');

before(function(){
	this.timeout(10000);
	this.driver = new sw.Builder().withCapabilities(sw.Capabilities.chrome()).build();
	chai.use(chaiWebdriver(this.driver));
	return this.driver.getWindowHandle();
})

after(function() {
  return this.driver.quit();
});

describe('Testing parameters',function(){
	beforeEach(function() {
		this.driver.get('file:///' + index);
		return this.driver.findElement(By.id('url1')).sendKeys('http://sitedomain.com/?&test=1&param=2');
	});

	it('should have parameter named param with value 2',function(){
		return chai.expect('#url1res').dom.to.contain.text("param = 2");
	});

	it('should have parameter named test with value 1',function(done){
		return chai.expect('#url1res').dom.to.contain.text("test = 1");
	});

});
