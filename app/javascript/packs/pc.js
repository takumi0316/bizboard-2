import 'scripts/utilities';
import 'scripts/initializer';
import 'scripts/pagy';
import 'scripts/image_converter';

(function() {

  Initializer.loadWebfont();
  Initializer.lazy();
  Initializer.smoothScroll();
  //Initializer.turbolinksDebug();

  // 初期表示時や、ajaxでのリクエスト時に発動
  document.addEventListener('turbolinks:load', function() {

    Initializer.lazy();
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

// 案件作成
import ProjectEditor from 'components/project_editor'

// 案件詳細
import ProjectViewer from 'components/project_viewer'

// 部署
import CompanyDivisions from 'components/company_divisions'

WebpackerReact.setup({
  Alert,
  Kawaii,
  LogoEditor,
  ProjectEditor,
  ProjectViewer,
  CompanyDivisions,
})
