# Helpers

A library with helper functions for Yalo.

## Install

- Run the command `npm install yalo-helpers` use the flag `--save` to add your `package.json` file.

## Functions

- [Store is opened by timezone](#store-is-opened-by-timezone)
- [Store is opened by time format](#store-is-opened-by-time-format)

## Requirements

For function with contains schedule, the schedule was the following the next format: 

```
var schedule = [
        {
            days: [
                1,
                3,
                5
            ],
            hours: [
                [
                    "0800",
                    "1300"
                ],
                [
                    "1400",
                    "2000"
                ]
            ]
        }
    ];
```

### Store is opened by timezone

The function recieve two arguments:

- Schedule this is required
- Timezone this is not required, but is not assign then its value will be 'UTC'

```javascript
var Helpers = require('yalo-helpers');

var isOpen = Helpers.isOpenStoreByTimeFormat(schedule, 'America/Mexico');
console.log('Store is open: ', isOpen);
```

### Store is opened by time format

The function recieve three arguments:

- Schedule this is required
- Day this is required, is a day of week Monday is 1 and Sunday is 7
- Timeformat is the hour ex. for 9 a.m. sould be 900



```javascript
var Helpers = require('yalo-helpers');

var isOpen = Helpers.isOpenStoreByTimeFormat(schedule, 1, 900);
console.log('Store is open: ', isOpen);
```

---

With :heart: by [Yalo](https://github.com/yalochat)