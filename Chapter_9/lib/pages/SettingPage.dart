import 'package:flutter/material.dart';
import 'package:read/common/ColorsUtil.dart';
import 'package:read/common/DialogUtils.dart';

class SettingPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _SettingPageState();
  }
}

class _SettingPageState extends State<SettingPage> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
//设置主题颜色
      theme: ThemeData(
        primaryColor: Color(ColorsUtil.THEME_BLACK),
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('设置'),
          leading: IconButton(
              icon: BackButtonIcon(),
              onPressed: () {
                Navigator.pop(context);
              }),
        ),
        body: Container(
          margin: EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Container(
                height: 50.0,
                margin: EdgeInsets.only(top: 40.0),
                child: RaisedButton(
                  color: Color(ColorsUtil.THEME_BLACK),
                  child: Text(
                    '关于',
                    style: TextStyle(color: Colors.white),
                  ),
                  //按钮点击事件
                  onPressed: () {
                    DialogUtils.show(context, '提示', '这是送给程序员的爱心书单');
                  },
                ),
              ),
              Container(
                height: 50.0,
                margin: EdgeInsets.only(top: 40.0),
                child: RaisedButton(
                  color:Color(ColorsUtil.THEME_BLACK),
                  child: Text(
                    '版本号',
                    style: TextStyle(color: Colors.white),
                  ),
                  //按钮点击事件
                  onPressed: () {
                    DialogUtils.show(context, '提示', '版本 1.0');
                  },
                ),
              ),
              Container(
                height: 50.0,
                margin: EdgeInsets.only(top: 40.0),
                child: RaisedButton(
                  color: Color(ColorsUtil.THEME_BLACK),
                  child: Text(
                    '退出登录',
                    style: TextStyle(color: Colors.white),
                  ),
                  //按钮点击事件
                  onPressed: () {
                    DialogUtils.quit(context);
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
