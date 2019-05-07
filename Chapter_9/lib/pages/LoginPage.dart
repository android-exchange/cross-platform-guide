import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:read/api/Api.dart';
import 'package:read/api/NetUtils.dart';
import 'package:read/common/ColorsUtil.dart';
import 'package:read/common/DialogUtils.dart';
import 'package:read/pages/RegisterPage.dart';
import 'package:shared_preferences/shared_preferences.dart';

//因为有很多状态的改变所以必须是StatefulWidget
class LoginPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _LoginPageState();
  }
}

class _LoginPageState extends State<LoginPage> {
  //所填账户信息字符串
  var _str_account = '';

  //所填密码信息字符串
  var _str_pass = '';

  //文本编辑控制器 可用于监听文本内容的改变
  TextEditingController accountController = new TextEditingController();
  TextEditingController passController = new TextEditingController();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      //设置主题颜色
      theme: ThemeData(
        primaryColor: Color(ColorsUtil.THEME_BLACK),
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('登录'),
          leading: IconButton(
              icon: BackButtonIcon(),
              onPressed: () {
                Navigator.pop(context);
              }),
        ),
        body: Container(
          margin: EdgeInsets.fromLTRB(20.0, 50.0, 20.0, 20.0),
          //共有6列  每一列设置自己列布局
          child: Column(
            children: <Widget>[
              //左对齐
              Align(
                alignment: Alignment.center,
                child: Text('您好!', style: TextStyle(fontSize: 30.0)),
              ),
              Align(
                alignment: Alignment.center,
                child: Text('欢迎来到登录界面', style: TextStyle(fontSize: 16.0)),
              ),
              Container(
                margin: EdgeInsets.only(top: 30.0),
                //添加controller，监听TextField内容的改变
                child: TextField(
                  controller: accountController,
                  keyboardType: TextInputType.phone,
                  decoration: InputDecoration(hintText: '请输入11位手机号码'),
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: 20.0),
                child: TextField(
                  controller: passController,
                  //是否以密码形式*显示
                  obscureText: true,
                  //设置hintText
                  decoration: InputDecoration(
                    hintText: '请输入6位密码',
                  ),
                ),
              ),
              //监听Text的点击事件
              GestureDetector(
                onTap: () {
                  Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => RegisterPage()));
                },
                child: Container(
                  margin: EdgeInsets.only(top: 10.0),
                  alignment: Alignment.topLeft,
                  child: Text(
                    '没有账号，注册一个吧~',
                    style: TextStyle(
                        //设置下划线
                        decoration: TextDecoration.underline,
                        color: Color(ColorsUtil.TYPEFACE_BLUE)),
                  ),
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: 40.0),
                child: MaterialButton(
                  child: Image.asset(
                    'images/img_login.png',
                    width: 180.0,
                    height: 50.0,
                  ),
                  //按钮点击事件
                  onPressed: () {
                    //获取TextField的文本内容
                    _str_account = accountController.text;
                    _str_pass = passController.text;
                    //登录逻辑处理
                    localLogin(_str_account, _str_pass);
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void localLogin(String account, String pass) async {
    if (account.trim() == '') {
      DialogUtils.show(context, '提示', '账号不能为空');
      return;
    }

    if (pass.trim() == '') {
      DialogUtils.show(context, '提示', '密码不能为空');
      return;
    }
    var map = {'username': account, 'password': pass};
    // 获取实例
    var prefs = await SharedPreferences.getInstance();
    // 获取存储数据
    var _account = prefs.getString('account') ?? '';
    var _pass = prefs.getString('pass') ?? '';

    if (account == _account && pass == _pass) {
      await prefs.setBool('islogin', true);
      //DialogUtils.show(context, '提示', '登录成功');
      Navigator.of(context).pop();
    } else {
      DialogUtils.show(context, '提示', '登录失败');
    }
  }

}
