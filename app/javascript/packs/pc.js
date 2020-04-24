const Rails = require('@rails/ujs');
import 'scripts/utilities';
import 'scripts/initializer';
import 'scripts/pagy';
import 'scripts/image_converter';
import 'scripts/xhr_request';
import 'scripts/rails_ujs_jack';

(function() {

  Initializer.loadWebfont();
  RailsUjsJack.jack(Rails);
  Rails.start();
  Initializer.lazy();

  // 初期表示時や、ajaxでのリクエスト時に発動
  document.addEventListener('turbolinks:load', function() {

    Initializer.lazy();
  });
})();

// react
import WebpackerReact from 'webpacker-react';

// 汎用モーダル
import DataModal from 'components/data_modal';

// flashメッセージ
import Alert from 'components/alert';

// かわいいキャラ
// import Kawaii from 'components/kawaii';

// ロゴエディタ
import LogoEditor from 'components/logo_editor';

// 案件作成
import ProjectEditor from 'components/project_editor';

// 見積り作成
import QuoteEditor from 'components/quote_editor';

//見積もり検索
import QuoteSearch from 'components/quote_search';

// 案件詳細
// import ProjectViewer from 'components/project_viewer';

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

// 丸の内CSV書き出し日付検索
import MarunouchiSearchable from 'components/api/marunouchi/searchable';

// 名刺マスタ登録(新規作成)
import NewCardTemplateGenerate from 'components/card/template/template_generate/new.jsx';

// 名刺マスタ登録(更新)
// import EditCardTemplateGenerate from 'components/card/template/template_generate/edit.jsx';

// 名刺情報登録(新規作成)
// import NewCardClientGenerate from 'components/card/client/generate/new.jsx';

// 名刺担当者情報登録(更新)
// import EditCardClientGenerate from 'components/card/client/generate/edit.jsx';

// 名刺担当者情報登録(更新)
// import CardClientSearch from 'components/card/client/search';

// 名刺担当者情報CSVダウンロード
// import DownloadCardClient from 'components/card/client/csv/download';

// 名刺担当者情報CSVアップロード
// import UploadCardClient from 'components/card/client/csv/upload';

WebpackerReact.setup({
  Alert,
  DataModal,
  LogoEditor,
  ProjectEditor,
  QuoteEditor,
  QuoteSearch,
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
	MarunouchiSearchable,
  NewCardTemplateGenerate,
  // EditCardTemplateGenerate,
  // NewCardClientGenerate,
  // EditCardClientGenerate,
  // CardClientSearch,
  // DownloadCardClient,
  // UploadCardClient,
});