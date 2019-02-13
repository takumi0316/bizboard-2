import 'scripts/utilities';
import 'scripts/initializer';
import 'scripts/pagy';
import 'scripts/image_converter';

(function() {

  Initializer.loadWebfont();
  Initializer.lazy();
  Initializer.drawer();
  Initializer.search();
  Initializer.smoothScroll();
  //Initializer.turbolinksDebug();

  // 初期表示時や、ajaxでのリクエスト時に発動
  document.addEventListener('turbolinks:load', function() {

    Initializer.lazy();
    Initializer.drawer();
    Initializer.search();
    Initializer.smoothScroll();
  });
})();

// react
import WebpackerReact from 'webpacker-react'

// flashメッセージ
import Alert from 'components/alert'

// かわいいキャラ
import Kawaii from 'components/kawaii'

// ロゴエディタ
import LogoEditor from 'components/logo_editor'

WebpackerReact.setup({
  Alert,
  Kawaii,
  LogoEditor,
})
