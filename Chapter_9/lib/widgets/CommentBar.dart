import 'package:flutter/material.dart';
import 'package:read/common/DbProvider.dart';
import 'package:read/models/Comment.dart';
import 'package:read/pages/BookDetailPage.dart';

class CommentBar extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _CommentBarState();
  }
}

class _CommentBarState extends State<CommentBar> {
  String _name;
  String _book;
  //文本编辑控制器 可用于监听文本内容的改变
  TextEditingController editController = new TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: EdgeInsets.symmetric(vertical: 2.0),
      child: Row(
        children: <Widget>[
          Expanded(
            child: TextField(
              controller: editController,
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

              cp.insert(new Comment(_name, _book, editController.text));

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


}




