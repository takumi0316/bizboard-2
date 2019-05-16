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

// 見積り作成
import QuoteEditor from 'components/quote_editor'

// 案件詳細
import ProjectViewer from 'components/project_viewer'

// 部署
import CompanyDivisions from 'components/company_divisions'

// 部署(外注)
import SubcontractorDivisions from 'components/subcontractor_divisions'

// 作業進捗
import WorkStatus from 'components/work_editor/work_status/index.jsx'

// 作業検索
import WorksSearch from 'components/work_editor/works_search/index.jsx'

// 作業詳細作成
import WorkEditor from 'components/work_editor/index.jsx'


// 見積もり
import QuoteFrom from 'components/quote_from/index.jsx'

WebpackerReact.setup({
  Alert,
  Kawaii,
  LogoEditor,
  ProjectEditor,
  QuoteEditor,
  ProjectViewer,
  CompanyDivisions,
  WorksSearch,
  WorkStatus,
  SubcontractorDivisions,
  WorkEditor,
  QuoteFrom,
})
