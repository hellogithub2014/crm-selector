/**
 * 页面DOM结构依赖：
 * <div class="fll clearfix crm-selector-wrapper">
        <span class="fll selector-name"></span>
        <div class="fll crm-selector">
            <div class="selected" data-val=""></div>
            <ol class="select-body">
            </ol>
            <div class="dropback"></div>
        </div>
    </div>
 *
 * 一些定制样式写在了crm-common-selector.css中
 *
 * 实例可见test.js
 */
var CrmCommonSelector = (function() {
    /**
     * 设置下拉框的名字
     *
     * @param {string} selectorName 下拉框的名字
     */
    function setSelectorName(selectorName) {
        $(".crm-selector-wrapper .selector-name").html(selectorName + ": ");
        return this;
    }

    /**
     * 渲染下拉框列表数据
     *
     * @param {any[]} dataList 列表数据，每一项为一个对象，包含两个参数：
     *      name: 选项的名称
     *      value: 选项的值
     *
     * 此列表中的第一项为默认选中的值
     */
    function renderList(dataList) {
        // 渲染默认选中项
        $(".crm-selector-wrapper .crm-selector .selected").html(dataList[0].name);
        $(".crm-selector-wrapper .crm-selector .selected").attr("data-val", dataList[0].value);
        // 渲染下拉列表
        var listHtml = dataList.reduce(function(totalHtml, item) {
            return totalHtml + '<li data-val="' + item.value + '">' + item.name + '</li>';
        }, "");
        $(".crm-selector-wrapper .crm-selector .select-body").html(listHtml);
        return this;
    }

    /**
     * 获取当前选中的值
     */
    function getSelected() {
        return $(".crm-selector-wrapper .crm-selector .selected").attr("data-val");
    }

    /**
     * 绑定DOM事件
     *
     * @param {any} changedCallback 选项变更后的回调函数
     */
    function _bindClickHandler(changedCallback) {
        // 头部点击
        $(".crm-selector .selected").click(function() {
            $(this).next().toggle(); // 切换列表显示
            $(this).toggleClass("clicked");
            $(this).next().next().show();
        });
        // 列表项点击函数,给每一个li都注册同样的处理函数
        $(".crm-selector  .select-body").on('click', "li", function(e) {
            var previousSelected = $(this).parent().prev().attr("data-val"); // 之前选中的值
            var curSelected = $(this).attr("data-val"); //当前选中的值

            $(this).parent().prev().toggleClass("clicked"); // selected
            $(this).parent().toggle(); // 隐藏列表
            $(this).parent().prev().html($(this).html());
            $(this).parent().prev().attr("data-val", curSelected);
            $(this).parent().next().hide();

            if (previousSelected !== curSelected) {
                changedCallback(previousSelected, curSelected);
            }
        });
        // 下拉列表展开时，点击dropback代表的背景区域上任意一点，隐藏下拉列表
        $(".crm-selector .dropback").click(function() {
            $(this).hide();
            $(this).prev().hide();
            $(this).prev().prev().toggleClass("clicked");
        });
    }


    /**
     * 注册下拉框选择
     *
     * @param {Function} changedCallback 选项变更后的回调函数
     *      会将之前值和当前值传入当做参数
     */
    function registChangedCallback(changedCallback) {
        _bindClickHandler(changedCallback);
        return this;
    }

    return {
        registChangedCallback: registChangedCallback,
        getSelected: getSelected,
        renderList: renderList,
        setSelectorName: setSelectorName,
    };
})();