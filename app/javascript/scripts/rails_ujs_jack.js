
window.RailsUjsJack = window.RailsUjsJack||{};

/**
 *  RailsUjsJack Class
 *  @version 2018/06/10
 */
(function() {

  'use strict';

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  function RailsUjsJack() {};

  var p = RailsUjsJack.prototype;

  p.Rails = {}

  /**
   *  RailsUjsが実施する処理をjackし、リンク時のconfirm処理等を変更する
   *  @version 2018/06/10
   */
  p.jack = function(Rails) {

    this.Rails = Rails;

    Rails.delegate(document, this.confirmableSelector, 'click', this.handleConfirm.bind(this));
  }

  p.confirmableSelector = 'a[data-confirmable]';

  /**
   *  confirm時の処理
   *  @version 2018/06/10
   */
  p.handleConfirm = function(e) {

    const message = e.target.getAttribute('data-confirmable');
    if (!message) return true;

    this.Rails.stopEverything(e);

    window.confirmable({ icon: 'warning', message: message, callback: function() {

      e.target.removeAttribute('data-confirmable');
      e.target.click();
      e.target.setAttribute('data-confirmable', message);
    }});
  }

  window.RailsUjsJack = new RailsUjsJack;
})();
