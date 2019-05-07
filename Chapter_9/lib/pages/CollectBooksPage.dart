import 'package:flutter/material.dart';
import 'package:read/common/DbProvider.dart';
import 'package:read/pages/BookDetailPage.dart';

class CollectBooksPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return new _CollectBooksPageState();
  }
}

class _CollectBooksPageState extends State<CollectBooksPage> {
  List<Map> listData = new List();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getCollectBooks();
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      appBar: AppBar(
        title: Text('我收藏的书籍'),
      ),
      body: Container(
        margin: EdgeInsets.all(8.0),
        child: new GridView.builder(
            physics: ClampingScrollPhysics(),
            shrinkWrap: true,
            gridDelegate: new SliverGridDelegateWithFixedCrossAxisCount(
                childAspectRatio: 6 / 9,
                mainAxisSpacing: 15.0,
                crossAxisSpacing: 15.0,
                crossAxisCount: 3),
            itemCount: listData.length,
            itemBuilder: (context, i) {
              return _bookRow(i);
            }),
//                ListTile(
//                    title: Text(
//                  '${listData[index]['name']}  ${listData[index]['book_id']} ${listData[index]['id']}  ',
//                )),
      ),
    );
  }

  getCollectBooks() async {
    DbProvider cp = new DbProvider();
    listData = await cp.getCollectBooks();
    setState(() {});
  }

  Widget _bookRow(i) {
    var itemData = listData[i];

    return GestureDetector(
      onTap: () {
        Navigator.of(context).push(MaterialPageRoute(
            builder: (context) => BookDetailPage(
                  id: itemData['book_id'],
                  name: itemData['name'],
                )));
      },
      child: Container(
        child: Column(
          children: <Widget>[
            Expanded(
              flex: 1,
              child: Material(
                  elevation: 8.0,
                  borderRadius: BorderRadius.circular(5.0),
                  shadowColor: Colors.blue.shade200,
                  child: Stack(children: <Widget>[
                    Container(
                      decoration: BoxDecoration(
                          color: Colors.white,
                          border: Border.all(color: Colors.grey, width: 1.0),
                          borderRadius: BorderRadius.circular(5.0)),
                    ),
                    Container(
                      alignment: Alignment.center,
                      padding:
                          EdgeInsets.symmetric(horizontal: 4.0, vertical: 2.0),
                      child: Image(
                        fit: BoxFit.fill,
                        image: NetworkImage(
                          itemData['img'] != null
                              ? itemData['img']
                              : '',
                        ),
                      ),
                    )
                  ])),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                itemData['name'],
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.body2,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
