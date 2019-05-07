import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:read/common/ColorsUtil.dart';
import 'package:read/common/DbProvider.dart';
import 'package:read/pages/BookStore.dart';
import 'package:read/pages/DrawerPage.dart';
import 'package:read/pages/MyInfoPage.dart';

void main() {
  runApp(new MyApp());
}

class MyApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new MyAppState();
  }
}

class MyAppState extends State<MyApp> with TickerProviderStateMixin {
  //设置需要展示的tab序列号
  int selectedIndex = 0;
  TabController controller;

  //底部bottomNavigationBar 例如首页或者我的 选中和未选中的颜色
  final tabTextStyleNormal =
      new TextStyle(color: Color(ColorsUtil.TYPEFACE_BLACK));
  final tabTextSytleSelected =
      new TextStyle(color: Color(ColorsUtil.TYPEFACE_BLACK));

  //image数组
  var tabImages;
  var bodyStack;

  //appBar的标题数组
  var appBarTitles = ['首页', '我的'];

  Image getTabImage(path) {
    return new Image.asset(path, width: 20.0, height: 20.0);
  }

  @override
  void initState() {
    super.initState();
    controller = TabController(vsync: this, length: 2);
    controller.addListener(() {
      setState(() {
        selectedIndex = controller.index;
      });
    });
  }

  void initData() {
    DbProvider commentProvider = new DbProvider();
    commentProvider.create();
    //当tabImages为空的时候初始化tabImages
    if (tabImages == null) {
      tabImages = [
        [
          getTabImage('images/icon_home.png'),
          getTabImage('images/icon_home_default.png')
        ],
        [
          getTabImage('images/icon_my.png'),
          getTabImage('images/icon_my_default.png')
        ]
      ];
    }
    bodyStack = new IndexedStack(
      children: <Widget>[new BookStore(), new MyInfoPage()],
      index: selectedIndex,
    );
  }

  TextStyle getTabTextStyle(int curIndex) {
    if (curIndex == selectedIndex) {
      return tabTextSytleSelected;
    }
    return tabTextStyleNormal;
  }

  Image getTabIcon(int curIndex) {
    if (curIndex == selectedIndex) {
      return tabImages[curIndex][0];
    }
    return tabImages[curIndex][1];
  }

  Text getTabTitle(int curIndex) {
    return new Text(
      appBarTitles[curIndex],
      style: getTabTextStyle(curIndex),
    );
  }

  @override
  Widget build(BuildContext context) {
    initData();
    return new MaterialApp(
      theme: new ThemeData(primaryColor: Colors.black),
      home: new Scaffold(
        appBar: new AppBar(
          //随着_tabIndex的改变 title的值和style也会改变
          title: new Text(
            appBarTitles[selectedIndex],
            style: new TextStyle(color: Colors.white),
          ),
          iconTheme: new IconThemeData(color: Colors.white),
        ),
        //  body: bodyStack,
        body: TabBarView(
          controller: controller,
          physics: NeverScrollableScrollPhysics(),
          children: <Widget>[new BookStore(), new MyInfoPage()],
        ),
        //这里设置bottomNavigationBar，对items数组进行填写
        bottomNavigationBar: new CupertinoTabBar(
          backgroundColor: const Color(0xFFEAE9E7),
          items: <BottomNavigationBarItem>[
            new BottomNavigationBarItem(
                //图片和文字 样式是固定的
                icon: getTabIcon(0),
                title: getTabTitle(0)),
            new BottomNavigationBarItem(
                icon: getTabIcon(1), title: getTabTitle(1))
          ],
          //当前选中的序列
          currentIndex: selectedIndex,
          //选中后的事件
          onTap: (index) {
            //必须调用setState方法不然界面不会更新
            setState(() {
              controller.index = index;
              selectedIndex = index;
            });
          },
        ),
        //这里是设置侧边栏的地方 先注释掉，下文会讲解
        drawer: new DrawerPage(),
      ),
    );
  }
}
