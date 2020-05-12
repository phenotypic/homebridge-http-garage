<p align="center">
  <a href="https://github.com/homebridge/homebridge"><img src="https://raw.githubusercontent.com/homebridge/branding/master/logos/homebridge-color-round-stylized.png" height="140"></a>
</p>

<span align="center">

# homebridge-http-garage

[![npm](https://img.shields.io/npm/v/homebridge-http-garage.svg)](https://www.npmjs.com/package/homebridge-http-garage) [![npm](https://img.shields.io/npm/dt/homebridge-http-garage.svg)](https://www.npmjs.com/package/homebridge-http-garage)

</span>

## Description

This [homebridge](https://github.com/nfarina/homebridge) plugin exposes a web-based garage opener to Apple's [HomeKit](http://www.apple.com/ios/home/). Using simple HTTP requests, the plugin allows you to open/close the garage. **Please look at [homebridge-web-garage](https://github.com/Tommrodrigues/homebridge-web-garage) if you want a plugin that allows for real-time status updates.**

Find script samples for the opener in the _examples_ folder.

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
| `openTime` | Time (in seconds) to simulate your garage opening | `10` |
| `closeTime` | Time (in seconds) to simulate your garage closing | `10` |
| `autoLock` | Whether your garage should auto-close after being opened | `false` |
| `autoLockDelay` | Time (in seconds) until your garage will automatically close (if enabled) | `20` |
| `pollInterval` | Time (in seconds) between device polls (if `polling` is enabled) | `120` |

### Additional options
| Key | Description | Default |
| --- | --- | --- |
| `timeout` | Time (in milliseconds) until the accessory will be marked as _Not Responding_ if it is unreachable | `3000` |
| `http_method` | HTTP method used to communicate with the device | `GET` |
| `username` | Username if HTTP authentication is enabled | N/A |
| `password` | Password if HTTP authentication is enabled | N/A |
| `model` | Appears under the _Model_ field for the accessory | plugin |
| `serial` | Appears under the _Serial_ field for the accessory | version |
| `manufacturer` | Appears under the _Manufacturer_ field for the accessory | author |
| `firmware` | Appears under the _Firmware_ field for the accessory | version |

## API Interfacing

Your API should be able to:

1. Return JSON information when it receives `/status`:
```
{
    "currentState": INT_VALUE
}
```

2. Set the state when it receives:
```
/setState?value=INT_VALUE
```

## State key
| State | Description |
| --- | --- |
| `0` | Open |
| `1` | Closed |
