'use strict';

// Load Modules

var _ = require('underscore');
var Moment = require('moment-timezone');

// Declare internals

var internals = {
    attributes: {
        name: 'YaloHelpers'
    }
};

/**
 * Function to get the current time by the timezona
 * @param  {string} timezone 
 * @return {object}
 */
internals.getNow = function (timezone) {
    // Get now datetime
    var now = Moment.tz(timezone);
    
    // Get day of week from now date, and set day equal to 7 if day is Sunday
    var day = ( now.day() === 0 ? 7 : now.day() );
    var hour = externals.pad(now.hour(), 2);
    var minute = externals.pad(now.minute(), 2);

    return {
        day: day, 
        timeFormat: parseInt(hour + '' + minute)
    };
};

/**
 * Function to define if store is opened according to the schedule
 * @param  {array}  scheduleData 
 * @param  {object}  timeInfo
 * @return {Boolean}
 */
internals.isOpenedStore = function (scheduleData, timeInfo) {
    var isOpen = false;

    _.each(scheduleData, function (schedule) {

        // Verify if day exists in days of schedule
        var index = _.indexOf(schedule.days, timeInfo.day);

        if (index > -1) {
            // If day exist in array, verify if timeFormat is in array
            _.each(schedule.hours, function (hours) {

                var from = parseInt(hours[0]);
                var to = parseInt(hours[1]);

                if(to > from) {

                    if (timeInfo.timeFormat >= from && timeInfo.timeFormat <= to) {
                        isOpen = true;
                    }
                } else {
                    if ((timeInfo.timeFormat >= from && timeInfo.timeFormat <= 2399) || (timeInfo.timeFormat >=0 && timeInfo.timeFormat <= to)) {
                        isOpen = true;
                    }
                }
            });
        };
    });

    return isOpen;
};

// Declare externals

var externals = {};

/**
 * Function to pad a number with parameter z
 * @param  {number} n     Value of number for pad
 * @param  {number} width Value for lenght the new number
 * @param  {string} z     Value of the pad
 * @return {string}       New number with pad
 */
externals.pad = function (n, width, z) {
    
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

/**
 * Function to return if one store is opened
 * @param  {array}  schedule Value with contains the schedule of store  
 * @param  {string}  timezone Value with the timezone
 * @return {Boolean}          Return true for is opened and false if doesn't
 */
externals.isOpenStoreByTimezone = function (scheduleData, timezone) {

    // Set timezone default    
    timezone = timezone || 'UTC';

    // Get time format by the timezone
    var timeFormat = internals.getNow(timezone);
    
    return internals.isOpenedStore(scheduleData, timeFormat);
};

externals.isOpenStoreByTimeFormat = function (scheduleData, day, timeFormat) {

    return internals.isOpenedStore(scheduleData, {
        day: day,
        timeFormat: timeFormat
    });
}

module.exports = externals;