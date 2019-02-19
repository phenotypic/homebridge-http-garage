var Service, Characteristic;
var request = require("request");

module.exports = function(homebridge){
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-http-garage", "GarageDoorOpener", GarageDoorOpener);
};

function GarageDoorOpener(log, config) {
  this.log = log;

  this.name = config.name;
  this.manufacturer = config.manufacturer || 'HTTP Manufacturer';
  this.model = config.model || 'homebridge-http-garage';
  this.serial = config.serial || 'HTTP Serial Number';

  this.username = config.username || null;
	this.password = config.password || null;
  this.timeout = config.timeout || 5000;
  this.http_method = config.http_method || 'GET';

  this.openURL = config.openURL;
  this.closeURL = config.closeURL;

  this.moveTime = config.moveTime || 10;

  this.targetDoorState = 1;
  this.currentDoorState = 1;

  if(this.username != null && this.password != null){
    this.auth = {
      user : this.username,
      pass : this.password
    };
  }

  this.log(this.name, this.apiroute);

	this.service = new Service.GarageDoorOpener(this.name);
}

GarageDoorOpener.prototype = {

	identify: function(callback) {
		this.log("Identify requested!");
		callback();
	},

  _httpRequest: function (url, body, method, callback) {
      request({
          url: url,
          body: body,
          method: this.http_method,
          timeout: this.timeout,
          rejectUnauthorized: false,
          auth: this.auth
      },
          function (error, response, body) {
              callback(error, response, body);
          });
  },

	getCurrentDoorState: function(callback) {
    this.log("[*] currentDoorState :", this.currentDoorState);
    callback(null, this.currentDoorState);
	},

  getTargetDoorState: function(callback) {
    this.log("[*] targetDoorState :", this.targetDoorState);
    callback(null, this.targetDoorState);
	},

  setTargetDoorState: function(value, callback) {
    this.log("[+] targetDoorState from %s to %s", this.targetDoorState, value);
    if (value == 0) { //open
      url = this.openURL;
    } else {
      url = this.closeURL;
    }
    this._httpRequest(url, '', 'GET', function (error, response, responseBody) {
        if (error) {
          this.log("[!] Error setting targetDoorState: %s", error.message);
					callback(error);
        } else {
          this.log("[*] Sucessfully set targetDoorState to %s", value);
          if (value == 0) { //open
            this.targetDoorState = 0;
            this.service.setCharacteristic(Characteristic.CurrentDoorState, Characteristic.CurrentDoorState.OPENING;
            setTimeout(function() {
             this.service.setCharacteristic(Characteristic.CurrentDoorState, Characteristic.CurrentDoorState.OPEN;
            }, this.moveTime);
            this.currentDoorState = 0;
          } else {
            this.targetDoorState = 1;
            this.service.setCharacteristic(Characteristic.CurrentDoorState, Characteristic.CurrentDoorState.CLOSING;
            setTimeout(function() {
             this.service.setCharacteristic(Characteristic.CurrentDoorState, Characteristic.CurrentDoorState.CLOSED;
            }, this.moveTime);
            this.currentDoorState = 1;
          }
          callback();
        }
    }.bind(this));
  },

	getName: function(callback) {
		this.log("getName :", this.name);
		callback(null, this.name);
	},

	getServices: function() {

		this.informationService = new Service.AccessoryInformation();
    this.informationService
		  .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
		  .setCharacteristic(Characteristic.Model, this.model)
		  .setCharacteristic(Characteristic.SerialNumber, this.serial);

		this.service
			.getCharacteristic(Characteristic.Name)
			.on('get', this.getName.bind(this));

    this.service
  		.getCharacteristic(Characteristic.TargetDoorState)
  		.on('get', this.getTargetDoorState.bind(this))
      .on('set', this.setTargetDoorState.bind(this));

    this.service
      .getCharacteristic(Characteristic.CurrentDoorState)
      .on('get', this.getCurrentDoorState.bind(this));

		return [this.informationService, this.service];
	}
};
