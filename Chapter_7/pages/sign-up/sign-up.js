// pages/sign-up/sign-up.js
import config from '../../config/config.js';
Page({
    data: {
        username: "",
        password: ""
    },
    onUsernameInput: function (e) {//当用户名输入框有内容输入时被回调
        this.setData({//将输入内容保存到 username 中
            username: e.detail.value
        });
    },
    onPasswordInput: function (e) {//当密码输入框有内容输入时被回调
        this.setData({//将输入内容保存到 password 中
            password: e.detail.value
        });
    },
    toSignUp: function () {//当注册按钮点击时被调用
        if (!this.data.username) {//用户名为空，提示用户输入用户名
            wx.showToast({
                title: "请输入用户名！",
                icon: "none",
                mask: true
            });
            return;
        }
        if (!this.data.password) {//密码为空，提示用户输入密码
            wx.showToast({
                title: "请输入密码！",
                icon: "none",
                mask: true
            });
            return;
        }
        //分别将用户名，密码保存到 local storage 中
        wx.setStorageSync(config.cacheKey.username, this.data.username);
        wx.setStorageSync(config.cacheKey.password, this.data.password);
        wx.showToast({
            title: "注册成功请登录",
            icon: "success",
            mask: true
        });
        wx.reLaunch({//关闭所有页面，并打开登录页面
            url: '/pages/sign-in/sign-in'
        });
    }
})