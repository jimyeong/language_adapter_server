const { DateTime, Interval } = require("luxon");

Interval.fromISO();

const helper = {
    setColor: (hex, percent) => {
        // strip the leading # if it's there
        hex = hex.replace(/^\s*#|\s*$/g, "");

        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if (hex.length == 3) {
            hex = hex.replace(/(.)/g, "$1$1");
        }

        var r = parseInt(hex.substr(0, 2), 16),
            g = parseInt(hex.substr(2, 2), 16),
            b = parseInt(hex.substr(4, 2), 16);

        return (
            "#" +
            (0 | ((1 << 8) + r + ((256 - r) * percent) / 100))
                .toString(16)
                .substr(1) +
            (0 | ((1 << 8) + g + ((256 - g) * percent) / 100))
                .toString(16)
                .substr(1) +
            (0 | ((1 << 8) + b + ((256 - b) * percent) / 100))
                .toString(16)
                .substr(1)
        );
    },
    pixelToRem: (px) => {
        const baseFontSize = 16;
        let value;
        if (typeof px === "string") {
            const filter = /\d+/g;
            value = px.match(filter)[0];
        } else {
            value = px;
        }
        const rem = value / baseFontSize;
        return `${rem}rem`;
    },
    setLowerCase: (string) => {
        if (typeof string === "string") {
            return string.toLowerCase();
        }
        return string;
    },
    ConsoleHelper: (data) => {
        if (process.env.REACT_APP_ENV === "production") return;
        console.log(data);
    },
    setRangeIndex: (reqNum, dataLength) => {
        const start = 0 + dataLength * (reqNum - 1);
        const end = start + dataLength - 1;

        return [start, end];
    },

    getUserBrowser: () => {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf("Edg") != -1) return "Edge";
        if (userAgent.indexOf("chrome") != -1) return "Chrome";
        if (userAgent.indexOf("opera") != -1) return "Opera";
        if (userAgent.indexOf("staroffice") != -1) return "Star Office";
        if (userAgent.indexOf("webtv") != -1) return "WebTV";
        if (userAgent.indexOf("beonex") != -1) return "Beonex";
        if (userAgent.indexOf("chimera") != -1) return "Chimera";
        if (userAgent.indexOf("netpositive") != -1) return "NetPositive";
        if (userAgent.indexOf("phoenix") != -1) return "Phoenix";
        if (userAgent.indexOf("firefox") != -1) return "Firefox";
        if (userAgent.indexOf("safari") != -1) return "Safari";
        if (userAgent.indexOf("skipstone") != -1) return "SkipStone";
        if (userAgent.indexOf("netscape") != -1) return "Netscape";
        if (userAgent.indexOf("mozilla/5.0") != -1) return "Mozilla";
        if (userAgent.indexOf("msie") != -1) {
            let rv = -1;
            let ua;
            let re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            if (navigator.appName == "Microsoft Internet Explorer") {
                ua = navigator.userAgent;
            }
            if (re.exec(ua) != null) {
                rv = parseFloat(RegExp.$1);
            }
            return "Internet Explorer " + rv;
        }
    },
    checkNameValid: (name) => {
        const nameChecker = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
        const result = nameChecker.test(name);
        return result;
    },
    checkEmailValid: (email) => {
        const emailChecker =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = emailChecker.test(email);
        return result;
    },
    checkHtmlInjectionValid: (content) => {
        const htmlTagInjectionChecker = /(<([^>]+)>)/gi;
        const result = htmlTagInjectionChecker.test(content);
        const valid = result ? false : true;
        return valid;
    },
    checkNumber: (number) => {
        const numberChecker = /^[0-9]/g;
        const result = numberChecker.test(number);
        return result;
    },
    truncate: (str, n) => {
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
    },

    isNull: (data) => {
        if (data === undefined || data === null || data === "") {
            return true;
        }
        return false;
    },
    isDate: (date) => {
        if (
            Object.prototype.toString.call(date) === "[object Date]" &&
            !isNaN(date)
        ) {
            return true;
        }
        return false;
    },
    getCertainDateFromNow: (
        {
            years = null,
            months = null,
            days = null,
            minutes = null,
            seconds = null,
        },
        format
    ) => {
        const body = {};
        if (years) body.years = years;
        if (months) body.months = months;
        if (days) body.days = days;
        if (minutes) body.minutes = minutes;
        if (seconds) body.seconds = seconds;
        const formatted = DateTime.local().plus(body).toFormat(format);
        return formatted;
    },
    dateFormatter: (selectedDate, format) => {
        if (helper.isDate(selectedDate)) {
            const day = selectedDate.getDate(); //  일
            const month = selectedDate.getMonth() + 1; // 월
            const year = selectedDate.getFullYear(); // 년
            const hour = selectedDate.getHours();
            const minute = selectedDate.getMinutes();
            const second = selectedDate.getSeconds();
            const formatted = DateTime.fromObject({
                year,
                month,
                day,
                hour,
                minute,
                second,
            }).toFormat(format);
            return formatted;
        }
        return console.error("invalid date type");
    },

    getCurrentTimeIntoAmPm: (selectedDate) => {
        return helper.dateFormatter(selectedDate, "a h:mm");
    },
    dateKoreanFormatterInDay: (selectedDate) => {
        const index = selectedDate.getDay();
        const koreanDateFormat = {
            0: "일",
            1: "월",
            2: "화",
            3: "수",
            4: "목",
            5: "금",
            6: "토",
        };
        return koreanDateFormat[index];
    },
    dateKoreanFormatter: (selectedDate) => {
        return helper.dateFormatter(selectedDate, "yyyy년 LL월 dd일");
    },
    dateBasicFormatter: (selectedDate) => {
        return helper.dateFormatter(selectedDate, "yyyy-LL-dd");
    },
    getIOSStringTime: (date) => {
        const a = new Date(date);
        if (helper.isDate(a)) {
            return a.toISOString();
        }
        return null;
    },
    simpleDateComparisonUtilForTestNotInPractice: () => {
        const a = new Date("2021-09-20T00:00:00.000Z").getTime();
        const b = new Date("2021-09-20").getTime();
        if (a > b) {
            console.log("A is bigger than B");
        } else if (a == b) {
            console.log("A is the same as B");
        } else {
            console.log("A is less than B");
        }
    },
    compareDate: (a, b) => {
        const i1 = new Date(a.toString()).getTime();
        const i2 = new Date(b.toString()).getTime();

        if (i1 > i2) return 1;
        if (i1 === i2) return 0;
        if (i1 < i2) return -1;
    },

    checkIfDateInRange: (dateStr, start, end) => {
        // 나중에 if조건절 추가해주기 에러 안나게(방어코드)
        let isInRange = false;
        const firstCondition = helper.compareDate(dateStr, start);
        const secondCondition = helper.compareDate(dateStr, end);
        if (firstCondition == 0 || firstCondition == 1) {
            if (secondCondition == 0 || secondCondition == -1) {
                isInRange = true;
            }
        }
        return isInRange;
    },
    truncateDateIntoYYYYMMdd: (date) => {
        return date.split(" ")[0];
    },
    clearAllLotationState: () => {
        window.history.replaceState({}, document.title);
    },
};

module.exports = helper;
