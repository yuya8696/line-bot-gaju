// スクリプトプロパティの操作のための変数
var PROP = PropertiesService.getScriptProperties();
// LINE developersのメッセージ送受信設定に記載のアクセストークン
var ACCESS_TOKEN = PROP.getProperty("ACCESS_TOKEN");
// 必要なURL情報の定義
var URL_REPLY = "https://api.line.me/v2/bot/message/reply";
var URL_PROFILE = "https://api.line.me/v2/bot/profile";
var URL_PUSH = "https://api.line.me/v2/bot/message/push";

// リクエストの共通部分（ヘッダー）を定義
var HEADERS = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + ACCESS_TOKEN
};

// ■■■■おうむ返し機能■■■■■■■■■■■■■■■■■■■■■■■■■■■
function doPost(e) {
  var event = JSON.parse(e.postData.contents).events[0];
  // WebHookで受信した応答用Token
  var replyToken = event.replyToken;
  // ユーザーのメッセージを取得
  var userMessage = event.message.text;
  // ユーザーIDを種tp区
  var user_id = event.source.userId;
  // アカウント名を取得
  var account_name = getUserDisplayName(user_id);
  if (PROP.getProperty(account_name) === null) {
    PROP.setProperty(account_name, user_id);
  }

  var postData = {
    replyToken: replyToken,
    messages: [
      {
        type: "text",
        text: "がじゅだよ。" + userMessage
      }
    ]
  };

  var options = {
    headers: HEADERS,
    method: "post",
    payload: JSON.stringify(postData)
  };
  UrlFetchApp.fetch(URL_REPLY, options);
  return ContentService.createTextOutput(
    JSON.stringify({ content: "post ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function getUserDisplayName(user_id) {
  var options = {
    headers: HEADERS,
    method: "get"
  };
  var res = UrlFetchApp.fetch(URL_PROFILE + "/" + user_id, options);
  return JSON.parse(res).displayName;
}

// ■■■■pushの共通処理■■■■■■■■■■■■■■■■■■■■■■■■■■■
function pushTemplate(message) {
  // スクリプトのプロパティに設定している値の取得
  var props = PROP.getProperties();
  for (var prop in props) {
    if (prop !== "ACCESS_TOKEN") {
      var postData = {
        to: props[prop],
        messages: message
      };

      var options = {
        method: "post",
        headers: HEADERS,
        payload: JSON.stringify(postData)
      };
      var response = UrlFetchApp.fetch(URL_PUSH, options);
    }
  }
}

//■■■■番組表取得■■■■■■■■■■■■■■■■■■■■■■■■■■■
//function getTvGuide() {
//  var html = UrlFetchApp.fetch('https://www.fujitv.co.jp/search/index.html?keyword=クイズ').getContentText();
//  var parser = Parser.data(html);
//  Logger.log(parser)
//}
