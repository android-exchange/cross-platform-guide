import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:read/common/ColorsUtil.dart';
import 'package:read/common/DialogUtils.dart';
import 'package:shared_preferences/shared_preferences.dart';

class RegisterPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _RegisterPageState();
  }
}

class _RegisterPageState extends State<RegisterPage> {
  var strAccount = ''; //账户
  var strPass = ''; //密码
  var strNick = ''; //昵称
  File imageHead; //头像图片
  //账户TextEditingController
  TextEditingController _controller_account = new TextEditingController();

  //密码TextEditingController
  TextEditingController _controller_pass = new TextEditingController();

  //昵称TextEditingController
  TextEditingController _controller_nick = new TextEditingController();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Color(ColorsUtil.THEME_BLACK),
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('注册'),
          leading: IconButton(
              icon: BackButtonIcon(),
              onPressed: () {
                Navigator.pop(context);
              }),
        ),
        body: bodyPage(),
      ),
    );
  }

  void register(
      String account, String nick, String pass, String filepath) async {
    // 获取实例
    var prefs = await SharedPreferences.getInstance();
    // 获取存储数据
    // var count = prefs.getInt('count') ?? 0 + 1;
    // 设置存储数据
    bool isSuccess = false;
    isSuccess = await prefs.setString('account', account);
    isSuccess = await prefs.setString('pass', pass);
    isSuccess = await prefs.setString('nick', nick);
    isSuccess = await prefs.setString('userimage', filepath);
    if (isSuccess) {
      DialogUtils.showAndQuit(context, '提示', '注册成功');

    } else {
      DialogUtils.show(context, '提示', '注册失败');
    }
  }

  Future getImage() async {
    var image = await ImagePicker.pickImage(source: ImageSource.gallery);

    setState(() {
      imageHead = image;
    });
  }

  Widget bodyPage() {
    return Container(
      margin: EdgeInsets.all(20.0),
      child: Column(
        children: <Widget>[
          GestureDetector(
            onTap: () {
              getImage();
            },
            child: Container(
              child: imageHead == null
                  ? CircleAvatar(
                      backgroundImage: new AssetImage('images/icon_user.png'),
                      backgroundColor: Colors.white,
                      radius: 50.0,
                    )
                  : CircleAvatar(
                      backgroundImage: new FileImage(imageHead),
                      backgroundColor: Colors.white,
                      radius: 50.0,
                    ),
            ),
          ),
          Container(
            margin: EdgeInsets.only(bottom: 20.0, top: 20.0),
            alignment: Alignment.center,
            child: Text('您好', style: TextStyle(fontSize: 30.0)),
          ),
          Container(
            alignment: Alignment.center,
            child: Text('欢迎来到注册界面', style: TextStyle(fontSize: 16.0)),
          ),
          Container(
            margin: EdgeInsets.only(top: 30.0),
            child: TextField(
              controller: _controller_account,
              keyboardType: TextInputType.phone,
              decoration: InputDecoration(hintText: '请输入11位手机号码'),
            ),
          ),
          Container(
            margin: EdgeInsets.only(top: 30.0),
            child: TextField(
              controller: _controller_nick,
              decoration: InputDecoration(hintText: '请输入您的昵称'),
            ),
          ),
          Container(
            margin: EdgeInsets.only(top: 20.0),
            child: TextField(
              controller: _controller_pass,
              obscureText: true,
              decoration: InputDecoration(
                hintText: '请输入6位密码',
              ),
            ),
          ),
          Container(
            margin: EdgeInsets.only(top: 40.0),
            child: MaterialButton(
              child: Image.asset(
                'images/img_register.png',
                width: 180.0,
                height: 50.0,
              ),
              onPressed: () {
                strAccount = _controller_account.text;
                strPass = _controller_pass.text;
                strNick = _controller_nick.text;
                var _img_path = imageHead == null ? '' : imageHead.path;
                if (strAccount != '' &&
                    strPass != '' &&
                    strNick != '' &&
                    _img_path != '') {
                  register(strAccount, strNick, strPass, _img_path);
                } else {
                  if (_img_path == '') {
                    DialogUtils.show(context, '提示', '请上传头像');
                  } else {
                    DialogUtils.show(context, '提示', '请完善信息');
                  }
                }
              },
            ),
          ),
        ],
      ),
    );
  }
}
