import 'dart:io';

import 'package:flutter/material.dart';
import 'package:read/pages/MyInfoPage.dart';
import 'package:read/pages/SettingPage.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DrawerPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _DrawerPageState();
  }
}

class _DrawerPageState extends State<DrawerPage> {
  static const double IMAGE_ICON_WIDTH = 30.0;
  static const double IRROW_ICON_WIDTH = 16.0;

  File image;
  bool isLogin = false;
  String nick;

  var rightArrowIcon = new Image.asset(
    'images/icon_arrow_right.png',
    width: IRROW_ICON_WIDTH,
    height: IRROW_ICON_WIDTH,
  );

  List menuTitles = ['设置'];
  List menuIcons = [
    './images/icon_setting.png',
  ];

  TextStyle menuStyle = new TextStyle(fontSize: 15.0);

  @override
  void initState() {
    super.initState();
    getUserInfo();
  }

  @override
  Widget build(BuildContext context) {
    return new ConstrainedBox(
      constraints: const BoxConstraints.expand(width: 304.0),
      child: new Material(
        elevation: 16.0,
        child: new Container(
          decoration: new BoxDecoration(color: Colors.white),
          child: new ListView.builder(
              itemCount: menuTitles.length * 2 + 1, itemBuilder: renderRow),
        ),
      ),
    );
  }

  Widget getIconImage(path) {
    return new Padding(
      padding: const EdgeInsets.fromLTRB(6.0, 6.0, 6.0, 6.0),
      child: new Image.asset(
        path,
        width: 28.0,
        height: 28.0,
      ),
    );
  }

  Widget renderRow(BuildContext context, int index) {
    if (index == 0) {
      return Stack(
        alignment: Alignment(0.8, 1.3),
        children: <Widget>[
          Container(
            margin: EdgeInsets.all(15.0),
            width: 304.0,
            height: 200.0,
            decoration: BoxDecoration(
              image: new DecorationImage(
                  image: ExactAssetImage('./images/img_book_card.png'),
                  fit: BoxFit.fill),
            ),
            alignment: Alignment.topCenter,
            child: Column(
              children: <Widget>[
                Container(
                  margin: EdgeInsets.only(top: 30.0, left: 25.0),
                  child: Row(
                    children: [
                      (isLogin == false && image == null)
                          ? CircleAvatar(
                              backgroundColor: Colors.white,
                              radius: 40.0,
                            )
                          : CircleAvatar(
                              backgroundImage: new FileImage(image),
                              backgroundColor: Colors.white,
                              radius: 40.0,
                            ),
                      new Container(
                        margin: EdgeInsets.only(left: 20.0),
                        child: (isLogin == false)
                            ? new Text(
                                '未登录',
                                style: new TextStyle(
                                  fontSize: 20.0,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              )
                            : new Text(
                                nick,
                                style: new TextStyle(
                                  fontSize: 20.0,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.yellow,
                                ),
                              ),
                      ),
                    ],
                  ),
                ),
                Container(
                  alignment: Alignment.centerLeft,
                  margin: EdgeInsets.fromLTRB(25.0, 20.0, 20.0, 0.0),
                  child: Text(
                    '送个程序员的爱心书单',
                    style: TextStyle(color: Colors.white, fontSize: 15.0),
                  ),
                )
              ],
            ),
          ),
          Image.asset('images/icon_love_card.png',width: 80.0,height: 80.0,),
        ],
      );
    }
    index -= 1;
    if (index.isOdd) {
      return new Divider();
    }
    index = index ~/ 2;
    var listItemContent = new Padding(
      padding: const EdgeInsets.fromLTRB(10.0, 15.0, 10.0, 15.0),
      child: new Row(
        children: <Widget>[
          getIconImage(menuIcons[index]),
          new Expanded(
              child: new Text(
            menuTitles[index],
            style: menuStyle,
          )),
          rightArrowIcon
        ],
      ),
    );

    return new InkWell(
      child: listItemContent,
      onTap: () {
        switch (index) {
          case 0:
            Navigator.of(context).push(new MaterialPageRoute(builder: (ctx) {
              return new SettingPage();
            }));
        }
      },
    );
  }

  void getUserInfo() async {
// 获取实例
    var prefs = await SharedPreferences.getInstance();
    // 获取存储数据

    isLogin = prefs.getBool('islogin') ?? false;
    nick = isLogin ? prefs.getString('nick') ?? '未登录' : '未登录';
    String _userpath = prefs.getString('userimage') ?? '';
    if (isLogin) {
      if (_userpath != '') {
        image = new File(_userpath);
      }
    }
    setState(() {});
  }
}
