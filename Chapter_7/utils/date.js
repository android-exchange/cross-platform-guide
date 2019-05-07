/**
 * 格式化日期
 * formatDate(1520479851,"E, yyyy-MM-dd HH:mm:ss.S") ==> 星期四, 2018-03-08 10:37:45
 * formatDate(1520479851,"E, yyyy-M-d H:m:s.S")      ==> 星期四, 2018-03-08 10:37:45
 */
function formatDate(timeStamp, format) {
    let date = new Date(timeStamp * 1000);
    let weekArr = ["星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
    ];
    let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "E+": weekArr[date.getDay()], //星期0-6
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "f+": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return format;
}

/**
 * 格式化时间
 * timeStamp => {*}天{*}小时{*}分钟{*}秒
 */
function formatTime(timeStamp) {
    let lastTime = timeStamp * 1000;
    let days = Math.floor(lastTime / (24 * 3600 * 1000)); //天数
    lastTime = lastTime % (24 * 3600 * 1000);
    let hours = Math.floor(lastTime / (3600 * 1000)); //小时数
    lastTime = lastTime % (3600 * 1000);
    let minutes = Math.floor(lastTime / (60 * 1000)); //分钟数
    lastTime = lastTime % (60 * 1000);
    let seconds = Math.round(lastTime / 1000); //秒数
    let returnTime = "";
    if (days > 0) {
        returnTime += (days >= 10 ? days : "" + days) + "天 ";
    }
    if (hours > 0) {
        returnTime += (hours >= 10 ? hours : "" + hours) + "小时 ";
    }
    if (minutes > 0) {
        returnTime += (minutes >= 10 ? minutes : "" + minutes) + "分钟 ";
    }
    if (seconds > 0) {
        returnTime += (seconds >= 10 ? seconds : "" + seconds) + "秒";
    }
    if (timeStamp == 0) {
        returnTime = "0秒";
    }
    return returnTime;
}
/**
 * 格式化优惠券剩余时间
 * @param {*} timeStamp 
 */
function formatTimeToCoupon(timeStamp) {
    let nowTime = new Date().getTime();
    let lastTime = timeStamp * 1000 - nowTime;
    let days = Math.floor(lastTime / (24 * 3600 * 1000)); //天数
    lastTime = lastTime % (24 * 3600 * 1000);
    let hours = Math.floor(lastTime / (3600 * 1000)); //小时数
    lastTime = lastTime % (3600 * 1000);
    let minutes = Math.floor(lastTime / (60 * 1000)); //分钟数
    lastTime = lastTime % (60 * 1000);
    let value = 0;
    let unit = '分钟';
    if (days > 0) {
        value = days;
        unit = '天';
    } else if (hours > 0) {
        value = hours;
        unit = '小时';
    } else if (minutes > 0) {
        value = minutes;
        unit = '分钟';
    }
    return {
        value: value,
        unit: unit
    };
}

/** 
 * 格式化时间分钟
 * timeStamp => {*}（分钟）
 */
function formatTimeToMinutes(timeStamp) {
    let minutes = Math.floor(timeStamp * 1000 / (60 * 1000)); //分钟数
    return minutes >= 0 ? minutes : 0;
}

/** 
 * 格式化时间 按时计费
 * timeStamp => {*}/天，{*}/小时，{*}/分钟，{*}/秒
 */
function formatTimeToPackage(timeStamp) {
    let lastTime = timeStamp * 1000;
    let days = Math.floor(24 * 3600 * 1000); //天数
    let hours = Math.floor(3600 * 1000); //小时数
    let minutes = Math.floor(60 * 1000); //分钟数
    let seconds = Math.round(1000); //秒数
    let returnTime = "";
    if (days == lastTime) {
        returnTime += "/天";
    } else if (hours == lastTime) {
        returnTime += "/小时";
    } else if (minutes == lastTime) {
        returnTime += "/分钟";
    } else if (seconds == lastTime) {
        returnTime += "/秒";
    }
    return returnTime;
}

module.exports = {
    formatDate: formatDate,
    formatTime: formatTime,
    formatTimeToCoupon: formatTimeToCoupon,
    formatTimeToMinutes: formatTimeToMinutes,
    formatTimeToPackage: formatTimeToPackage
};