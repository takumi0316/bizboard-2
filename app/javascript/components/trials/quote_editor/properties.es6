/* --------------------- quote_editor/index.jsx --------------------- */
export const QUOTE = {
  id: '',
  google_drive_folder_id: ''
}
/* --------------------- quote_editor/index.jsx --------------------- */

/* --------------------- quote_editor/modal/config.jsx --------------------- */
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

/* --------------------- quote_editor/modal/config.jsx --------------------- */
