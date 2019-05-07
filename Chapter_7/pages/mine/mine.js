// pages/mine/mine.js

Page({
    data: {
        userInfo: null
    },
    onLoad: function (options) {
        this.setData({ //读取全局数据保存到当前页面中
            userInfo: getApp().globalData.userInfo
        });
    },
    onReady: function () { },
    onShow: function () { },
    onHide: function () { },
    onUnload: function () { },
    toFavorite: function () {
        wx.navigateTo({
            url: '/pages/favorite/favorite'
        });
    },
    toSettings: function () {
        wx.navigateTo({
            url: '/pages/settings/settings'
        });
    }
})