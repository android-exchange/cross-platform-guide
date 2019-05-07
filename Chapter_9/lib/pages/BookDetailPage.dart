import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:read/api/Api.dart';
import 'package:read/api/NetUtils.dart';
import 'package:read/common/DbProvider.dart';
import 'package:read/common/DialogUtils.dart';
import 'package:read/models/Book.dart';
import 'package:read/models/Comment.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BookDetailPage extends StatefulWidget {
  final String id;
  final String name;

  const BookDetailPage({Key key, this.id, this.name}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return new _BookDetailPageState(id);
  }
}

class _BookDetailPageState extends State<BookDetailPage> {
  String id = '';
  List<Map> dataList = new List();

  _BookDetailPageState(this.id);

  String image = '';
  String introduce = '';
  int commentLength = 0;
  String name = '';
  String book = '';
  bool isCollect = false;

  //文本编辑控制器 可用于监听文本内容的改变
  TextEditingController controllerEdit = new TextEditingController();

  @override
  void initState() {
    super.initState();
    getBookDetail();

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(name)),
      body: Container(
        color: Colors.white,
        padding: EdgeInsets.symmetric(vertical: 8.0, horizontal: 4.0),
        child: Stack(
          children: <Widget>[
            Container(
              color: Colors.white,
              margin: EdgeInsets.only(bottom: 50.0),
              child: ListView(
                primary: true,
                children: <Widget>[
                  Container(
                    margin: EdgeInsets.all(20.0),
                    height: 200.0,
                    alignment: Alignment.center,
                    child: Image.network(
                      image,
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.all(20.0),
                    child: Text(
                      introduce,
                      style: TextStyle(fontSize: 20.0),
                    ),
                  ),
                  Container(
                    margin:
                        EdgeInsets.only(left: 20.0, right: 20.0, bottom: 20.0),
                    child: Divider(
                      height: 2.0,
                      color: Colors.black,

                    ),
                  ),
                  Container(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: <Widget>[
                        Container(
                          child: Text(
                            '收藏',
                            style: TextStyle(fontSize: 20.0),
                          ),
                          margin: EdgeInsets.only(right: 10.0),
                        ),
                        Container(
                            margin: EdgeInsets.only(right: 20.0),
                            child:
                                new IconButton(

                                  icon: (isCollect
                                      ? new Icon(Icons.star)
                                      : new Icon(Icons.star_border)),
                                  color: Colors.blue[500],
                                  onPressed: () {
                                   collectBook();
                                  },

                                ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(
                      top: 20.0,
                    ),
                    height: 20.0,
                    color: Colors.black12,
                  ),
                  Container(
                    margin: EdgeInsets.only(left: 20.0, top: 15.0),
                    child: Text(
                      '全部留言 (共$commentLength条)',
                      style: TextStyle(fontSize: 16.0),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(
                        left: 20.0, right: 20.0, bottom: 20.0, top: 10.0),
                    child: Divider(
                      height: 2.0,
                      color: Colors.black,
                    ),
                  ),
                  ListView.builder(
                    scrollDirection: Axis.vertical,
                    physics: ClampingScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: dataList.length,
                    itemBuilder: (context, index) {
                      return itemComment(dataList[index]['book']);
                    },
                  ),
                ],
              ),
            ),
            Positioned(
              bottom: 0.0,
              left: 0.0,
              right: 0.0,
              child: CommentBar(),
            )
          ],
        ),
      ),
    );
  }

  void getBookDetail() async {
    String url = Api.BOOK_DETAIL + id;
    NetUtils.get(url).then((data) {
      if (data != null) {
        Map<String, dynamic> map = json.decode(data);
        if (map['code'] == 0) {
          name = map['data']['name'];
          getInfo(name);

          image = map['data']['image'];
          introduce = map['data']['introduce'];
          getCommetList(name);
          setState(() {});


        }
      }
    });

  }

  getCommetList(String bookName) async {
    DbProvider cp = new DbProvider();

    dataList = await cp.getCommentsByBook(bookName);

    setState(() {
      commentLength = dataList.length;
    });
  }

  Widget CommentBar() {
    return Container(
      color: Colors.white,
      padding: EdgeInsets.symmetric(vertical: 2.0),
      child: Row(
        children: <Widget>[
          Expanded(
            child: TextField(
              controller: controllerEdit,
              style: TextStyle(height: 0.8, color: Colors.black),
              decoration: InputDecoration(
                hintText: '在此发表评论',
                border: InputBorder.none,
                filled: true,
                fillColor: Colors.grey,
              ),
            ),
          ),
          SizedBox(
            width: 8.0,
          ),
          RaisedButton(
            onPressed: () {
              DbProvider cp = new DbProvider();

              cp.insert(new Comment(name, book, controllerEdit.text));

              getCommetList(name);
              controllerEdit.text = '';
              FocusScope.of(context).requestFocus(FocusNode());
            },
            color: Colors.blue,
            child: Text(
              '评论',
              style: TextStyle(color: Colors.white),
            ),
          )
        ],
      ),
    );
  }

  @override
  void dispose() {
    controllerEdit.dispose();
    super.dispose();
  }

  Widget itemComment(String content) {
    return Container(
      margin: EdgeInsets.all(20.0),
      child: Row(
        children: <Widget>[
          CircleAvatar(
            backgroundImage: new AssetImage('images/img_header.jpeg'),
            backgroundColor: Colors.white,
            radius: 30.0,
          ),
          Expanded(
            child: Column(
              children: <Widget>[
                Container(
                  margin: EdgeInsets.only(left: 15.0, bottom: 2.0),
                  alignment: Alignment.centerLeft,
                  child: Text('用户xxx'),
                ),
                Container(
                  margin: EdgeInsets.only(left: 15.0, top: 2.0),
                  alignment: Alignment.centerLeft,
                  child: Text(
                    content,
                    style: TextStyle(fontSize: 16.0),
                  ),
                ),
              ],
            ),
          ),
          Text('10'),
          Container(
              margin: EdgeInsets.only(left: 10.0, right: 20.0),
              child: Image.asset('images/icon_praise.png', width: 20.0, height: 20.0)),
        ],
      ),
    );
  }
  void getInfo(String name) async {

    // 获取存储数据
   isCollect = await new DbProvider().isCollcetBook(name) ;


    setState(() {});
  }
  collectBook() {

    setState(() {

      if(isCollect){
        isCollect =false;
        new DbProvider().deleteCollcetBook(name);
      }else{
        isCollect = true;
        new DbProvider().insertBook(new Book(name,id,image));
      }

    });

  }
}
