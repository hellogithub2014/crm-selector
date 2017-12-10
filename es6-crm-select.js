/**
 * 自定义select选择插件
 * 依赖dialog插件
 *
 * @class CrmSelect
 */
class CrmSelect {
    /**
     * Creates an instance of CrmSelect.
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
    constructor(options) {
        //
        this.defaultOptions = {
            "defaultSelect": options.selectOptions ? options.selectOptions[0] : "", // 默认选择第一个
        };
        this.options = $.extend({}, this.defaultOptions, options);
        this.initSelect();
    };
    get wrapperSelector() {
        return this.options[`wrapper-selector`];
    };
    get selectHeaderSelector() {
        return this.wrapperSelector + ` .crm-select-header`;
    };
    get selectBodySelector() {
        return this.wrapperSelector + ` .crm-select-body`;
    };
    get dropBackSelector() {
        return this.wrapperSelector + ` .dropback`;
    };
    /**
     *
     * @memberof CrmSelect
     */
    initSelect() {
        if (this.options.selectOptions && Object.prototype.toString.call(this.options.selectOptions).slice(8, -1) == "Array" && this.options.selectOptions.length !== 0) {
            var isSelectOptionsHasNameAndVal = this.options.selectOptions.every((item, key) => {
                return item.name && item.val
            });
            if (isSelectOptionsHasNameAndVal) {
                this.render();
            } else {
                this.errorMessageDialog(`selectOptions中的对象必须包含name，val`);
            }

        } else {
            this.errorMessageDialog(`传入的selectOptions必须为数组且不能为空数组`);
        }
    };
    /**
     * 初始化列表渲染
     *
     * @memberof CrmSelect
     */
    render() {
        var selectHtml = "",
            selectBodyHtml = "";
        this.options.selectOptions.forEach((item, key) => {
            if (item.name && item.val) {
                if (item.val === this.options.defaultSelect.val) {
                    selectBodyHtml += `<li data-val="${item.val}" class="checked">${item.name}</li>`;
                } else {
                    selectBodyHtml += `<li data-val="${item.val}">${item.name}</li>`;
                }
            }
        });
        var isDefaultSelectInSelectOptions = this.options.selectOptions.some((item, key) => {
            return item.name === this.options.defaultSelect.name && item.val === this.options.defaultSelect.val
        });
        if (!isDefaultSelectInSelectOptions) {
            this.errorMessageDialog(`defaultSelect必须为selectOptions中的一个`);
            return false;
        }
        selectHtml = `<div class="fll crm-select clearfix">
                        <div class="crm-select-header" data-val="${this.options.defaultSelect.val}">${this.options.defaultSelect.name}</div>
                        <ol class="crm-select-body" style="display: none;">
                            ${selectBodyHtml}
                        </ol>
                        <div class="dropback" style="display:none;"></div>
                      </div>`;
        $(this.wrapperSelector).html(selectHtml);
        this.bindSelectHeaderClickHandler();
        this.bindDropBackClickHandler();
        this.bindSelectBodyClickHandler();
    };
    /**
     * 错误提示弹出框
     *
     * @param {any} content 提示语句
     * @memberof CrmSelect
     */
    errorMessageDialog(content) {
        var errorDialog = top.dialog({
            title: "错误提示",
            content: `<div class='userconfirm'><i class='error'></i><span>${content}</span></div>`,
            onclose: function() {
                errorDialog.close();
                errorDialog.remove();
            },
            button: [{
                value: '关闭',
                callback: function() {
                    errorDialog.close();
                    errorDialog.remove();
                }
            }]
        }).showModal();
    };
    /**
     * 选择框展示隐藏下拉框点击事件
     *
     * @memberof CrmSelect
     */
    bindSelectHeaderClickHandler() {
        $(this.selectHeaderSelector).click(() => {
            $(this.selectHeaderSelector).toggleClass(`show-body`);
            $(this.selectBodySelector).toggle();
            $(this.dropBackSelector).toggle();
        })
    };
    /**
     * 背景透明层点击，隐藏弹框事件
     *
     * @memberof CrmSelect
     */
    bindDropBackClickHandler() {
        $(this.dropBackSelector).click(() => {
            $(this.selectHeaderSelector).removeClass(`show-body`);
            $(this.selectBodySelector).hide();
            $(this.dropBackSelector).hide();
        })

    };
    /**
     * 下拉选择框点击事件
     *
     * @memberof CrmSelect
     */
    bindSelectBodyClickHandler() {
        $(this.selectBodySelector).click((e) => {
            $(this.selectHeaderSelector).removeClass(`show-body`);
            $(this.selectBodySelector).hide();
            $(this.dropBackSelector).hide();
            if ($(e.target).hasClass(`checked`)) {
                return;
            }
            $(e.target).addClass(`checked`).siblings().removeClass(`checked`);
            $(this.selectHeaderSelector).attr(`data-val`, $(e.target).attr(`data-val`));
            $(this.selectHeaderSelector).html($(e.target).text());
            const selectCallBack = this.options.selectCallBack; // 成功添加回复后的回调
            if (selectCallBack && typeof selectCallBack === "function") {
                selectCallBack({
                    currentVal: $(e.target).attr(`data-val`),
                    currentName: $(e.target).text()
                }, e);
            }
        });

    }
}