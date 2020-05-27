//##############################################################################
// Initializer
//##############################################################################

import Turbolinks from 'turbolinks';
import Lozad      from 'lozad';

/**
 *  初期化クラス
 *  @version 2018/06/10
 */
window.Initializer = window.Initializer||{};

(function(window, document, undefined) {
  
  'use strict';

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  function Initializer() {

    // Turbolinks.start();

    // turbolinksのパッチ
    // this.setTurbolinksMonkeyPatch();
    
    // 画像の遅延読み込み
    this.lazy_load = Lozad('.lazy', {
      threshold: 0.1,
      load: (el) => {

        el.classList.remove('lazy');
        el.src = el.dataset.original;
        el.removeAttribute('data-original');
      }
    });
  }

  var p = Initializer.prototype;

  /**
   *  webfontをダウンロード
   *  @version 2018/06/10
   */
  p.loadWebfont = function() {
    
    document.getElementById('js-webfont').rel = 'stylesheet';
  };

  /**
   *  lazyloadを開始
   *  @version 2018/06/10
   */
  p.lazy = function() {

    // 画像の遅延読み込み
    this.lazy_load.observe();
  };

  /**
   *  drawerを開始
   *  @version 2018/06/10
   */
  p.drawer = function() {

    document.querySelectorAll('.js-drawerOpen').forEach(trigger => trigger.onclick = () => {
      
      document.body.dataset.menuOpen = document.body.dataset.menuOpen == 'true'? 'false' : 'true';

      // アクセシビリティ
      document.querySelectorAll('.js-drawerOpen').forEach((trigger) => {

        trigger.setAttribute('aria-pressed', document.body.dataset.menuOpen);
      });
    });
  };

  /**
   *  検索メニュー表示
   *  @version 2018/06/10
   */
  p.search = function() {
    
    document.querySelectorAll('.js-searchOpen').forEach(trigger => trigger.onclick = () => {

      document.body.dataset.searchOpen = document.body.dataset.searchOpen == 'true'? 'false' : 'true';

      // アクセシビリティ
      document.querySelectorAll('.js-searchOpen').forEach((trigger) => {

        trigger.setAttribute('aria-pressed', document.body.dataset.searchOpen);
      });
    });
  };

  /**
   *  turbolinkで404発生時にJSが再実行されるのを防ぐ
   *  @version 2018/06/10
   */
  p.setTurbolinksMonkeyPatch = function() {
    
    window.Turbolinks.HttpRequest.prototype.requestLoaded = function() {
      return this.endRequest( () => {

        var code = this.xhr.status;
        if (200 <= code && code < 300 || code === 403 || code === 404 || code === 500) {

          this.delegate.requestCompletedWithResponse(
            this.xhr.responseText,
            this.xhr.getResponseHeader('Turbolinks-Location')
          );
        } else {

          this.failed = true;
          this.delegate.requestFailedWithStatusCode(code, this.xhr.responseText);
        }
      });
    };
  }

  /**
   *  turbolinkのdebug
   *  @version 2018/06/10
   */
  p.turbolinksDebug = function() {

    // linkクリック時
    document.addEventListener('turbolinks:click', function(e) {
    });
    document.addEventListener('turbolinks:before-visit', function(e) {
    });
    // ページ遷移前 以前: page:before-unload
    document.addEventListener('turbolinks:request-start', function(e) {
    });
    document.addEventListener('turbolinks:visit', function(e) {
    });
    document.addEventListener('turbolinks:request-end', function(e) {
    });
    document.addEventListener('turbolinks:before-cache', function(e) {
    });
    document.addEventListener('turbolinks:before-render', function(e) {
    });
    // ページ切り替え時（初回ページは対象外） 以前: page:before-unload
    document.addEventListener('turbolinks:render', function(e) {
    });
    // ページ切り替え時（初回ページも対象） 以前: ready page:load
    document.addEventListener('turbolinks:load', function(e) {
    });
  };

  window.Initializer = new Initializer;
})(window, document);
