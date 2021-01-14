import Rails from '@rails/ujs'
import 'scripts/utilities'
import 'scripts/initializer'
import 'scripts/pagy'
import 'scripts/image_converter'
import 'scripts/xhr_request'
import 'scripts/rails_ujs_jack'

(function() {

  Initializer.loadWebfont()
  RailsUjsJack.jack(Rails)
  Rails.start()
  Initializer.lazy()

  // 初期表示時や、ajaxでのリクエスト時に発動
  document.addEventListener('turbolinks:load', function() {

    Initializer.lazy()
  })
})()

// react
import WebpackerReact from 'webpacker-react'

import Kawaii from 'components/kawaii'

// 汎用モーダル
import DataModal from 'components/data_modal'

// flashメッセージ
import Alert from 'components/alert'

// ロゴエディタ
import LogoEditor from 'components/logo_editor'

// 案件作成
import ProjectEditor from 'components/project_editor'

//見積もり検索
import QuoteSearch from 'components/quote_search'

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

// 見積もり品目表示
import QuoteProject from 'components/work_editor/quote_project'

// 請求書検索
import InvoiceSearch from 'components/invoice_search/index.jsx'

// 外注金額検索
import PaymentSearch from 'components/payment_search/index.jsx'

// 請求情報検索
import ProfitSearch from 'components/profit_search/index.jsx'

// 経費入力
import ExpendablesEditor from 'components/expendables_editor/index.jsx'

// 経費検索
import ExpendablesSearch from 'components/expendables_search/index.jsx'

// 目標管理グラフ
import Target from 'components/target'

// 試し活動履歴グラフ
import TargetGraph from 'components/target_graph'

// 試し活動履歴グラフ
import ProspectGraph from 'components/prospect_graph'

// 納品書検索
import DeliverySearch from 'components/delivery_editor/delivery_search'

// 納品書PDF作成
import DeliveryPdfGenerator from 'components/delivery_editor/pdf_generator'

// 見積書検索
import QuotationSearch from 'components/quotations/quotation_search'

// 見積書PDF作成
import QuotationPdfGenerator from 'components/quotations/pdf_generator'

// 請求書PDF作成
import InvoiceEditor from 'components/invoice_editor/'

// 丸の内CSV書き出し日付検索
import MarunouchiSearchable from 'components/api/marunouchi/searchable'

// 名刺マスタ登録(新規作成)
import NewCardTemplateGenerate from 'components/card/template/generate/new'

// 名刺マスタ登録(更新)
import EditCardTemplateGenerate from 'components/card/template/generate/edit'

// 名刺情報登録(新規作成)
import NewCardClientGenerate from 'components/card/client/generate/new'

// 名刺担当者情報登録(更新)
import EditCardClientGenerate from 'components/card/client/generate/edit'

// 名刺担当者情報CSVダウンロード
import DownloadCardClient from 'components/card/client/csv/download'

// 名刺担当者情報CSVアップロード
import UploadCardClient from 'components/card/client/csv/upload'

// 在庫管理の部署選択
import InventoryDivisionsSelect from 'components/inventory_divisions_select'

// 受注管理グラフ
import ProfitGraph from 'components/profit_graph'

import ImageUploader from 'components/image_uploader'

import CardLayout from 'components/card_layout'

import CardTemplate from 'components/card_template'

import TemplateClient from 'components/template_client'

import CSVUpload from 'components/template_client/upload'

import Search from 'components/form/search'

import LinkTo from 'components/rails/link_to'

import RegistorCompany from 'components/company/registor'

import ShowCompany from 'components/company/show'

import CompanyDivisionList from 'components/company/division/list'

import RegistorCompanyDivision from 'components/company/division/registor'

import ShowCompanyDivision from 'components/company/division/show'

import CompanyDivisionClientList from 'components/company/division/client/list'

import RegistorCompanyDivisionClient from 'components/company/division/client/registor'

import ShowCompanyDivisionClient from 'components/company/division/client/show'

import Trials from 'components/trials'

import MFLikeModal from 'components/mf_like_modal'

import QuoteEditor from 'components/quote_editor'

WebpackerReact.setup({
  Kawaii,
  Alert,
  DataModal,
  LogoEditor,
  ProjectEditor,
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
	InvoiceEditor,
  MarunouchiSearchable,
  NewCardTemplateGenerate,
  EditCardTemplateGenerate,
  NewCardClientGenerate,
  EditCardClientGenerate,
  DownloadCardClient,
  UploadCardClient,
  InventoryDivisionsSelect,
  ProfitGraph,
  ImageUploader,
  CardLayout,
  CardTemplate,
  TemplateClient,
  CSVUpload,
  Search,
  LinkTo,
  RegistorCompany,
  ShowCompany,
  CompanyDivisionList,
  RegistorCompanyDivision,
  ShowCompanyDivision,
  CompanyDivisionClientList,
  RegistorCompanyDivisionClient,
  ShowCompanyDivisionClient,
  Trials,
  MFLikeModal,
  QuoteEditor,
})
