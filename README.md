# homebridge-http-garage

#### Homebridge plugin to control a web-based garage

## Description

homebridge-http-garage exposes a garage to HomeKit, and makes it controllable via simple HTTP requests, automatically simulating opening/closing times.

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
| Key | Description | Type | Default |
| --- | --- | --- | --- |
| `accessory` | Must be `GarageDoorOpener` | `string` | N/A |
| `name` | Name to appear in the Home app | `string` | N/A |
| `openURL` | URL to trigger the opening of your garage | `string` | N/A |
| `closeURL` | URL to trigger the closing of your garage | `string` | N/A |

### Optional fields
| Key | Description | Type | Default |
| --- | --- | --- | --- |
| `openTime` _(optional)_ | Time to simulate your garage opening | `integer` (seconds) | `5` |
| `closeTime` _(optional)_ | Time to simulate your garage closing | `integer` (seconds) | `5` |
| `autoLock` _(optional)_ | Whether your garage should auto-close after being opened | `boolean` | `false` |
| `autoLockDelay` _(optional)_ | Time until your garage will automatically close if enabled | `integer` (seconds) | `5` |

### Additional options
| Key | Description | Type | Default |
| --- | --- | --- | --- |
| `timeout` _(optional)_ | Time until the accessory will be marked as "Not Responding" if it is unreachable | `integer` (milliseconds) | `5000` |
| `http_method` _(optional)_ | The HTTP method used to communicate with the thermostat | `string` | `GET` |
| `username` _(optional)_ | Username if HTTP authentication is enabled | `string` | N/A |
| `password` _(optional)_ | Password if HTTP authentication is enabled | `string` | N/A |
| `model` _(optional)_ | Appears under "Model" for your accessory in the Home app | `string` | `homebridge-http-garage` |
| `serial` _(optional)_ | Appears under "Serial" for your accessory in the Home app | `string` | `HTTP Serial Number` |
| `manufacturer` _(optional)_ | Appears under "Manufacturer" for your accessory in the Home app | `string` | `HTTP Manufacturer` |

