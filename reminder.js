// ■■■■リマインド関連■■■■■■■■■■■■■■■■■■■■■■■■■■■

// ミッキーの餌をあげるリマインド
function remindToFeedMickey() {
  var message = [
    {
      type: "text",
      text: "ミッキーにねずみあげてね"
    }
  ];
  pushTemplate(message);
}

// 粗品に肥料をあげるリマインド
function remindToGiveFertilizer() {
  var message = [
    {
      type: "text",
      text: "粗品に肥料あげたか？"
    }
  ];
  pushTemplate(message);
}

// がじゅに水をあげるリマインド
function remindForGaju() {
  var message = [
    {
      type: "text",
      text: "たまにはお外にだしてね"
    },
    {
      type: "text",
      text: "お水をちょうだい"
    }
  ];
  pushTemplate(message);
}

// TOHOの映画予約リマインド
function remindToInformTohoCinemasDay() {
  var message = [
    {
      type: "text",
      text: "もうすぐTOHOシネマズDAYだよ！"
    }
  ];
  pushTemplate(message);
}

// 109の映画予約リマインド
function remindToInform109CinemasDay() {
  var message = [
    {
      type: "text",
      text: "もうすぐ109シネマズの安い日だよ！"
    }
  ];
  pushTemplate(message);
}

// 109のペアデイ映画予約リマインド
function remindToInform109PiarDay() {
  var message = [
    {
      type: "text",
      text: "もうすぐ109シネマズのペアデイだよ！"
    }
  ];
  pushTemplate(message);
}

// 振込のリマインド
function remindYachin() {
  var message = [
    {
      type: "text",
      text: "そろそろ家賃振り込んでね"
    },
    {
      type: "text",
      text: "（お風呂掃除...）"
    }
  ];
  pushTemplate(message);
}
