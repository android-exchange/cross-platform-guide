import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:read/api/Api.dart';
import 'package:read/api/NetUtils.dart';
import 'package:read/common/ColorsUtil.dart';
import 'package:read/models/BookTab.dart';
import 'package:read/pages/BookList.dart';

class BookStore extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new BookStoreState();
  }
}

class BookStoreState extends State<BookStore>
    with SingleTickerProviderStateMixin {
  TabController tabController;

//
  List<BookTab> myTabs = new List();

  //异步网络请求获取tab的数组信息
  void getTabList() async {
    String url = Api.BOOK_TAB;
    NetUtils.get(url).then((data) {
      if (data != null) {
        Map<String, dynamic> map = json.decode(data);

        if (map['code'] == 0) {
          List _listdata  = map['data'];


          for (int i = 0; i < _listdata.length; i++) {
            String str = _listdata[i]['name'];
            myTabs.add(new BookTab(str,
                new BookList(bookType: str)));
          }
        }
        tabController = new TabController(vsync: this, length: myTabs.length);
        setState(() {});
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        backgroundColor: const Color(0xFFEAE9E7),
        title: new TabBar(
          labelColor: Color(ColorsUtil.TYPEFACE_BLACK),
          unselectedLabelColor: Color(ColorsUtil.TYPEFACE_BLACK),
          indicatorWeight: 2.0,
          controller: tabController,
          tabs: myTabs.map((item) {
            return new Tab(text: item.text);
          }).toList(),
          //使用Tab类型的数组呈现Tab标签
          indicatorColor: Color(ColorsUtil.TYPEFACE_BLACK),
          isScrollable: true,
        ),
      ),
      body: new TabBarView(
        controller: tabController,
        children: myTabs.map((item) {
          // return item.bookList;
          return item.bookList;
        }).toList(),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    tabController = new TabController(vsync: this, length: myTabs.length);
    getTabList();
    setState(() {});
  }

  @override
  void dispose() {
    tabController.dispose();
    super.dispose();
  }
}
