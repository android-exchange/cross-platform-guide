class Comment {
  static const columnId = "_id";
  static const columnName = "name";
  static const columnContent = "content";
  static const columnBook = "book";

  int id;
  String name;
  String content;
  String book;


  Comment( this.name, this.content, this.book,[this.id]);

  Comment.fromMap(Map<String, dynamic> map) {
    id = map[columnId];
    name = map[columnName];
    content = map[columnContent];
    book = map[columnBook];
  }

  Map<String, dynamic> toMap() {
    var map = <String, dynamic>{columnName: name, columnContent: content,columnBook:book};

    return map;
  }

}
