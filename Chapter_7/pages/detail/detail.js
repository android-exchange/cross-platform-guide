// pages/detail/detail.js
import config from '../../config/config.js';
import data from '../../utils/data.js';

Page({
    data: {
        id: '',
        bookInfo: {},
        favoriteList: [],
        isMarked: false,
        commentList: [],
        currentComment: '',
        userInfo: null,
    },
    onLoad: function (query) {
        //query 是通过 url 传过来的参数的集合
        if (query.id && query.name) { //处理是否有 id 和 name
            //匹配模拟数据
            let bookInfo = {};
            if (query.id.indexOf('android_') != -1) {
                bookInfo = data.detail.androidBookInfo;
            } else if (query.id.indexOf('ios_') != -1) {
                bookInfo = data.detail.iosBookInfo;
            } else if (query.id.indexOf('fe_') != -1) {
                bookInfo = data.detail.feBookInfo;
            } else if (query.id.indexOf('backend_') != -1) {
                bookInfo = data.detail.backendBookInfo;
            } else if (query.id.indexOf('ai_') != -1) {
                bookInfo = th.data.aiBookInfo;
            }
            bookInfo.id = query.id;
            bookInfo.name = query.name;
            this.setData({
                id: query.id,
                bookInfo: bookInfo
            });
        }
        //读取已经收藏的图书列表
        let favoriteBooks = wx.getStorageSync(config.cacheKey.favoriteBooks);
        if (favoriteBooks) {
            this.setData({
                favoriteList: favoriteBooks
            });
            this.setData({ //更新收藏状态
                isMarked: this.isMarked()
            });
        }
        //读取评论列表
        let commentList = wx.getStorageSync(this.data.id);
        if (commentList) {
            this.setData({
                commentList: commentList
            });
        }
        let userInfo = wx.getStorageSync(config.cacheKey.userInfo);
        if (userInfo) {
            this.setData({
                userInfo: userInfo
            });
        }
    },
    onReady: function () { },
    onShow: function () { },
    onHide: function () { },
    onUnload: function () { },
    toFavorite: function () { //收藏按钮点击
        if (this.isMarked()) { //图书已被收藏，则取消收藏
            let favoriteList = this.data.favoriteList;
            // indexOf 返回已经收藏的图书在 list 中的下标
            // splice(0,1); splice 函数有两个参数，第一个表示从哪个坐标开始删除，第二个表示删除多少个
            favoriteList.splice(favoriteList.indexOf(this.data.bookInfo), 1);
            // 更新收藏列表
            wx.setStorageSync(config.cacheKey.favoriteBooks, favoriteList);
            this.setData({
                favoriteList: favoriteList,
                isMarked: this.isMarked()
            });
        } else { // 图书未被收藏，则执行收藏
            let favoriteList = this.data.favoriteList;
            // push(); push 函数的作用是将元素追加到数组末尾
            favoriteList.push(this.data.bookInfo);
            // 更新收藏列表
            wx.setStorageSync(config.cacheKey.favoriteBooks, favoriteList);
            this.setData({
                favoriteList: favoriteList,
                isMarked: this.isMarked()
            });
        }
    },
    isMarked: function () { //判断当前图书有没有被收藏过
        for (let book of this.data.favoriteList) {
            if (book.id == this.data.id) {
                return true;
            }
        }
        return false;
    },
    onCommentInput: function (e) { //当评论输入框输入内容时回调
        this.setData({
            currentComment: e.detail.value
        });
    },
    toSubmitComment: function () { //保存评论
        if (!this.data.currentComment) return;
        let comment = {
            username: this.data.userInfo.username,
            content: this.data.currentComment
        };
        let commentList = wx.getStorageSync(this.data.id);
        if (!commentList) {
            commentList = [];
        }
        commentList.push(comment);
        this.setData({
            commentList: commentList
        });
        wx.setStorageSync(this.data.id, commentList);
        this.setData({
            currentComment: ''
        });
    }
})