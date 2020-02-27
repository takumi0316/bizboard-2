import 'scripts/utilities';
import 'scripts/initializer';
import 'scripts/pagy';
import 'scripts/image_converter';

(function() {

  Initializer.loadWebfont();
  Initializer.lazy();

  // 初期表示時や、ajaxでのリクエスト時に発動
  document.addEventListener('turbolinks:load', function() {

    Initializer.lazy();
  });
})();

// react
import WebpackerReact from 'webpacker-react';

// flashメッセージ
import Alert from 'components/alert';

// かわいいキャラ
import Kawaii from 'components/kawaii';

// ロゴエディタ
import LogoEditor from 'components/logo_editor';

// 案件作成
import ProjectEditor from 'components/project_editor';

// 見積り作成
import QuoteEditor from 'components/quote_editor';

//見積もり検索
import QuoteSearch from 'components/quote_search';

// 案件詳細
import ProjectViewer from 'components/project_viewer';

// 部署
import CompanyDivisions from 'components/company_divisions';

// 部署(外注)
import SubcontractorDivisions from 'components/subcontractor_divisions';

// 作業進捗
import WorkStatus from 'components/work_editor/work_status/index.jsx';

// 作業検索
import WorksSearch from 'components/work_editor/works_search/index.jsx';

// 作業詳細作成
import WorkEditor from 'components/work_editor/index.jsx';

// 見積もり品目表示
import QuoteProject from 'components/work_editor/quote_project';

// 請求書検索
import InvoiceSearch from 'components/invoice_search/index.jsx';

// 外注金額検索
import PaymentSearch from 'components/payment_search/index.jsx';

// 請求情報検索
import ProfitSearch from 'components/profit_search/index.jsx';

// 経費入力
import ExpendablesEditor from 'components/expendables_editor/index.jsx';

// 経費検索
import ExpendablesSearch from 'components/expendables_search/index.jsx';

// 目標管理グラフ
import Target from 'components/target';

// 試し活動履歴グラフ
import TargetGraph from 'components/target_graph';

// 試し活動履歴グラフ
import ProspectGraph from 'components/prospect_graph';

// 納品書検索
import DeliverySearch from 'components/delivery_editor/delivery_search';

// 納品書PDF作成
import DeliveryPdfGenerator from 'components/delivery_editor/pdf_generator';

// 見積書検索
import QuotationSearch from 'components/quotations/quotation_search';

// 見積書PDF作成
import QuotationPdfGenerator from 'components/quotations/pdf_generator';

// 請求書PDF作成
import InvoicePdfGenerator from 'components/invoice_editor/pdf_generator';

WebpackerReact.setup({
  Alert,
  Kawaii,
  LogoEditor,
  ProjectEditor,
  QuoteEditor,
  QuoteSearch,
  ProjectViewer,
  CompanyDivisions,
  WorksSearch,
  WorkStatus,
  SubcontractorDivisions,
  WorkEditor,
  QuoteProject,
  InvoiceSearch,
  PaymentSearch,
  ProfitSearch,
  ExpendablesEditor,
  ExpendablesSearch,
  Target,
  TargetGraph,
	ProspectGraph,
	DeliverySearch,
	DeliveryPdfGenerator,
	QuotationSearch,
	QuotationPdfGenerator,
	InvoicePdfGenerator,
})
