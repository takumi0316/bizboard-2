export const QUOTE = {
  id: '',
  delivery_type: '',
  google_drive_folder_id: '',
  profit_price: '',
  quote_projects: [],
}

const uid = new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16)

export const QUOTE_PROJECT = {
  'id': '',
  'uid': uid,
  'project_id': '',
  'quote_id': '',
  'name': '',
  'unit_price': '',
  'unit': '',
  'price': '',
  'project_name': '',
  'remarks': ''
}

export const DELIVER_TYPES = [
  { key: 'seat', value: '席まで配達' },
  { key: 'location', value: '指定場所に配達' },
  { key: 'pickup', value: '引き取り' },
  { key: 'bizstant', value: 'ビジスタント' },
  { key: 'other', value: 'その他' },
]

export const CHANNELS = [
  { key: 'estimate', value: '営業' },
  { key: 'bpr_erp', value: 'BPR/ERP' },
  { key: 'reception', value: '受付' },
  { key: 'channel_other', value: 'その他' },
]

export const RECEPTIONS = [
  { key: 'acceptance', value: '受付' },
  { key: 'mail', value: 'メール' },
  { key: 'delivery', value: '集配' },
  { key: 'reservation', value: '予約' },
  { key: 'bizstant', value: 'ビジスタント' },
  { key: 'reception_other', value: 'その他' },
]

export const QUOTE_TYPES = [
  { key: 'contract', value: '請負' },
  { key: 'copy', value: '分散機' },
]

export const TAX_TYPES = [
  { key: 'taxation', value: '課税対象' },
  { key: 'exemption', value: '非課税対象' },
]

export const PAYMENT_TERMS = [
  { key: 'postpaid', value: '後払い' },
  { key: 'advance', value: '先払い' },
]

export const GOOGLE_DRIVE = [
  { key: false, value: '作成しない' },
  { key: true, value: '作成する' },
]

// 小数のみチェック
// export const PATTERN = /\d+\.?\d*|\.\d+/

// 符号あり小数 (- のみ許容)
// export const PATTERN = /^[-]?([1-9]\d*|0)(\.\d+)?$/g

export const PATTERN = /[^-|0-9.]/g

export const LOCATION = 'location'

export const OTHER = 'other'

export const BPR_ERP = 'bpr_erp'

export const PREFECTURES = [
  { id: 1,  name: '北海道' },
  { id: 2,  name: '青森県' },
  { id: 3,  name: '岩手県' },
  { id: 4,  name: '宮城県' },
  { id: 5,  name: '秋田県' },
  { id: 6,  name: '山形県' },
  { id: 7,  name: '福島県' },
  { id: 8,  name: '茨城県' },
  { id: 9,  name: '栃木県' },
  { id: 10, name: '群馬県' },
  { id: 11, name: '埼玉県' },
  { id: 12, name: '千葉県' },
  { id: 13, name: '東京都' },
  { id: 14, name: '神奈川県' },
  { id: 15, name: '新潟県' },
  { id: 16, name: '富山県' },
  { id: 17, name: '石川県' },
  { id: 18, name: '福井県' },
  { id: 19, name: '山梨県' },
  { id: 20, name: '長野県' },
  { id: 21, name: '岐阜県' },
  { id: 22, name: '静岡県' },
  { id: 23, name: '愛知県' },
  { id: 24, name: '三重県' },
  { id: 25, name: '滋賀県' },
  { id: 26, name: '京都府' },
  { id: 27, name: '大阪府' },
  { id: 28, name: '兵庫県' },
  { id: 29, name: '奈良県' },
  { id: 30, name: '和歌山県' },
  { id: 31, name: '鳥取県' },
  { id: 32, name: '島根県' },
  { id: 33, name: '岡山県' },
  { id: 34, name: '広島県' },
  { id: 35, name: '山口県' },
  { id: 36, name: '徳島県' },
  { id: 37, name: '香川県' },
  { id: 38, name: '愛媛県' },
  { id: 39, name: '高知県' },
  { id: 40, name: '福岡県' },
  { id: 41, name: '佐賀県' },
  { id: 42, name: '長崎県' },
  { id: 43, name: '熊本県' },
  { id: 44, name: '大分県' },
  { id: 45, name: '宮崎県' },
  { id: 46, name: '鹿児島県' },
  { id: 47, name: '沖縄県' },
]

export const DESTINATIONS = [
  { key: 'company_name', value: '会社名' },
  { key: 'client_name', value: '担当者名' },
]