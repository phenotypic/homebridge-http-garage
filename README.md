# homebridge-http-garage

[![npm](https://img.shields.io/npm/dt/homebridge-http-garage.svg)](https://www.npmjs.com/package/homebridge-http-garage) [![npm](https://img.shields.io/npm/v/homebridge-http-garage.svg)](https://www.npmjs.com/package/homebridge-http-garage)

## Description

This [homebridge](https://github.com/nfarina/homebridge) plugin exposes a web-based garage opener to to Apple's [HomeKit](http://www.apple.com/ios/home/). Using simple HTTP requests, you can turn open/close the garage.

## Installation

1. Install [homebridge](https://github.com/nfarina/homebridge#installation-details)
2. Install this plugin: `npm install -g homebridge-http-garage`
3. Update your `config.json`

## Configuration

```json
"accessories": [
     {
       "accessory": "GarageDoorOpener",
       "name": "Garage",
       "openURL": "http://myurl.com/open",
       "closeURL": "http://myurl.com/close"
     }
]
```

### Core
| Key | Description | Default |
| --- | --- | --- |
| `accessory` | Must be `GarageDoorOpener` | N/A |
| `name` | Name to appear in the Home app | N/A |
| `openURL` | URL to trigger the opening of your garage | N/A |
| `closeURL` | URL to trigger the closing of your garage | N/A |

### Optional fields
| Key | Description | Default |
| --- | --- | --- |
| `openTime` _(optional)_ | Time (in seconds) to simulate your garage opening | `5` |
| `closeTime` _(optional)_ | Time (in seconds) to simulate your garage closing | `5` |
| `autoLock` _(optional)_ | Whether your garage should auto-close after being opened | `false` |
| `autoLockDelay` _(optional)_ | Time (in seconds) until your garage will automatically close (if enabled) | `10` |

### Additional options
| Key | Description | Default |
| --- | --- | --- |
| `timeout` _(optional)_ | Time (in milliseconds) until the accessory will be marked as "Not Responding" if it is unreachable | `3000` |
| `http_method` _(optional)_ | The HTTP method used to communicate with the thermostat | `GET` |
| `username` _(optional)_ | Username if HTTP authentication is enabled | N/A |
| `password` _(optional)_ | Password if HTTP authentication is enabled | N/A |
| `model` _(optional)_ | Appears under the "Model" field for the device | `homebridge-http-garage` |
| `serial` _(optional)_ | Appears under the "Serial" field for the device | N/A |
| `manufacturer` _(optional)_ | Appears under the "Manufacturer" field for the device | `Tom Rodrigues` |
