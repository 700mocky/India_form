/**
 * 名刺入れアンケート - Google Apps Script
 *
 * セットアップ:
 * 1. Google Spreadsheetを新規作成
 * 2. 拡張機能 > Apps Script を開く
 * 3. このコードを貼り付けて保存
 * 4. デプロイ > 新しいデプロイ > ウェブアプリ
 *    - 実行ユーザー: 自分
 *    - アクセス: 全員
 * 5. 表示されたURLをindex.htmlのGAS_URLに設定
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('回答');

    if (!sheet) {
      sheet = ss.insertSheet('回答');
      sheet.appendRow([
        'タイムスタンプ',
        '気に入ったデザイン',
        'プレゼント予算',
        '購入意向'
      ]);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.timestamp,
      data.designs,
      data.budget,
      data.purchase
    ]);

    const rowNum = sheet.getLastRow();
    if (rowNum === 2) {
      sheet.autoResizeColumns(1, 4);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
