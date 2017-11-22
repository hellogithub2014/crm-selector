$(function() {
    window.dialog = dialog;
    new CrmSelect({
        "wrapper-selector": "#select",
        "selectOptions": [{
            name: "111",
            val: "1"
        }, {
            name: "222",
            val: "2"
        }, {
            name: "333",
            val: "3"
        }],

        selectCallBack: function(current, e) { // current 是一个对象 对象中的currentVal代表当前选中的val，currentName代表当前选中的name
            console.log(current.currentName + ":" + current.currentVal);
        }

    })
})