/*globals expect:true, spyOn:true */
var RuthaUtils = require('../index');

var utils = new RuthaUtils.create({
      path: {
        config: __dirname + '/config',
        models: __dirname + '/models'
      }
    });

describe("Lib Test", function() {


  it("should load development config", function() {
    process.env.NODE_ENV = 'development';
    expect(utils.Config.get('apiServer:port')).toBe(3002);
  });

  it("should load test config", function() {
    process.env.NODE_ENV = 'test';
    expect(utils.Config.get('apiServer:port')).toBe(3002);
  });

  // should load logger
  it("should log a info message", function() {
    process.env.NODE_ENV = 'development';
    spyOn(utils.Logger, 'info');
    utils.Logger.info('Hejsan');
    expect(utils.Logger.info).toHaveBeenCalled();
  });

  // should load mongoose client
  it("should have a mongoose connection", function() {
    process.env.NODE_ENV = 'development';
    expect(utils.MongooseClient.connection.readyState).toBe(2);
  });
});
