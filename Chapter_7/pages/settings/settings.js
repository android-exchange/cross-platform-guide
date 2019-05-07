// pages/settings/settings.js
import config from '../../config/config.js';
Page({
  data: {

  },
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  toSignOut: function () {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: function (res) {
        if (res.confirm) {
          that.doSignOut();
        }
      }
    });
  },
  doSignOut: function () {
    wx.removeStorageSync(config.cacheKey.userInfo);
    wx.showToast({
      title: "退出登录成功！",
      icon: "success",
      mask: true
    });
    wx.reLaunch({
      url: '/pages/sign-in/sign-in'
    });
  }
})