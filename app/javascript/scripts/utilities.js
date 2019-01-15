//##############################################################################
// Utilities
//##############################################################################

/**
 *  汎用クラス
 *  @version 2018/06/10
 */
window.Utilities = window.Utilities||{};

(function() {
  
  'use strict';

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  function Utilities() {

    // DOMの機能を拡張
    Element.prototype.appendAfter = function (element) {
      element.parentNode.insertBefore(this, element.nextSibling);
    }, false;
    Element.prototype.appendBefore = function (element) {
      element.parentNode.insertBefore(this, element);
    }, false;

    // HTMLCollectionの機能を拡張
    if (typeof HTMLCollection.prototype.forEach === 'undefined') HTMLCollection.prototype.forEach = Array.prototype.forEach;
  }

  var p = Utilities.prototype;

  /**
   *  日付のフォーマット
   *  @version 2018/06/10
   */
  p.dateFormat = function(str) {
    
    var date = new Date(str.replace( /-/g, '/'));
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
  }

  /**
   *  数値のカンマ区切り
   *  @version 2018/06/10
   */
  p.numberWithDelimiter = function(num) {

    return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  }

  /**
   *  スクロール領域の高さを取得
   *  @version 2018/06/10
   */
  p.getScrollHeight = function() {

    var html = window.document.documentElement;
    return html.scrollHeight - html.clientHeight;
  };

  /**
   *  URLのGETパラメータを取得
   *  @version 2018/06/10
   */
  p.getQueryStrings = function() {

    var result = [];
    var params = location.search.substring(1).split('&');

    for(var i=0; params[i]; i++) {
      var key_value = params[i].split('=');
      result[key_value[0]] = key_value[1];
    }
    return result;
  }

  /**
   *  文字列をクリップボードにコピーする
   *  @version 2018/06/10
   */
  p.copyToClipboard = function(text){

    var temp = document.createElement('div');
  
    temp.appendChild(document.createElement('pre')).textContent = text;
  
    var s = temp.style;
    s.position = 'fixed';
    s.left = '-100%';
  
    document.body.appendChild(temp);
    document.getSelection().selectAllChildren(temp);
  
    var result = document.execCommand('copy');
  
    document.body.removeChild(temp);
    return result;
  }

  window.Utilities = new Utilities;
})();
