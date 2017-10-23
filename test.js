window.onload = function() {
    CrmCommonSelector
        .setSelectorName("测试下拉组件")
        .renderList([
            { name: "选项1", value: "value1" },
            { name: "选项2", value: "value2" },
            { name: "选项3", value: "value3" },
            { name: "选项4", value: "value4" },
        ])
        .registChangedCallback(function(pre, cur) {
            console.log(`previous: ${pre} ,  current: ${cur}`);
        });
}