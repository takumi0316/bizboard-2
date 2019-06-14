// ------------------------------------
// 共通
// ------------------------------------

export const PROJECT_NAMES = {
  project_bind: '製本のみ',
  project_copy: 'コピー',
  project_card: '名刺',
  project_scan: 'スキャン',
  project_print: 'プリント',
  project_other: 'その他',
};

// ------------------------------------
// コピー仕様
// ------------------------------------

export const POSTING_STATES = {
  'ホチキス': 'stapler',
  'ゼム': 'zem',
  'Wクリ': 'wclip',
  '輪ゴム': 'band',
  'バラ': 'bara',
  '製本': 'bind',
  'ファイル': 'file',
  'その他': 'other_state',
};

export const DRAFT_SPLITS = {
  '可能': 'split_available',
  '不可': 'split_unavailable',
};

export const DRAFT_RESTORES = {
  '必要': 'restore_necessary',
  '不要': 'restore_unnecessary',
};

// ------------------------------------
// プリント仕様
// ------------------------------------

export const DRAFT_DATAS = {
  'あり': 'data_available',
  'なし': 'data_unavailable',
};

export const WORK_PROCESSES = {
  'なし': 'work_process_unnecessary',
  'あり': 'work_process_necessary',
};

export const WORK_TYPES = {
  'データ新規作成': 'create_data',
  'データ修正': 'edit_data',
};

export const PRINT_WORKS = {
  'なし': 'print_work_unnecessary',
  'あり': 'print_work_necessary',
};

// ------------------------------------
// プリント・コピー仕様
// ------------------------------------

export const COLORS = {
  '原稿通り': 'original_print',
  'カラー': 'color_print',
  'モノクロ': 'monochrome_print',
};

export const PRINT_SIZES = {
  '原稿通り': 'original_size',
  'A3': 'a3',
  'A4': 'a4',
  'その他': 'print_size_other',
};

export const SURFACES = {
  '原稿通り': 'original_surface',
  '片面→両面': 'one_side',
  '両面→片面': 'both_side',
};

export const OPEN_TYPES = {
  '横開き': 'side_open',
  '上開き': 'upper_open',
};

// ------------------------------------
// 製本仕様
// ------------------------------------

export const BIND_SIZES = {
  '名刺': 'card_size',
  'A4': 'a4',
  'A3': 'a3',
  'A2': 'a2',
  'A1': 'a1',
  'A0': 'a0',
};

// ------------------------------------
// スキャン仕様
// ------------------------------------

export const SCAN_SIZES = {
  '名刺': 'card_size',
  'A4': 'a4',
  'A3': 'a3',
  'A2': 'a2',
  'A1': 'a1',
  'A0': 'a0',
};

export const BACK_CUTS = {
  '不要': 'back_cut_unnecessary',
  '必要': 'back_cut_necessary',
};

export const SCAN_COLORS = {
  'モノクロ': 'monochrome_print',
  'グレースケール': 'gray_scale',
  'カラー':   'color_print',
};

export const RESOLUTIONS = {
  '200dpi': 'dpi_200',
  '300dpi': 'dpi_300',
  '400dpi': 'dpi_400',
};

export const EXTENSIONS = {
  'jpg': 'jpg',
  'pdf': 'pdf',
  'png': 'png',
};

export const SIZE_MIXES = {
  '全て同じサイズ': 'all_same',
  '他のサイズが1%未満': 'other_1',
  '他のサイズが10%未満': 'other_10',
  'その他': 'other',
};

export const ADFS = {
  '可能': 'adf_available',
  '不可': 'adf_unavailable',
};

export const ODRS = {
  'あり': 'odr_available',
  'なし': 'odr_unavailable',
};

export const BOOKMARKS = {
  'あり': 'bookmark_necessary',
  'なし': 'bookmark_unnecessary',
};

export const EDIT_FILENAMES = {
  'あり': 'edit_filename_necessary',
  'なし': 'edit_filename_unnecessary',
};

// ------------------------------------
// 名刺仕様
// ------------------------------------

export const CARD_TYPES = {
  '定型名刺(作業なし)': 'template',
  '特別名刺(作業あり)': 'special',
};

export const CARD_WORK_TYPES = {
  'デザイン作成': 'create_design',
  'デザイン修正': 'edit_design',
  'データ作成': 'create_data',
  'データ修正': 'edit_data',
};

export const PAPERS = {
  '413CoC': 'coc_413',
  '薄口ノーブル': 'noble',
  '再生ホワイト（55R)': 'r_55',
  'ホワイトプリンス': 'white_prince',
  'ヴァンヌーボー': 'nouveau',
  'スノーホワイト': 'snow',
  'トップ130': 'top130',
  'プリンス': 'prince',
  '五条クリーム': 'cream',
  'colorcopy200g/m2': 'colorcopy200g',
  'colorcopy250g/m2': 'colorcopy250g',
  'エリート': 'elite',
  'プリンスCoC': 'prince_coc',
  'LTG': 'ltg',
};

export const CARD_SURFACES = {
  '両面': 'both_side',
  '片面': 'one_side',
};

export const EMBOSSES = {
  'あり': 'emboss_necessary',
  'なし': 'emboss_unnecessary',
};

// ------------------------------------
// 後工程
// ------------------------------------

export const AFTER_PROCESSES = {
  'なし': 'after_process_unnecessary',
  'あり': 'after_process_necessary',
};

export const FOLDINGS = {
  '原稿通り': 'original_folding',
  'Z折り': 'z_folding',
  'ベタ折り': 'beta_folding',
  '三つ折り': 'three_folding',
  'ファイル折り': 'file_folding',
  'なし': 'no_folding',
};

export const STAPLERS = {
  '原稿通り': 'original_stapler',
  '左上': 'upper_left_stapler',
  '右上': 'upper_right_stapler',
  '左２箇所': 'left_double_stapler',
  '右２箇所': 'right_double_stapler',
  'なし': 'no_stapler',
};

export const HOLES = {
  'なし': 'hole_unnecessary',
  '原稿通り': 'original_hole',
  'あり': 'hole_necessary',
  'その他': 'hole_other',
};

export const CLIPS = {
  'なし': 'clip_unnecessary',
  'あり': 'clip_necessary',
};

export const BINDS = {
  'なし': 'file_unnecessary',
  'キングファイル': 'king_file',
  'フラットファイル': 'flat_file',
  'その他': 'other_file',
};

export const BACK_TEXTS = {
  'なし': 'back_text_unnecessary',
  'あり': 'back_text_necessary',
};


// ------------------------------------
// 製本仕様
// ------------------------------------

export const BINDING_WORKS = {
  'なし': 'binding_works_unnecessary',
  'あり': 'binding_works_necessary',
};

export const BIND_TYPES = {
  '原稿通り': 'original_bind_type',
  'クロス巻き': 'cross_bind_type',
  'くるみ': 'wrap_bind_type',
  '中綴じ': 'stitching_bind_type',
  '袋とじ': 'secret_bind_type',
  '無線綴じ': 'radio_bind_type',
  '観音': 'double_door_bind_type',
  '金文字': 'gold_letter_bind_type',
  'なし': 'no_bind_type',
  'その他': 'other_bind_type',
};

export const CROSS_COLORS = {
  '黒': 'black_cross',
  '白': 'white_cross',
};

export const WRAP_BACK_TEXTS = {
  'あり': 'wrap_back_text_necessary',
  'なし': 'wrap_back_text_unnecessary',
};

export const SECRET_STITCHS = {
  '通常': 'normal_secret_stitch',
  '上三角': 'triangle_secret_stitch',
};

export const SECRET_STITCH_PAPERS = {
  'あり': 'stitch_paper_necessary',
  'なし': 'stitch_paper_unnecessary',
};

export const RADIO_STITCHS = {
  'あり': 'radio_stitch_necessary',
  'なし': 'radio_stitch_unnecessary',
};

export const RADIO_CUTS = {
  'あり': 'radio_cut_necessary',
  'なし': 'radio_cut_unnecessary',
};

