// pages/home/home.js
import config from '../../config/config.js';
import data from '../../utils/data.js';

Page({
    data: {
        tabList: [],
        currentTabIndex: 0, //当前选择的 tab
        dataList: []
    },
    onLoad: function (options) {
        //读取用户登录信息
        let userInfo = wx.getStorageSync(config.cacheKey.userInfo);
        if (userInfo) { //用户已登录，则直将用户信息保存到全局变量中
            getApp().globalData.userInfo = userInfo;
            this.toLoadData();
        } else {
            wx.reLaunch({ //用户未登录，则直接跳转至登录页面
                url: "/pages/sign-in/sign-in"
            });
        }
    },
    toLoadData: function () {
        this.setData({
            tabList: data.home.tabList,
            dataList: data.home.dataList
        });
    },
    onTabItemClick: function (e) {
        console.error(e);
        let item = e.currentTarget.dataset.item;
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTabIndex: index
        });
    },
    onItemClick: function (e) {
        let item = e.currentTarget.dataset.item;
        wx.navigateTo({ //通过 url 传递参数，是不是跟 html 很像？
            url: "/pages/detail/detail?id=" + item.id + "&name=" + item.name
        });
    }
});