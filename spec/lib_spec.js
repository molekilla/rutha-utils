/*globals expect:true, spyOn:true */
var RuthaUtils = require('../index');
var config = RuthaUtils.createConfig({
  path: {
    config: __dirname + '/config'
  }
}).load();

var logger = RuthaUtils.createLogger({
  filename: config.get('logger:filename')
});

var Mongoose = require('mongoose');
var MongooseHandler = require('../mongoose');

describe("Lib Test", function() {
  it("should load development config", function() {
    process.env.NODE_ENV = 'development';
    expect(config.get('apiServer:port')).toBe(3002);
  });

  it("should load test config", function() {
    process.env.NODE_ENV = 'test';
    var test = config.load();
    expect(test.get('apiServer:port')).toBe(3001);
  });

  // should load logger
  it("should log a info message", function() {
    process.env.NODE_ENV = 'development';
    spyOn(logger, 'info');
    logger.info('Hejsan');
    expect(logger.info).toHaveBeenCalled();
  });

  it("should bind to mongoose events", function() {
    Mongoose.connect();
    spyOn(MongooseHandler, 'bindEvents');
    MongooseHandler.bindEvents(Mongoose);
    expect(MongooseHandler.bindEvents).toHaveBeenCalled();
  });
  
  it("should bind to mongoose models", function() {
    expect(function() {
      Mongoose.connect();
      spyOn(MongooseHandler, 'bindModels');
      MongooseHandler.bindModels({
        mongoose: Mongoose,
        modelsPath: '../spec/models'
      });
      expect(MongooseHandler.bindModels).toHaveBeenCalled();
    }).toThrow(new Error('Trying to open unclosed connection.'));
  });
});
