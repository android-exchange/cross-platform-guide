// pages/tab1/tab1.js
Page({

    data: {

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
    toView: function () {
        wx.navigateTo({ url: '/pages/container-view/container-view' });
    },
    toScrollView: function () {
        wx.navigateTo({ url: '/pages/container-scroll-view/container-scroll-view' });
    },
    toSwiper: function () {
        wx.navigateTo({ url: '/pages/container-swiper/container-swiper' });
    },
    toBase: function () {
        wx.navigateTo({ url: '/pages/container-base/container-base' });
    },
    toForm: function () {
        wx.navigateTo({ url: '/pages/container-form/container-form' });
    },
    toMedia: function () {
        wx.navigateTo({ url: '/pages/container-media/container-media' });
    },
    toMap: function () {
        wx.navigateTo({ url: '/pages/container-map/container-map' });
    },
    toWebView: function () {
        wx.navigateTo({ url: '/pages/container-web-view/container-web-view' });
    },
})