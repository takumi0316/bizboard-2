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

// 部署(外注)
import SubcontractorDivisions from 'components/subcontractor_divisions'

// 作業進捗
import WorkStatus from 'components/work_management/work_status/status_visualization.jsx'

// 作業検索
import WorksSearch from 'components/work_management/works_search/search.jsx'

// 作業詳細
import WorkDetails from 'components/work_management/work_details/add_details.jsx'

// 作業詳細外注
import WorkSubcontractor from 'components/work_subcontractor/add_subcontractor/index.jsx'

// 作業詳細作成
import WorkEditor from 'components/work_editor/index.jsx'

WebpackerReact.setup({
  Alert,
  Kawaii,
  LogoEditor,
  ProjectEditor,
  ProjectViewer,
  CompanyDivisions,
  WorksSearch,
  WorkDetails,
  WorkStatus,
  SubcontractorDivisions,
  WorkSubcontractor,
  WorkEditor,
})
