import 'dart:async';
import 'dart:io';

import 'package:path/path.dart';
import 'package:read/models/Book.dart';
import 'package:read/models/Comment.dart';
import 'package:sqflite/sqflite.dart';

class DbProvider {
  String tableComment = "tableComment";
  String tableCollectBook = "tableCollectBook1";

  static const columnImg = "img";
  static const columnId = "_id";
  static const columnName = "name";
  static const columnContent = "content";
  static const columnBookId = "book_id";
  static const columnBook = "book";
  String dbName = 'read.db';

  Future<String> getPath() async {
    var databasesPath = await getDatabasesPath();
    String path = join(databasesPath, dbName);
    return path;
  }

  Future<String> createDb(String dbName) async {
    String path = await getPath();
    if (await new Directory(path).exists()) {
      await deleteDatabase(path);
    } else {
      try {
        await new Directory(dirname(path)).create(recursive: true);
      } catch (e) {
        print(e);
      }
    }
    return path;
  }

  create() async {
    var dbPath = await createDb(dbName);
    Database db = await openDatabase(dbPath);
    String sqlCreateTable =
        "create table  if not exists $tableComment($columnId integer primary key autoincrement,$columnName text,$columnContent text ,$columnBook text)";
    String sqlCreateTableCollect =
        "create table  if not exists $tableCollectBook($columnId integer primary key autoincrement,$columnName text,$columnBookId text,$columnImg text  )";
    await db.execute(sqlCreateTable);
    await db.execute(sqlCreateTableCollect);
    await db.close();
  }

//插入
  insert(Comment comment) async {
    String path = await getPath();
    Database db = await openDatabase(path);
    comment.id = await db.insert(tableComment, comment.toMap());
    //  await db.close();
  }

  //插入
  insertBook(Book book) async {
    if(await isCollcetBook(book.name)){

    }else{
      String path = await getPath();
      Database db = await openDatabase(path);
      await db.insert(tableCollectBook, book.toMap());
    }

    //  await db.close();
  }

  Future<bool> isCollcetBook(String bookName) async {
    String path = await getPath();
    Database db = await openDatabase(path);

    List<Map> maps = await db.rawQuery("SELECT * FROM " +
        tableCollectBook +
        " where name like '" +
        bookName +
        "'");
    if (maps.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  Future<int> deleteCollcetBook(String bookName) async {
    String path = await getPath();
    Database db = await openDatabase(path);
    String sql = "DELETE FROM " + tableCollectBook + " where name = ?";
    int count = await db.rawDelete(sql, [bookName]);
    return count;
  }

  //查询
  Future<List<Map>> getCollectBooks() async {
    String path = await getPath();
    Database db = await openDatabase(path);
    List<Map> maps = await db.rawQuery("SELECT DISTINCT * FROM " + tableCollectBook);
    //  await db.close();
    return maps;
  }

  //查询
  Future<List<Map>> getCommentsByBook(String bookName) async {
    String path = await getPath();
    Database db = await openDatabase(path);
    List<Map> maps = await db.rawQuery("SELECT * FROM " +
        tableComment +
        " where name like '" +
        bookName +
        "'");
    //  await db.close();
    return maps;
  }
}
