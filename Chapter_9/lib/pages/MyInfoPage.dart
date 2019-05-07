import 'dart:io';

import 'package:flutter/material.dart';
import 'package:read/common/DbProvider.dart';
import 'package:read/common/DialogUtils.dart';
import 'package:read/pages/CollectBooksPage.dart';
import 'package:read/pages/LoginPage.dart';
import 'package:read/pages/SettingPage.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MyInfoPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _MyInfoPageState();
  }
}

final RouteObserver<PageRoute> routeObserver = RouteObserver<PageRoute>();

class _MyInfoPageState extends State<MyInfoPage> {
  String nick = '';
  String des = '点击登录查看更多信息';
  File imageHeader;
  bool isLogin = false;
  int collectNum = 0;

  @override
  void initState() {
    super.initState();

    getUserInfo();
  }

  @override
  Widget build(BuildContext context) {
    return new Container(
      margin: EdgeInsets.fromLTRB(0.0, 20.0, 0.0, 20.0),
      child: ListView(
        children: <Widget>[
          loginTop(),
          cardView(),
          //  _ColumnsBook(),
          Container(
            height: 10.0,
            color: const Color(0x559DA0A5),
          ),
          itemWant(),
          Container(
            height: 10.0,
            color: const Color(0x559DA0A5),
          ),
          itemCollect(),

          Container(
            height: 10.0,
            color: const Color(0x559DA0A5),
          ),
          itemFabulous(),
          Container(
            height: 10.0,
            color: const Color(0x559DA0A5),
          ),
          setting(),
          Container(
            height: 0.5,
            color: const Color(0x559DA0A5),
          ),
        ],
      ),
    );
  }

  Widget loginTop() {
    return GestureDetector(
      onTap: () {
        if (!isLogin) {
          Navigator.of(context)
              .push(MaterialPageRoute(builder: (context) => LoginPage()))
              .then((str) {
            setState(() {
              getUserInfo();
            });
          });
        }
      },
      child: Column(
        children: <Widget>[
          Container(
            margin: EdgeInsets.fromLTRB(20.0, 0.0, 0.0, 5.0),
            child: Text(nick,
                style: TextStyle(
                  fontSize: 20.0,
                )),
            alignment: Alignment.center,
          ),
          Container(
            margin: EdgeInsets.fromLTRB(20.0, 0.0, 0.0, 5.0),
            child: (isLogin == false || imageHeader == null)
                ? CircleAvatar(
                    backgroundImage: new AssetImage('images/icon_user.png'),
                    backgroundColor: Colors.white,
                    radius: 40.0,
                  )
                : CircleAvatar(
                    backgroundImage: new FileImage(imageHeader),
                    backgroundColor: Colors.white,
                    radius: 40.0,
                  ),
          ),
        ],
      ),
    );
  }

  Widget cardView() {
    return Container(
        margin: EdgeInsets.fromLTRB(17.0, 0.0, 17.0, 0.0),
        child: Stack(children: <Widget>[
          Image.asset(
            'images/img_card.png',
            height: 150.0,
            width: 400.0,
          ),
          Container(
            height: 150.0,
            child: Row(
              children: <Widget>[
                Expanded(
                  child: Container(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Container(
                          alignment: Alignment.centerLeft,
                          margin: EdgeInsets.fromLTRB(20.0, 15.0, 0.0, 5.0),
                          child: Text(
                            '强力推荐卡',
                            style:
                                TextStyle(fontSize: 20.0, color: Colors.white),
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.fromLTRB(20.0, 5.0, 0.0, 15.0),
                          child: Text(
                            '最给力的书单就在这里',
                            style:
                                TextStyle(fontSize: 12.0, color: Colors.white),
                          ),
                          alignment: Alignment.centerLeft,
                        ),
                      ],
                    ),
                  ),
                ),
                Container(
                  padding: EdgeInsets.fromLTRB(10.0, 5.0, 10.0, 5.0),
                  decoration: BoxDecoration(
                      border: Border.all(
                        color: Colors.white,
                      ),
                      borderRadius: BorderRadius.all(Radius.circular(15.0))),
                  margin: EdgeInsets.only(right: 20.0),
                  child: Text(
                    '立即领取',
                    style: TextStyle(fontSize: 16.0, color: Colors.white),
                  ),
                )
              ],
            ),
          ),
        ]));
  }

  Widget columnsBook() {
    return Row(
      children: <Widget>[
        Expanded(
          flex: 1,
          child: Column(
            children: <Widget>[
              Container(
                padding: EdgeInsets.only(top: 10.0, bottom: 5.0),
                child: Text(
                  '0',
                  style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
                ),
              ),
              Container(
                padding: EdgeInsets.only(top: 5.0, bottom: 10.0),
                child: Text(
                  '我想要的书籍',
                  style: TextStyle(
                    fontSize: 12.0,
                  ),
                ),
              ),
            ],
          ),
        ),
        Expanded(
          flex: 1,
          child: Column(
            children: <Widget>[
              Container(
                padding: EdgeInsets.only(top: 10.0, bottom: 5.0),
                child: Text(
                  '0',
                  style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
                ),
              ),
              Container(
                padding: EdgeInsets.only(top: 5.0, bottom: 10.0),
                child: Text(
                  '我收藏的书籍',
                  style: TextStyle(
                    fontSize: 12.0,
                  ),
                ),
              ),
            ],
          ),
        ),
        Expanded(
          flex: 1,
          child: Column(
            children: <Widget>[
              Container(
                padding: EdgeInsets.only(top: 10.0, bottom: 5.0),
                child: Text(
                  '0',
                  style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
                ),
              ),
              Container(
                padding: EdgeInsets.only(top: 5.0, bottom: 10.0),
                child: Text(
                  '我点赞的书籍',
                  style: TextStyle(
                    fontSize: 12.0,
                  ),
                ),
              ),
            ],
          ),
        )
      ],
    );
  }

  Widget setting() {
    return Container(
      child: GestureDetector(
        onTap: () {
          Navigator.of(context)
              .push(MaterialPageRoute(builder: (context) => SettingPage()))
              .then((str) {
            setState(() {
              getUserInfo();
            });
          });
        },
        child: Row(
          children: <Widget>[
            Container(
              margin: EdgeInsets.all(20.0),
              child: Image.asset(
                'images/icon_setting.png',
                width: 20.0,
                height: 20.0,
              ),
            ),
            Expanded(
              child: Text('设置'),
            ),
            Container(
              margin: EdgeInsets.all(20.0),
              child: Image.asset(
                'images/icon_arrow_right.png',
                width: 20.0,
                height: 20.0,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget itemWant() {
    return Container(
      child: Row(
        children: <Widget>[
          Container(
            margin: EdgeInsets.all(25.0),
            child: Image.asset(
              'images/icon_love.png',
              width: 20.0,
              height: 20.0,
            ),
          ),
          Expanded(
            child: Text(
              '我想要的书籍',
              style: TextStyle(fontSize: 16.0),
            ),
          ),
          Container(
              margin: EdgeInsets.all(20.0),
              child: Text(
                '0本',
                style: TextStyle(fontSize: 16.0),
              )),
        ],
      ),
    );
  }

  Widget itemCollect() {
    return GestureDetector(
      child: Container(
        child: Row(
          children: <Widget>[
            Container(
              margin: EdgeInsets.all(25.0),
              child: Image.asset(
                'images/icon_collection.png',
                width: 20.0,
                height: 20.0,
              ),
            ),
            Expanded(
              child: Text(
                '我收藏的书籍',
                style: TextStyle(fontSize: 16.0),
              ),
            ),
            Container(
                margin: EdgeInsets.all(20.0),
                child: Text(
                  '$collectNum本',
                  style: TextStyle(fontSize: 16.0),
                )),
          ],
        ),
      ),
      onTap:(){
        Navigator.of(context)
            .push(MaterialPageRoute(builder: (context) => CollectBooksPage()));
      } ,
    );
  }

  Widget itemFabulous() {
    return Container(
      child: Row(
        children: <Widget>[
          Container(
            margin: EdgeInsets.all(25.0),
            child: Image.asset(
              'images/icon_praise.png',
              width: 20.0,
              height: 20.0,
            ),
          ),
          Expanded(
            child: Text(
              '我点赞的书籍',
              style: TextStyle(fontSize: 16.0),
            ),
          ),
          Container(
              margin: EdgeInsets.all(20.0),
              child: Text(
                '0本',
                style: TextStyle(fontSize: 16.0),
              )),
        ],
      ),
    );
  }

  void getUserInfo() async {
    // 获取实例
    var prefs = await SharedPreferences.getInstance();
    // 获取存储数据

    isLogin = prefs.getBool('islogin') ?? false;
    nick = isLogin ? prefs.getString('nick') ?? '' : '';
    String _userpath = prefs.getString('userimage') ?? '';
    if (isLogin) {
      des = 'hello flutter';
      if (_userpath != '') {
        imageHeader = new File(_userpath);
      }
    } else {
      des = '点击登录查看更多信息';
    }
    collectNum = (await new DbProvider().getCollectBooks()).length;
    setState(() {});
  }

// Implement RouteAware in a widget's state and subscribe it to the RouteObserver.

}

class RouteAwareWidgetState extends State<MyInfoPage> with RouteAware {
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    routeObserver.subscribe(this, ModalRoute.of(context));
  }

  @override
  void dispose() {
    routeObserver.unsubscribe(this);
    super.dispose();
  }

  @override
  void didPush() {
    // Route was pushed onto navigator and is now topmost route.
  }

  @override
  void didPopNext() {
    // Covering route was popped off the navigator.
  }

  @override
  Widget build(BuildContext context) => Container();
}
