Page({
    data: {
        checkBoxItems: [
            { name: 'USA', value: '美国' },
            { name: 'CHN', value: '中国', checked: 'true' },
            { name: 'BRA', value: '巴西' },
            { name: 'JPN', value: '日本' },
            { name: 'ENG', value: '英国' },
            { name: 'TUR', value: '法国' }],
        radioItems: [
            { name: '男', value: '1' },
            { name: '女', value: '2', checked: 'true' }],
        array: ['美国', '中国', '巴西', '日本'],
        index: 1
    },
    onLoad: function (options) {
        

    },
    onReady: function () {

    },
    onShow: function () {

    },
    onHide: function () {

    },
    onUnload: function () {

    },
    checkboxChange: function (e) {
        console.log('checkbox 发生 change 事件，携带 value 值为：', e.detail.value);
    },
    radioChange: function (e) {
        console.log('radio 发生 change 事件，携带 value 值为：', e.detail.value);
    },
    formSubmit: function () {
        console.log('表单提交 formSubmit');
    },
    formReset: function () {
        console.log('表单重置 formReset');
    },
    sliderChange: function (e) {
        console.log('slider 发生 change 事件，携带 value 值为：', e.detail.value);
    },
    switchChange: function (e) {
        console.log('switch 发生 change 事件，携带 value 值为：', e.detail.value);
    }
})