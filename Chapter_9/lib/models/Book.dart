class Book {
  static const columnBookId = "book_id";
  static const columnName = "name";
  static const columnImg = "img";

  int id;
  String name;
  String bookId;
  String image;

  Book(this.name,this.bookId,this.image );

  Book.fromMap(Map<String, dynamic> map) {

    name = map[columnName];
    bookId = map[columnBookId];
    image = map[columnImg];
  }

  Map<String, dynamic> toMap() {
    var map = <String, dynamic>{ columnName: name,columnImg:image,columnBookId:bookId};

    return map;
  }
}
