# crm-selector
适用于自己项目组的通用下拉框组件，解决原生select标签在ie下样式丑陋的问题
	
# 组件的适用情况
众所周知，原生的select标签在ie下的样式是很丑的，而且没有办法改变它。如果想要看到的下拉框，只能通过别的标签来模拟它，本组件就是封装了里面的通用逻辑，包括一些与业务无关的点击处理和样式。使用者只用关心在下拉框的值改变时执行的具体业务逻辑即可。

# DOM结构

本组件因为需要定制一些通用样式，以及一些上述的通用事件处理，故必须对DOM结构作假定。使用者页面HTML应当如下：

```html
    <div class="fll clearfix crm-selector-wrapper">
        <!-- 下拉框的名称，用于告诉用户此下拉框的目的 -->
        <span class="fll selector-name"></span>
        <div class="fll crm-selector">
            <!-- 选中的值 -->
            <div class="selected" data-val=""></div>
            <!-- 具体的下拉列表 -->
            <ol class="select-body">
            </ol>
            <div class="dropback"></div>
        </div>
    </div>
```

# 依赖

`jquery`库。 主要用来设置/获取DOM元素常见的值，以及绑定事件处理函数。

# 用法

1. 在页面中引入`jquery`和本组件的js文件`crm-common-selector.js`

2. 引入本组件的js文件后会获取一个全局对象`CrmCommonSelector`，它包含4个主要API：

	1. **`setSelectorName`** - 设置下拉框的名字
	
		```js
		(selectorName) => this
		```
	
	2. **`renderList`** - 渲染下拉框列表
	
		```js
		/**
		 * @param {any[]} dataList 列表数据，每一项为一个对象，包含两个参数：
		 *      name: 选项的名称
		 *      value: 选项的值
		 *
		 * 此列表中的第一项为默认选中的值
		 */
		(dataList) => this
		``` 
	3. **`registChangedCallback`** - 注册下拉框值改变后的回调
	
		```js
		/**
	     * 注册下拉框值改变后的回调
	     *
	     * @param {(pre,cur)=>void} changedCallback 选项变更后的回调函数
	     *      会将之前值和当前值传入当做参数
	     */
		(changedCallback) => this
		```
		
	4. **`getSelected`** - 获取当前选中的值
	
		```js
		() => void
		```
	
3. 使用上述前2个函数来初始化下拉框，使用第三个函数来注册变更回调函数，如有必要使用最后一个函数来获取选中值。可能的代码如下：

	```js
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
	```

# DEMO

参见`test.html`

