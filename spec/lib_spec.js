/*globals expect:true, spyOn:true */
var RuthaUtils = require('../index');
var config = RuthaUtils.createConfig({
  path: {
    config: __dirname + '/config'
  }
});

var logger = RuthaUtils.createLogger({
  filename: config.get('logger:filename')
});

var mongoose = RuthaUtils.createModels({
  client: 'mongoose',
  connectionString: config.get('mongodb:connectionString'),
  models: __dirname + '/models'
});


describe("Lib Test", function() {


  it("should load development config", function() {
    process.env.NODE_ENV = 'development';
    expect(config.get('apiServer:port')).toBe(3002);
  });

  it("should load test config", function() {
    process.env.NODE_ENV = 'test';
    expect(config.get('apiServer:port')).toBe(3002);
  });

  // should load logger
  it("should log a info message", function() {
    process.env.NODE_ENV = 'development';
    spyOn(logger, 'info');
    logger.info('Hejsan');
    expect(logger.info).toHaveBeenCalled();
  });

  // should load mongoose client
  it("should have a mongoose connection", function() {
    process.env.NODE_ENV = 'development';
    expect(mongoose.client.connection.readyState).toBe(2);
  });
});
