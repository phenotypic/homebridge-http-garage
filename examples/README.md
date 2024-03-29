## Description

This script interfaces with [homebridge](https://github.com/homebridge/homebridge) to expose a relay to Apple's [HomeKit](http://www.apple.com/ios/home/), allowing you to integrate a garage into your smart home.

## Requirements

* NodeMCU

* Relay Module

* Pin header cables

* Micro-USB cable

## How-to

1. First, install the `ArduinoJson` library from the _Library manager_ in the Arduino IDE, then follow [this](https://gist.github.com/phenotypic/8d9d3b886936ccea9c21f495755640dd) gist which walks you through how to flash a NodeMCU. When doing this, you should change the username and password, and insert your own SSL certificates.

2. Assuming that you already have [homebridge](https://github.com/homebridge/homebridge#installation) set up, the next thing you will have to do is install the plugin:
```
npm install -g homebridge-http-garage
```

3. Finally, update your `config.json` file following the example below:

```json
"accessories": [
    {
       "accessory": "GarageDoorOpener",
       "name": "Garage",
       "apiroute": "https://garage.local",
       "username": "admin",
       "password": "esp8266"
     }
]
```

## Wiring

| NodeMCU | Relay Module |
| --- | --- |
| `3V3` | `VCC` |
| `GND` | `GND` |
| `D7` | `IN1` |
