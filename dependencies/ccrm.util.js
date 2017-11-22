var ccrmUtil = {
    //url取值
    getRequest: function() {
        var url = window.location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    getCookie: function(name) {
        if (document.cookie.length > 0) {
            start = document.cookie.indexOf(name + "=");
            if (start != -1) {
                start = start + name.length + 1;
                end = document.cookie.indexOf(";", start);
                if (end == -1) {
                    end = document.cookie.length;
                }
                return decodeURI(document.cookie.substring(start, end));
            } else {
                return "";
            }
        } else {
            return "";
        }
    },
    getUsrValue: function(name) {
        if (!top.loginUserInfo) return "";
        return top.loginUserInfo[name];
    },
    parseJSON: function(jsonString) { // FROM: json.org,json.js
        // return eval('(' + jsonString + ')');
        return JSON.parse(jsonString);
    },

    errorMessage: function(msg) {
        var element = "<div class='userconfirm'><i class='error'></i><span>" + msg + "</span></div>";
        var d = top.dialog({
            id: 'errorMessage',
            title: '错误提示',
            content: element,
            //width: '260px',
            onclose: function() {}
        });
        d.showModal();
        return false;
    },

    menuCheck: function(objArray) {
        ccrmUtil.dataPost(Constants.MngSys.PATH, "ASYSCHECKMENUBYFUNCLIST", { "X1": objArray }, function(ret) {
            returnData = ret.INFBDY.CHECKMENUBYFUNCLISTZ1;
            if (ret.ERRMSG == "" || ret.ERRMSG == null) {
                var l = returnData.length;
                if (l > 0) {
                    for (i = 0; i < l; i++) {
                        if (returnData[i].flag) {
                            $("#" + returnData[i].id).show();
                            $("." + returnData[i].id).show();
                        }
                    }
                }
            } else {
                ccrmUtil.errorMessage(ret.ERRMSG);
            }
        });
    },

    getAjaxParams: function(prccod, params) {
        var _data = {
            "TARSVR": "",
            "PRCCOD": prccod,
            "WEBCOD": "",
            "ISUDAT": "",
            "ISUTIM": "",
            "DALCOD": "",
            "RTNLVL": "",
            "RTNCOD": "",
            "ERRMSG": "",
            "INFBDY": params
        };
        return JSON.stringify(_data);

    },
    //后态读取
    dataPost: function(path, prccod, param, successFunc) {
        var prccodParam = prccod.substring(4);
        var infbdyData = {};
        for (var x in param) {
            infbdyData[prccodParam + x] = param[x];
        }
        var _data = {
            "TARSVR": "",
            "PRCCOD": prccod,
            "WEBCOD": "",
            "ISUDAT": "",
            "ISUTIM": "",
            "DALCOD": "",
            "RTNLVL": "",
            "RTNCOD": "",
            "ERRMSG": "",
            "INFBDY": infbdyData
        };
        var postData = JSON.stringify(_data);
        $.ajax({
            type: "POST",
            url: "/" + path + "/rmi.do",
            cache: false,
            data: postData,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(ret) {
                if (ret.ERRMSG == "" || ret.ERRMSG == null) {
                    successFunc(ret);
                } else {
                    ccrmUtil.errorMessage(ret.ERRMSG);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (errorThrown) {
                    ccrmUtil.errorMessage(errorThrown);
                }
            }
        });
    },
    //CVM邮件后台数据读取
    cvmDataPost: function(path, prccod, param, successFunc) {
        var prccodParam = prccod.substring(4);
        var infbdyData = {};
        for (var x in param) {
            infbdyData[prccodParam + x] = param[x];
        }
        var _data = {
            "TARSVR": "",
            "PRCCOD": prccod,
            "WEBCOD": "",
            "ISUDAT": "",
            "ISUTIM": "",
            "DALCOD": "",
            "RTNLVL": "",
            "RTNCOD": "",
            "ERRMSG": "",
            "INFBDY": infbdyData
        };
        var postData = JSON.stringify(_data);
        $.ajax({
            type: "POST",
            url: "/" + path + "/rmi.cvm",
            cache: false,
            data: postData,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(ret) {
                if (ret.ERRMSG == "" || ret.ERRMSG == null) {
                    successFunc(ret);
                } else {
                    ccrmUtil.errorMessage(ret.ERRMSG);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (errorThrown) {
                    ccrmUtil.errorMessage(errorThrown);
                }
            }
        });
    },

    /**
     * 自定义错误处理的请求
     */
    dataPostWithErrorFunc: function(path, prccod, param, successFunc, failFunc) {
        failFunc = failFunc || ccrmUtil.errorMessage;
        var prccodParam = prccod.substring(4);
        var infbdyData = {};
        for (var x in param) {
            infbdyData[prccodParam + x] = param[x];
        }
        var _data = {
            "TARSVR": "",
            "PRCCOD": prccod,
            "WEBCOD": "",
            "ISUDAT": "",
            "ISUTIM": "",
            "DALCOD": "",
            "RTNLVL": "",
            "RTNCOD": "",
            "ERRMSG": "",
            "INFBDY": infbdyData
        };
        var postData = JSON.stringify(_data);
        $.ajax({
            type: "POST",
            url: "/" + path + "/rmi.do",
            cache: false,
            data: postData,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(ret) {
                if (ret.ERRMSG == "" || ret.ERRMSG == null) {
                    successFunc(ret);
                } else {
                    failFunc(ret.ERRMSG);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (errorThrown) {
                    failFunc(errorThrown);
                }
            }
        });
    },

    //工商报告后台数据读取
    busDataPost: function(path, prccod, param, successFunc) {
        var _data = {
            "TARSVR": "",
            "PRCCOD": prccod,
            "WEBCOD": "",
            "ISUDAT": "",
            "ISUTIM": "",
            "DALCOD": "",
            "RTNLVL": "",
            "RTNCOD": "",
            "ERRMSG": "",
            "INFBDY": param
        };
        var postData = JSON.stringify(_data);
        $.ajax({
            type: "POST",
            url: "/" + path + "/rmi.do",
            cache: false,
            data: postData,
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function(ret) {
                if (ret.ERRMSG == "" || ret.ERRMSG == null) {
                    successFunc(ret);
                } else {
                    ccrmUtil.errorMessage(ret.ERRMSG);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (errorThrown) {
                    ccrmUtil.errorMessage(errorThrown);
                }
            }
        });
    },
    //金额格式化
    fmoney: function(s, n, ccy) {
        var source = s;
        s = s + '';
        if (!s || s.trim() == '' || isNaN(s)) {
            return "-";
        }
        if (s.indexOf('E') != -1 || s.indexOf('e') != -1) {
            return "<span title='" + s + "'>" + s + "</span>"; //增加对科学计数法的处理
        }
        s = s.trim();
        var startStr = '';
        if (s.substr(0, 1) == '-') {
            startStr = '-';
            s = s.substr(1, s.length);
        }
        n = n > 0 && n <= 20 ? n : 2;
        var sa = s.split(".");
        var l = sa[0].split('').reverse();
        var endStr = '';
        if (sa[1]) {
            if (sa[1].length > n) {
                r = sa[1].substr(0, n);
            } else {
                for (j = 0; j < (n - sa[1].length); j++) {
                    endStr = endStr + "0";
                }
                r = sa[1] + endStr;
            }
        } else {
            for (j = 0; j < n; j++) {
                endStr = endStr + "0";
            }
            r = endStr;
        }
        t = '';
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : '');
        }
        var m = t.split('').reverse().join('');
        if (r != '') {
            m = m + "." + r;
        }
        if (startStr != '') {
            m = startStr + m;
        }
        if (ccy) {
            m = ccy + m;
            source = ccy + source;
        }
        return "<span title='" + source + "'>" + m + "</span>";
    },

    fmoney4Dtl: function(s, n, ccy) {
        var source = s;
        s = s + '';
        if (!s || s.trim() == '' || isNaN(s)) {
            return "-";
        }
        if (s.indexOf('E') != -1 || s.indexOf('e') != -1) {
            return "<span title='" + s + "'>" + s + "</span>"; //增加对科学计数法的处理
        }
        s = s.trim();
        var startStr = '';
        if (s.substr(0, 1) == '-') {
            startStr = '-';
            s = s.substr(1, s.length);
        }
        n = n > 0 && n <= 20 ? n : 2;
        var sa = s.split(".");
        var l = sa[0].split('').reverse();
        var endStr = '';
        if (sa[1]) {
            if (sa[1].length > n) {
                r = sa[1].substr(0, n);
            } else {
                for (j = 0; j < (n - sa[1].length); j++) {
                    endStr = endStr + "0";
                }
                r = sa[1] + endStr;
            }
        } else {
            for (j = 0; j < n; j++) {
                endStr = endStr + "0";
            }
            r = endStr;
        }
        t = '';
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : '');
        }
        var m = t.split('').reverse().join('');
        if (r != '') {
            m = m + "." + r;
        }
        if (startStr != '') {
            m = startStr + m;
        }
        return m;
    },
    fwordTitle: function(s) {
        if (s != null) {
            return '<span title=' + s + '>' + s + '</span>';
        } else {
            return '';
        }
    },

    fnull: function(s) {
        if (s != null) {
            return s;
        } else {
            return '-';
        }
    }

    /*	函数调用例子
     * $(document).ready(function(){
        var array = [{id:"11",funcNo:"21"},{id:"12",funcNo:"22"},{id:"13",funcNo:"23"}];
        ccrmUtil.errorMessage("系统出错。。。");
        ccrmUtil.menuCheck(array);
    });*/

};
window.console = window.console || (function() {
    var c = {};
    c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function() {};
    return c;
})();
var userManage = {
    getAjaxParams: function(prccod, params) {
        var _data = {
            "TARSVR": "",
            "PRCCOD": prccod,
            "WEBCOD": "",
            "ISUDAT": "",
            "ISUTIM": "",
            "DALCOD": "",
            "RTNLVL": "",
            "RTNCOD": "",
            "ERRMSG": "",
            "INFBDY": params
        };
        return JSON.stringify(_data);

    }
};