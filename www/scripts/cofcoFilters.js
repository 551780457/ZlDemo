//缩略图处理
app.filter("imgZoom", [function () {
    return function (arg) {
        if (arg[0] == null || arg[0] == "") return "";

        var url = arg[0],
            tf = arg[1] || false,
            urlFirst = url.substring(0, url.lastIndexOf("/")),
            img = url.substring(url.lastIndexOf("/"), url.length),
            hostName = "zlapp.weiweibao.com";
        if (tf) {
            url = "http://" + hostName + urlFirst + "/thumbnail" + img;
        } else {
            url = "http://" + hostName + urlFirst + img;
        }
        return url;
    }
}]);

//模块判断
app.filter("Modules", [function () {
    return function (input) {
        if (input == "P0132") {
            return "悦客会";
        } else if (input == "P0133") {
            return "置业中心";
        } else if (input == "P0134") {
            return "会所";
        } else if (input == "P0136") {
            return "物业";
        }
    }
}]);


//用于处理活动当中是否是收费
app.filter('Date', [function () {
    return function (input) {
        //对Date的扩展，将 Date 转化为指定格式的String
        //月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
        //年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
        //eg:
        //"yyyy-MM-dd hh:mm:ss.S" ==> 2006-07-02 08:09:04.423
        //"yyyy-MM-dd E HH:mm:ss" ==> 2009-03-10 二 20:09:04
        //"yyyy-MM-dd EE hh:mm:ss" ==> 2009-03-10 周二 08:09:04
        //"yyyy-MM-dd EEE hh:mm:ss" ==> 2009-03-10 星期二 08:09:04
        //"yyyy-M-d h:m:s.S" ==> 2006-7-2 8:9:4.18

        //将json日期格式(如:/Date(1364216128437+0800)/)转换为js中Date对象
        var date = new Date(parseInt(input.replace("/Date(", "").replace(")/", ""), 10)),
            fmt = "yyyy-MM-dd";
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };
}]);

//积分状态判断
app.filter('IntegralOrderState', [function () {
    return function (state) {
        var strState = "";
        switch (state) {
            case 0:
                strState = "待处理";
                break;
            case 1:
                strState = "已兑换";
                break;
        }
        return strState;
    }
}])

app.filter('SubstringDate', [function () {
    return function (input) {
        if(input) {
            input = input.toString().substring(0, 10);
            return input;
        }
    }
}])

//品质调研控件类型判断
app.filter('CustomTableShowTypeFilter', [function () {
    return function (input) {
        switch (input) {
            case 1:
                return "text";
            case 2:
                return "radio";
            case 3:
                return "text";
            case 4:
                return "checkbox";
        }
    };
}]);

//来源编码
app.filter('Source', [function () {
    return function (input) {
        if (input == "P0132") {
            return "悦客会";
        } else if (input == "P0133") {
            return "置业中心";
        } else if (input == "P0134") {
            return "会所";
        } else if (input == "P0136") {
            return "物业";
        }

    };
}]);
//购房状态
app.filter('Gf_state', [function () {
    return function (input) {
        var htm = "";
        if (input == "签约") {
            htm = "<span class='qian'>签约</span>";
        }
        else if (input == "认购") {
            htm = "<span>认购</span>";
        }
        else {
            htm = "<span class='shop'>购房</span>";
        }
        return htm;
    }
}]);

app.filter('ChangeHtml', [function () {
    return function (input) {
        var htm = "<div>";
        htm += input;
        htm += "</div>";
        return htm;
    }
}]);

app.filter("DateStringFormat", [function () {
    return function (DateString) {
        if (DateString == undefined) return "";
        var FormatDate = new Date(Date.parse(DateString.replace(/-/g, "/")));
        return FormatDate.getFullYear() + "-" + (FormatDate.getMonth() + 1) + "-" + FormatDate.getDate();
    }
}]);