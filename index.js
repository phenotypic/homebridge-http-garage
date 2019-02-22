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

  this.openTime = config.openTime || 5;
  this.closeTime = config.closeTime || 5;

  this.autoLock = config.autoLock || false;
  this.autoLockDelay = config.autoLockDelay || 10;

  if(this.username != null && this.password != null){
    this.auth = {
      user : this.username,
      pass : this.password
    };
  }

  this.log(this.name);

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

  setTargetDoorState: function(value, callback) {
    this.log("[+] Setting targetDoorState to %s", value);
    if (value == 1) { url = this.closeURL } else { url = this.openURL }
    this._httpRequest(url, '', this.http_method, function (error, response, responseBody) {
        if (error) {
          this.log("[!] Error setting targetDoorState: %s", error.message);
					callback(error);
        } else {
          if (value == 1) {
            this.log("[*] Started closing");
            this.simulateClose();
          } else {
            this.log("[*] Started opening");
            if (this.autoLock) {
              this.autoLockFunction();
            }
            this.simulateOpen();
          }
          callback();
        }
    }.bind(this));
  },

  simulateOpen: function() {
    this.service.setCharacteristic(Characteristic.CurrentDoorState, Characteristic.CurrentDoorState.OPENING);
    setTimeout(() => {
      this.service.setCharacteristic(Characteristic.CurrentDoorState, Characteristic.CurrentDoorState.OPEN);
      this.log("[*] Finished opening");
    }, this.openTime * 1000);
  },

  simulateClose: function() {
    this.service.setCharacteristic(Characteristic.CurrentDoorState, Characteristic.CurrentDoorState.CLOSING);
    setTimeout(() => {
      this.service.setCharacteristic(Characteristic.CurrentDoorState, Characteristic.CurrentDoorState.CLOSED);
      this.log("[*] Finished closing");
    }, this.closeTime * 1000);
  },

  autoLockFunction: function() {
    this.log("[+] Waiting %s seconds for autolock", this.autoLockDelay);
    setTimeout(() => {
      this.service.setCharacteristic(Characteristic.TargetDoorState, Characteristic.TargetDoorState.CLOSED);
      this.log("[*] Autolocking");
    }, this.autoLockDelay * 1000);
  },

	getServices: function() {

    this.service.setCharacteristic(Characteristic.CurrentDoorState, Characteristic.CurrentDoorState.CLOSED);
    this.service.setCharacteristic(Characteristic.TargetDoorState, Characteristic.TargetDoorState.CLOSED);

		this.informationService = new Service.AccessoryInformation();
    this.informationService
		  .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
		  .setCharacteristic(Characteristic.Model, this.model)
		  .setCharacteristic(Characteristic.SerialNumber, this.serial);

    this.service
  		.getCharacteristic(Characteristic.TargetDoorState)
      .on('set', this.setTargetDoorState.bind(this));

		return [this.informationService, this.service];
	}
};
