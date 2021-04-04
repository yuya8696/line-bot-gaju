//■■■■モーニング娘。の最新ニュース取得■■■■■■■■■■■■■■■■■■■■■■■■■■■
var CURRENT_TIME = new Date();

function informMoringMusumeNews() {
  // 紐づいているスプレッドシートの情報を取得
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();

  // 1.ニュースフィードを取得
  var feedsObj = getFeeds(sheets[0]);

  // ニュースフィード毎に最新か確認し、配列に格納
  var newFeeds = [];
  for (var i in feedsObj["feeds"]) {
    // 2.前回の取得以降に配信されたニュースかチェック
    if (
      new Date(feedsObj["feeds"][i][2]).getTime() >
      new Date(feedsObj["lastCheckTime"]).getTime()
    ) {
      // 3.最新のニュースフィードのみ配列に追加
      newFeeds.push(feedsObj["feeds"][i]);
    }
  }
  Logger.log("newFeeds：" + newFeeds); // デバッグ用

  // Botで通知するメッセージの作成
  for (var i in newFeeds) {
    var message = [
      {
        type: "text",
        text: newFeeds[i][0] + "\r\n" + newFeeds[i][1]
      }
    ];
    Logger.log("メッセージ：" + message[0].text); // デバッグ用

    // 4. 配列をLINE Botにpush
    pushTemplate(message);
  }
}

function getFeeds(sheet) {
  // １週間前の日時を取得
  var pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 7);

  // 最終更新日を取得。更新日のセルが未入力だった場合は１週間前の日時を入れる
  var lastCheckTime = sheet.getRange("C1").getValue() || pastDate;
  Logger.log("lastCheckTime：" + lastCheckTime); // デバッグ用

  // 更新日のセルに現在日時を設定（C1セルが更新されるとスクレイピングを始めるので3秒待つ）
  sheet.getRange("C1").setValue(CURRENT_TIME);
  Utilities.sleep(3000);

  // スクレイピングしたフィードを取得
  var lastRow = sheet.getLastRow();
  var feeds = sheet.getRange(3, 1, lastRow - 2, 3).getValues();

  return { feeds: feeds, lastCheckTime: lastCheckTime };
}
