"use strict";

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; };
}();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 自定义select选择插件
 * 依赖dialog插件
 *
 * @author RT02512 王卫超
 * @class CrmSelect
 */
var CrmSelect = function() {
    /**
     * Creates an instance of CrmSelect.
     * @author RT02512 王卫超
     * @param {
     *      wrapper-selector:string, // 整个选择框的包装元素选择器，需要是一个id
     *      defaultSelect:object, // 默认初始选中的项  对象中包含val，name属性
     *      selectOptions:object[] // 下拉列表项 数组中每个都是一个对象，包含val,name属性
     *      selectCallBack:({currentVal:"",currentName:""}，e)=>{}; // 选择每项的回调函数,可选
     *      e.target代表选择到的这一元素标签,
     *      前面的对象中的currentVal代表当前选中的val，currentName代表当前选中的name
     *
     * }} options 配置项
     *
     * @memberof CrmSelect
     */
    function CrmSelect(options) {
        _classCallCheck(this, CrmSelect);

        //
        this.defaultOptions = {
            "defaultSelect": options.selectOptions ? options.selectOptions[0] : "" // 默认选择第一个
        };
        this.options = $.extend({}, this.defaultOptions, options);
        this.initSelect();
    }

    _createClass(CrmSelect, [{
        key: "initSelect",

        /**
        猝然人体
         *
         * @author RT02512 王卫超
         * @memberof CrmSelect
         */
        value: function initSelect() {
            if (this.options.selectOptions && Object.prototype.toString.call(this.options.selectOptions).slice(8, -1) == "Array" && this.options.selectOptions.length !== 0) {
                var isSelectOptionsHasNameAndVal = this.options.selectOptions.every(function(item, key) {
                    return item.name && item.val;
                });
                if (isSelectOptionsHasNameAndVal) {
                    this.render();
                } else {
                    this.errorMessageDialog("selectOptions\u4E2D\u7684\u5BF9\u8C61\u5FC5\u987B\u5305\u542Bname\uFF0Cval");
                }
            } else {
                this.errorMessageDialog("\u4F20\u5165\u7684selectOptions\u5FC5\u987B\u4E3A\u6570\u7EC4\u4E14\u4E0D\u80FD\u4E3A\u7A7A\u6570\u7EC4");
            }
        }
    }, {
        key: "render",

        /**
         * 初始化列表渲染
         *
         * @author RT02512 王卫超
         * @memberof CrmSelect
         */
        value: function render() {
            var _this = this;

            var selectHtml = "",
                selectBodyHtml = "";
            this.options.selectOptions.forEach(function(item, key) {
                if (item.name && item.val) {
                    if (item.val === _this.options.defaultSelect.val) {
                        selectBodyHtml += "<li data-val=\"" + item.val + "\" class=\"checked\">" + item.name + "</li>";
                    } else {
                        selectBodyHtml += "<li data-val=\"" + item.val + "\">" + item.name + "</li>";
                    }
                }
            });
            var isDefaultSelectInSelectOptions = this.options.selectOptions.some(function(item, key) {
                return item.name === _this.options.defaultSelect.name && item.val === _this.options.defaultSelect.val;
            });
            if (!isDefaultSelectInSelectOptions) {
                this.errorMessageDialog("defaultSelect\u5FC5\u987B\u4E3AselectOptions\u4E2D\u7684\u4E00\u4E2A");
                return false;
            }
            selectHtml = "<div class=\"fll crm-select clearfix\">\n                        <div class=\"crm-select-header\" data-val=\"" + this.options.defaultSelect.val + "\">" + this.options.defaultSelect.name + "</div>\n                        <ol class=\"crm-select-body\" style=\"display: none;\">\n                            " + selectBodyHtml + "\n                        </ol>\n                        <div class=\"dropback\" style=\"display:none;\"></div>\n                      </div>";
            $(this.wrapperSelector).html(selectHtml);
            this.bindSelectHeaderClickHandler();
            this.bindDropBackClickHandler();
            this.bindSelectBodyClickHandler();
        }
    }, {
        key: "errorMessageDialog",

        /**
         * 错误提示弹出框
         *
         * @author RT02512 王卫超
         * @param {any} content 提示语句
         * @memberof CrmSelect
         */
        value: function errorMessageDialog(content) {
            var errorDialog = top.dialog({
                title: "错误提示",
                content: "<div class='userconfirm'><i class='error'></i><span>" + content + "</span></div>",
                onclose: function onclose() {
                    errorDialog.close();
                    errorDialog.remove();
                },
                button: [{
                    value: '关闭',
                    callback: function callback() {
                        errorDialog.close();
                        errorDialog.remove();
                    }
                }]
            }).showModal();
        }
    }, {
        key: "bindSelectHeaderClickHandler",

        /**
         * 选择框展示隐藏下拉框点击事件
         *
         * @memberof CrmSelect
         */
        value: function bindSelectHeaderClickHandler() {
            var _this2 = this;

            $(this.selectHeaderSelector).click(function() {
                $(_this2.selectHeaderSelector).toggleClass("show-body");
                $(_this2.selectBodySelector).toggle();
                $(_this2.dropBackSelector).toggle();
            });
        }
    }, {
        key: "bindDropBackClickHandler",

        /**
         * 背景透明层点击，隐藏弹框事件
         *
         * @memberof CrmSelect
         */
        value: function bindDropBackClickHandler() {
            var _this3 = this;

            $(this.dropBackSelector).click(function() {
                $(_this3.selectHeaderSelector).removeClass("show-body");
                $(_this3.selectBodySelector).hide();
                $(_this3.dropBackSelector).hide();
            });
        }
    }, {
        key: "bindSelectBodyClickHandler",

        /**
         * 下拉选择框点击事件
         *
         * @memberof CrmSelect
         */
        value: function bindSelectBodyClickHandler() {
            var _this4 = this;

            $(this.selectBodySelector).click(function(e) {
                $(_this4.selectHeaderSelector).removeClass("show-body");
                $(_this4.selectBodySelector).hide();
                $(_this4.dropBackSelector).hide();
                if ($(e.target).hasClass("checked")) {
                    return;
                }
                $(e.target).addClass("checked").siblings().removeClass("checked");
                $(_this4.selectHeaderSelector).attr("data-val", $(e.target).attr("data-val"));
                $(_this4.selectHeaderSelector).html($(e.target).text());
                var selectCallBack = _this4.options.selectCallBack; // 成功添加回复后的回调
                if (selectCallBack && typeof selectCallBack === "function") {
                    selectCallBack({
                        currentVal: $(e.target).attr("data-val"),
                        currentName: $(e.target).text()
                    }, e);
                }
            });
        }
    }, {
        key: "wrapperSelector",
        get: function get() {
            return this.options["wrapper-selector"];
        }
    }, {
        key: "selectHeaderSelector",
        get: function get() {
            return this.wrapperSelector + " .crm-select-header";
        }
    }, {
        key: "selectBodySelector",
        get: function get() {
            return this.wrapperSelector + " .crm-select-body";
        }
    }, {
        key: "dropBackSelector",
        get: function get() {
            return this.wrapperSelector + " .dropback";
        }
    }]);

    return CrmSelect;
}();