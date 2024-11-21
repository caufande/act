import * as ics from 'ics';
import { shouldBeObject, getParameterError } from '../../utils/index.js';
import { MethodHandler } from '../../utils/handler.js';
import { createDownload } from '../../utils/helper.js';

// 日历
const addPhoneRepeatCalendar = (options) => {
    const methodName = 'addPhoneRepeatCalendar';
    // options must be an Object
    const isObject = shouldBeObject(options);
    if (!isObject.flag) {
        const res = { errMsg: `${methodName}:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const { title, startTime = new Date().getTime(), allDay = false, description = '', location = '', endTime, alarm = true, alarmOffset = 0, repeatInterval = 'month', repeatEndTime, success, fail, complete, } = options;
    const handle = new MethodHandler({ name: methodName, success, fail, complete });
    if (typeof title !== 'string') {
        return handle.fail({
            errMsg: getParameterError({
                para: 'title',
                correct: 'String',
                wrong: title
            })
        });
    }
    const start = new Date(startTime);
    const end = new Date(endTime || startTime);
    if (!endTime && allDay) {
        end.setDate(end.getDate() + 1);
    }
    const interval = 1000 * 60 * 60 * 24;
    let days = 1;
    let repeat = 1;
    if (repeatEndTime) {
        const repeatEnd = new Date(repeatEndTime);
        if (repeatEnd < start) {
            return handle.fail({
                errMsg: 'repeatEndTime must be greater than startTime'
            });
        }
        switch (repeatInterval) {
            case 'week':
                days = 7;
                break;
            case 'month':
                days = 30;
                break;
            case 'year':
                days = 365;
                break;
            default:
        }
        repeat = Math.ceil((repeatEnd.getTime() - start.getTime()) / (interval * days));
    }
    const { error, value } = ics.createEvent({
        title,
        start: parseTime2Array(start, allDay),
        description,
        location,
        end: parseTime2Array(end, allDay),
        alarms: alarm ? [{
                action: 'display',
                description,
                trigger: {
                    before: true,
                    seconds: alarmOffset,
                },
                duration: {
                    days,
                },
                repeat,
            }] : [],
    });
    if (error || !value) {
        return handle.fail({
            errMsg: error === null || error === void 0 ? void 0 : error.message
        });
    }
    const url = URL.createObjectURL(new Blob([value]));
    createDownload(url, `${title}.ics`);
    return handle.success();
};
const addPhoneCalendar = (options) => {
    const methodName = 'addPhoneCalendar';
    // options must be an Object
    const isObject = shouldBeObject(options);
    if (!isObject.flag) {
        const res = { errMsg: `${methodName}:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const { title, startTime = new Date().getTime(), allDay = false, description = '', location = '', endTime, alarm = true, alarmOffset = 0, success, fail, complete, } = options;
    const handle = new MethodHandler({ name: methodName, success, fail, complete });
    if (typeof title !== 'string') {
        return handle.fail({
            errMsg: getParameterError({
                para: 'title',
                correct: 'String',
                wrong: title
            })
        });
    }
    const start = new Date(startTime);
    const end = new Date(endTime || startTime);
    if (!endTime && allDay) {
        end.setDate(end.getDate() + 1);
    }
    const { error, value } = ics.createEvent({
        title,
        start: parseTime2Array(start, allDay),
        description,
        location,
        end: parseTime2Array(end, allDay),
        alarms: alarm ? [{
                action: 'display',
                description,
                trigger: {
                    before: true,
                    seconds: alarmOffset,
                },
            }] : [],
    });
    if (error || !value) {
        return handle.fail({
            errMsg: error === null || error === void 0 ? void 0 : error.message
        });
    }
    const url = URL.createObjectURL(new Blob([value]));
    createDownload(url, `${title}.ics`);
    return handle.success();
};
function parseTime2Array(time, allDay = false) {
    const t = new Date(time);
    const timeArr = [
        t.getFullYear(),
        t.getMonth() + 1,
        t.getDate(),
    ];
    if (!allDay) {
        timeArr.push(t.getHours(), t.getMinutes());
    }
    return timeArr;
}

export { addPhoneCalendar, addPhoneRepeatCalendar };
//# sourceMappingURL=calendar.js.map
