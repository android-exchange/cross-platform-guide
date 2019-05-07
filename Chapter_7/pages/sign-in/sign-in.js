// pages/sign-in/sign-in.js
import config from '../../config/config.js';
Page({
  data: {
    username: "",
    password: ""
  },
  onLoad: function (options) {}, //生命周期回调函数
  onReady: function () {}, //生命周期回调函数
  onShow: function () {}, //生命周期回调函数
  onHide: function () {}, //生命周期回调函数
  onUnload: function () {}, //生命周期回调函数
  onUsernameInput: function (e) { //上面为输入框绑定的键盘事件监听回调函数
    // e.detail.value 是取到键盘输入的值
    this.setData({
      username: e.detail.value
    });
  },
  onPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  toSignIn: function () { //上面为按钮绑定的点击事件回调函数
    if (!this.data.username) { //用户名为空
      wx.showToast({ //吐司以下提示用户输入用户名
        title: "请输入用户名！",
        icon: "none",
        mask: true
      });
      return;
    }
    if (!this.data.password) {
      wx.showToast({
        title: "请输入密码！",
        icon: "none",
        mask: true
      });
      return;
    }
    //读取本地已经存入的用户注册的信息
    let authUsername = wx.getStorageSync(config.cacheKey.username);
    let authPassword = wx.getStorageSync(config.cacheKey.password);
    if (this.data.username != authUsername) {
      wx.showToast({
        title: "用户名不正确！",
        icon: "none",
        mask: true
      });
      return;
    }
    if (this.data.password != authPassword) {
      wx.showToast({
        title: "密码不正确！",
        icon: "none",
        mask: true
      });
      return;
    }
    //将用户登录的信息记录下
    wx.setStorageSync(config.cacheKey.userInfo, {
      username: this.data.username
    });
    //跳转到首页，并关闭当前以及其他页面
    wx.reLaunch({
      url: '/pages/home/home'
    });
  },
  toSignUp: function () {
    //跳转到注册页面，不关闭当前页面
    wx.navigateTo({
      url: '/pages/sign-up/sign-up'
    });
  }
})