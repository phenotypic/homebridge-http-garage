# homebridge-http-garage

#### Homebridge plugin to control a web-based garage

## Description

homebridge-http-garage exposes a garage to HomeKit and makes it controllable via simple HTTP requests, automatically simulating opening/closing times.

## Installation

1. Install [homebridge](https://github.com/nfarina/homebridge#installation-details)
2. Install this plugin: `sudo npm install -g homebridge-http-garage`
3. Update your `config.json` file (See below).

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
| Key | Description |
| --- | --- |
| `accessory` | Must be `GarageDoorOpener` |
| `name` | Name to appear in the Home app |
| `openURL` | URL to trigger the opening of your garage |
| `closeURL` | URL to trigger the closing of your garage |

### Optional fields
| Key | Description |
| --- | --- |
| `openTime` _(optional)_ | Time (in seconds) to simulate your garage opening (default is `5`) |
| `closeTime` _(optional)_ | Time (in seconds) to simulate your garage closing (default is `5`) |
| `autoLock` _(optional)_ | Whether your garage should auto-close after being opened (default `false`) |
| `autoLockDelay` _(optional)_ | Time (in seconds) until your garage will automatically close if enabled (default is `10`) |

### Additional options
| Key | Description |
| --- | --- |
| `timeout` _(optional)_ | Time (in milliseconds) until the accessory will be marked as "Not Responding" if it is unreachable (`5000` is default) |
| `http_method` _(optional)_ | The HTTP method used to communicate with the thermostat (`GET` is default) |
| `username` _(optional)_ | Username if HTTP authentication is enabled |
| `password` _(optional)_ | Password if HTTP authentication is enabled |
| `model` _(optional)_ | Appears under "Model" for your accessory in the Home app |
| `serial` _(optional)_ | Appears under "Serial" for your accessory in the Home app |
| `manufacturer` _(optional)_ | Appears under "Manufacturer" for your accessory in the Home app |

