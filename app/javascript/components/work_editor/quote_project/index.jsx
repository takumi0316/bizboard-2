import React from 'react'

// Ajax
export default class QuoteProject extends React.Component {

 /**
   *  コンストラクタ
   *
   */

  constructor (props) {

    super(props);

    this.state = {
      project: props.project,
      project_category: props.project_category,
      project_after_process: props.project_after_process,
      project_after_process_folding: props.project_after_process_folding,
      project_after_process_stapler: props.project_after_process_stapler,
      project_after_process_hole: props.project_after_process_hole,
      project_after_process_hole_note: props.project_after_process_hole_note,
      project_after_process_clip: props.project_after_process_clip,
      project_after_process_bind: props.project_after_process_bind,
      project_after_process_bind_note: props.project_after_process_bind_note,
      project_after_process_back_text: props.project_after_process_back_text,
      project_after_process_back_text_note: props.project_after_process_back_text_note,
      project_binding_work: props.project_binding_work,
      project_binding_work_bind_type: props.project_binding_work_bind_type,
      project_binding_work_cross_front: props.project_binding_work_cross_front,
      project_binding_work_cross_back: props.project_binding_work_cross_back,
      project_binding_work_cross_color: props.project_binding_work_cross_color,
      project_binding_work_wrap_front: props.project_binding_work_wrap_front,
      project_binding_work_wrap_back_text: props.project_binding_work_wrap_back_text,
      project_binding_work_stitching_paper: props.project_binding_work_stitching_paper,
      project_binding_work_secret_stitch: props.project_binding_work_secret_stitch,
      project_binding_work_secret_stitch_paper: props.project_binding_work_secret_stitch_paper,
      project_binding_work_radio_stitch: props.project_binding_work_radio_stitch,
      project_binding_work_radio_cut: props.project_binding_work_radio_cut,
      project_binding_work_radio_cut_note: props.project_binding_work_radio_cut_note,
      project_binding_work_note: props.project_binding_work_note,
      project_print: props.project_print === null ? null : props.project_print,
      project_print_draft_data: props.project_print_draft_data,
      project_print_url: props.project_print_url,
      project_print_work_process: props.project_print_work_process,
      project_print_work_type: props.project_print_work_type,
      project_print_work_note: props.project_print_work_note,
      project_print_work_time: props.project_print_work_time,
      project_print_print_work: props.project_print_print_work,
      project_print_color: props.project_print_color,
      project_print_print_size: props.project_print_print_size,
      project_print_print_size_other: props.project_print_print_size_other,
      project_print_surface: props.project_print_surface,
      project_print_open_type: props.project_print_open_type,
      project_card: props.project_card === null ? null : props.project_card,
      project_card_draft_data: props.project_card_draft_data,
      project_card_url: props.project_card_url,
      project_card_type: props.project_card_type,
      project_card_work_type: props.project_card_work_type,
      project_card_work_time: props.project_card_work_time,
      project_card_color: props.project_card_color,
      project_card_paper: props.project_card_paper,
      project_card_surface: props.project_card_surface,
      project_card_emboss: props.project_card_emboss,
      project_copy: props.project_copy === null ? null : props.project_copy,
      project_copy_posting_state: props.project_copy_posting_state,
      project_copy_posting_state_note: props.project_copy_posting_state_note,
      project_copy_draft_split: props.project_copy_draft_split,
      project_copy_draft_restore: props.project_copy_draft_restore,
      project_copy_color: props.project_copy_color,
      project_copy_print_size: props.project_copy_print_size,
      project_copy_print_size_note: props.project_copy_print_size_note,
      project_copy_surface: props.project_copy_surface,
      project_copy_open_type: props.project_copy_open_type,
      project_bind: props.project_bind === null ? null : props.project_bind,
      project_bind_print_size: props.project_bind_print_size,
      project_bind_posting_state: props.project_bind_posting_state,
      project_scan: props.project_scan === null ? null : props.project_scan,
      project_scan_posting_state: props.project_scan_posting_state,
      project_scan_posting_state_note: props.project_scan_posting_state_note,
      project_scan_print_size: props.project_scan_print_size,
      project_scan_draft_split: props.project_scan_draft_split,
      project_scan_draft_restore: props.project_scan_draft_restore,
      project_scan_back_cut: props.project_scan_back_cut,
      project_scan_back_cut_note: props.project_scan_back_cut_note,
      project_scan_color: props.project_scan_color,
      project_scan_resolution: props.project_scan_resolution,
      project_scan_file_extension: props.project_scan_file_extension,
      project_scan_size_mix: props.project_scan_size_mix,
      project_scan_adf: props.project_scan_adf,
      project_scan_odr: props.project_scan_odr,
      project_scan_bookmark: props.project_scan_bookmark,
      project_scan_edit_file_name: props.project_scan_edit_file_name,
      project_other_note: props.project_other_note === null ? null : props.project_other_note,
      show: false,
    }
  }

  _changeShow = () => {

    this.state.show === true ? this.setState({ show: false }) : this.setState({ show:true })
  }

  /**
   * 表示処理
   */
  render() {
    return (
      <div>
        { this.state.show === false ?
          <div className={ 'c-attention u-fw-bold u-mt-10' } onClick={ ::this._changeShow }>
            品目を表示(ここをクリックしてねΣ（・□・；）)
          </div>
          :
          null
        }
        { this.state.project_category === 'プリント' && this.state.show === true ?
          <div className={ 'c-attention u-fw-bold u-mt-10' }>
            <div className={ 'u-ml-10' } onClick={ ::this._changeShow }>品目を閉じる(ここをクリックしてね(//∇//))</div>
            <br />
            <div>
              <span className={ 'u-ml-10 u-mt-10' }>品目名: </span>
              <span className={ 'u-ml-10' }>{ this.state.project.name }</span>
              <span className={ 'u-ml-20' }>案件種別: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_category }</span>
            </div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>概要</span>
              <br />
              <span className={ 'u-ml-10' }>入稿データ: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_print_draft_data === 0 ? 'なし' : 'あり' }</span>
              <span className={ 'u-ml-10 u-mt-10' }>データURL: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_print_url === null ? 'なし' : this.state.project_print_url }</span>
            </div>
            <br />
            <div>
              <span className={'u-ml-10'}>データ仕様</span>
              <br />
              <span className={ 'u-ml-10' }>データ作成作業: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_print_work_process }</span>
              { this.state.project_print_work_process === 'なし' ?
                null
                :
                <React.Fragment>
                  <span className={ 'u-ml-10' }>作業項目: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_print_work_type }</span>
                  <span className={ 'u-ml-10' }>作業内容: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_print_work_note }</span>
                  <span className={ 'u-ml-10' }>作業想定時間: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_print_work_time }時間</span>
                </React.Fragment>
              }
            </div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>プリント仕様</span>
              <br />
              <span className={ 'u-ml-10' }>プリント作業: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_print_print_work }</span>
              { this.state.project_print_print_work === 'なし' ?
                null
                :
                <React.Fragment>
                  <span className={ 'u-ml-10' }>カラー区分</span>
                  <span className={ 'u-ml-10' }>{ this.state.project_print_color }</span>
                  <span className={ 'u-ml-10' }>サイズ: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_print_print_size }</span>
                  { this.state.project_print_print_size === 'その他' ?
                    <React.Fragment>
                      <span className={ 'u-ml-10' }>{ this.state.project_print_print_size_other }</span>
                    </React.Fragment>
                    :
                    null
                  }
                </React.Fragment>
              }
              <span className={ 'u-ml-10' }>面つけ: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_print_surface }</span>
              { this.state.project_print_surface === '両面→片面' ?
                <React.Fragment>
                  <span className={ 'u-ml-10' }>開き (両面の場合)</span>
                  <span className={ 'u-ml-10' }>{ this.state.project_print_open_type }</span>
                </React.Fragment>
                :
                null
              }
            </div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>後加工仕様</span>
              <br />
              <span className={ 'u-ml-10' }>後加工作業: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_after_process }</span>
              { this.state.project_after_process === 'なし' ?
                null
                :
                <React.Fragment>
                  <span className={ 'u-ml-10' }>折り: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_folding }</span>
                  <span className={ 'u-ml-10' }>ホチキス留め: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_stapler }</span>
                  <span className={ 'u-ml-10' }>穴あけ: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_hole }</span>
                  { this.state.project_after_process_hole === 'その他' ?
                    <React.Fragment>
                      <span className={ 'u-ml-10' }>{ this.state.project_after_process_hole_note }</span>
                    </React.Fragment>
                    :
                    null
                  }
                  <br />
                  <span className={ 'u-ml-10' }>クリップ留め: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_clip }</span>
                  <span className={ 'u-ml-10' }>ファイル綴じ: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_bind }</span>
                  { this.state.project_after_process_bind === 'なし' ?
                    null
                    :
                    <React.Fragment>
                      <span className={ 'u-ml-10' }>{ this.state.project_after_process_bind_note }</span>
                    </React.Fragment>
                  }
                  <span className={ 'u-ml-10' }>背文字: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_back_text }</span>
                  { this.state.project_after_process_back_text === 'なし' ?
                    null
                    :
                    <React.Fragment>
                      <span className={ 'u-ml-10' }>{ this.state.project_after_process_back_text_note }</span>
                    </React.Fragment>
                  }
                </React.Fragment>
              }
            </div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>製本仕様</span>
              <br />
              <span className={ 'u-ml-10' }>製本作業: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_binding_work }</span>
              { this.state.project_binding_work === 'あり' ?
                <React.Fragment>
                  <span className={ 'u-ml-10' }>製本方法: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_bind_type }</span>
                </React.Fragment>
                :
                null
              }
              { this.state.project_binding_work_bind_type === 'クロス巻き' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>クロス巻き</span>
                  <br />
                  <span className={ 'u-ml-10' }>表紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_cross_front }</span>
                  <br />
                  <span className={ 'u-ml-10' }>裏紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_cross_back }</span>
                  <br />
                  <span className={ 'u-ml-10' }>クロス色: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_cross_color }</span>
                </React.Fragment>
                :
                null
              }
              { this.state.project_binding_work_bind_type === 'くるみ' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>くるみ</span>
                  <br />
                  <span className={ 'u-ml-10' }>表紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_wrap_front}</span>
                  <br />
                  <span className={ 'u-ml-10' }>背文字: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_wrap_back_text }</span>
                </React.Fragment>
                :
                null
              }
              { this.state.project_binding_work_bind_type === '中綴じ' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>中綴じ</span>
                  <br />
                  <span className={ 'u-ml-10' }>用紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_stitching_paper }</span>
                </React.Fragment>

                :
                null
              }
              { this.state.project_binding_work_bind_type === '袋とじ' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>くるみ</span>
                  <br />
                  <span className={ 'u-ml-10' }>袋とじ: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_secret_stitch }</span>
                  <span className={ 'u-ml-10' }>白紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_secret_stitch_paper }</span>
                </React.Fragment>
                :
                null
              }
              { this.state.project_binding_work_bind_type === '無線綴じ' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>無線綴じ</span>
                  <br />
                  <span className={ 'u-ml-10' }>綴じ: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_radio_stitch }</span>
                  <span className={ 'u-ml-10' }>断裁: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_radio_cut }</span>
                  <span className={ 'u-ml-10' }>カット: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_radio_cut_note }部</span>
                </React.Fragment>
                :
                null
              }
              { this.state.project_binding_work_bind_type === 'その他' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>その他</span>
                  <br />
                  <span className={ 'u-ml-10' }>備考: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_note }</span>
                </React.Fragment>
                :
                null
              }
            </div>
          </div>
         :
          null
        }
        { this.state.project_category === '名刺' && this.state.show === true ?
          <div className={ 'c-attention u-fw-bold u-mt-10' }>
            <div className={ 'u-ml-10' } onClick={ ::this._changeShow }>品目を閉じる(ここをクリックしてね(//∇//)</div>
            <br />
            <div>
              <span className={ 'u-ml-10 u-mt-10' }>品目名: </span>
              <span className={ 'u-ml-10' }>{ this.state.project.name }</span>
              <span className={ 'u-ml-20' }>案件種別: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_category }</span>
            </div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>概要</span>
              <br />
              <span className={ 'u-ml-10' }>入稿データ: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_card_draft_data === 0 ? 'なし' : 'あり' }</span>
              <span className={ 'u-ml-10 u-mt-10' }>データURL: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_card_url === null ? 'なし' : this.state.project_card_url }</span>
              <span className={ 'u-ml-10' }>作業項目: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_card_type }</span>
              { this.state.project_card_type === '提携名刺(作業なし)' ?
                null
                :
                <div>
                  <span className={ 'u-ml-10' }>作業内容: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_card_work_type }</span>
                  <span className={ 'u-ml-10' }>作業時間: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_card_work_time }</span>
                </div>
              }
            </div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>プリント仕様</span>
              <br />
              <span className={ 'u-ml-10' }>カラー区分:</span>
              <span className={ 'u-ml-10' }>{ this.state.project_card_color }</span>
              <span className={ 'u-ml-10' }>用紙:</span>
              <span className={ 'u-ml-10' }>{ this.state.project_card_paper }</span>
              <span className={ 'u-ml-10' }>両面:</span>
              <span className={ 'u-ml-10' }>{ this.state.project_card_surface }</span>
              <span className={ 'u-ml-10' }>エンボンス:</span>
              <span className={ 'u-ml-10' }>{ this.state.project_card_emboss }</span>
            </div>
          </div>
          :
          null
        }
        { this.state.project_category === 'コピー' && this.state.show === true ?
          <div className={ 'c-attention u-fw-bold u-mt-10' }>
            <div className={ 'u-ml-10' } onClick={ ::this._changeShow }>品目を閉じる！！！！！！！！！！！！！！！！！</div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>品目名: </span>
              <span className={ 'u-ml-10' }>{ this.state.project.name }</span>
              <span className={ 'u-ml-10' }>案件種別: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_category }</span>
            </div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>概要</span>
              <br />
              <span className={ 'u-ml-10' }>入稿状態: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_copy_posting_state }</span>
              { this.state.project_scan_posting_state === 'その他' ?
                <React.Fragment>
                  <span className={ 'u-ml-10' }>{ this.state.project_copy_posting_state_note }</span>
                </React.Fragment>
                :
                null
              }
              <span className={ 'u-ml-10' }>入稿バラシ: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_copy_draft_split }</span>
              <span className={ 'u-ml-10' }>入稿もどし: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_copy_draft_restore }</span>
            </div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>複写仕様 </span>
              <br />
              <span className={ 'u-ml-10' }>カラー区分: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_copy_color }</span>
              <span className={ 'u-ml-10' }>サイズ: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_copy_print_size }</span>
              { this.state.project_copy_print_size === 'その他' ?
                <React.Fragment>
                  <span className={ 'u-ml-10' }>{ this.state.project_copt_print_size_other }</span>
                </React.Fragment>
                :
                null
              }
              <span className={ 'u-ml-10' }>面つけ: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_copy_surface }</span>
              { this.state.project_copy_surface === '両面→片面' ?
                <React.Fragment>
                  <span className={ 'u-ml-10' }>開き (両面の場合)</span>
                  <span className={ 'u-ml-10' }>{ this.state.project_copy_open_type }</span>
                </React.Fragment>
                :
                null
              }
            </div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>後加工仕様</span>
              <br />
              <span className={ 'u-ml-10' }>後加工作業: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_after_process }</span>
              { this.state.project_after_process === 'なし' ?
                null
                :
                <React.Fragment>
                  <span className={ 'u-ml-10' }>折り: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_folding }</span>
                  <span className={ 'u-ml-10' }>ホチキス留め: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_stapler }</span>
                  <span className={ 'u-ml-10' }>穴あけ: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_hole }</span>
                  { this.state.project_after_process_hole === 'その他' ?
                    <React.Fragment>
                      <span className={ 'u-ml-10' }>{ this.state.project_after_process_hole_note }</span>
                    </React.Fragment>
                    :
                    null
                  }
                  <br />
                  <span className={ 'u-ml-10' }>クリップ留め: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_clip }</span>
                  <span className={ 'u-ml-10' }>ファイル綴じ: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_bind }</span>
                  { this.state.project_after_process_bind === 'なし' ?
                    null
                    :
                    <React.Fragment>
                      <span className={ 'u-ml-10' }>{ this.state.project_after_process_bind_note }</span>
                    </React.Fragment>
                  }
                  <span className={ 'u-ml-10' }>背文字: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_back_text }</span>
                  { this.state.project_after_process_back_text === 'なし' ?
                    null
                    :
                    <React.Fragment>
                      <span className={ 'u-ml-10' }>{ this.state.project_after_process_back_text_note }</span>
                    </React.Fragment>
                  }
                </React.Fragment>
              }
            </div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>製本仕様</span>
              <br />
              <span className={ 'u-ml-10' }>製本作業: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_binding_work }</span>
              { this.state.project_binding_work === 'あり' ?
                <React.Fragment>
                  <span className={ 'u-ml-10' }>製本方法: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_bind_type }</span>
                </React.Fragment>
                :
                null
              }
              <span className={ 'u-ml-10' }>{ this.state.project_binding_work }</span>
              { this.state.project_binding_work_bind_type === 'クロス巻き' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>クロス巻き</span>
                  <br />
                  <span className={ 'u-ml-10' }>表紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_cross_front }</span>
                  <br />
                  <span className={ 'u-ml-10' }>裏紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_cross_back }</span>
                  <br />
                  <span className={ 'u-ml-10' }>クロス色: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_cross_color }</span>
                </React.Fragment>
                :
                null
              }
              { this.state.project_binding_work_bind_type === 'くるみ' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>くるみ</span>
                  <br />
                  <span className={ 'u-ml-10' }>表紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_wrap_front}</span>
                  <br />
                  <span className={ 'u-ml-10' }>背文字: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_wrap_back_text }</span>
                </React.Fragment>
                :
                null
              }
              { this.state.project_binding_work_bind_type === '中綴じ' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>中綴じ</span>
                  <br />
                  <span className={ 'u-ml-10' }>用紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_stitching_paper }</span>
                </React.Fragment>

                :
                null
              }
              { this.state.project_binding_work_bind_type === '袋とじ' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>くるみ</span>
                  <br />
                  <span className={ 'u-ml-10' }>袋とじ: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_secret_stitch }</span>
                  <span className={ 'u-ml-10' }>白紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_secret_stitch_paper }</span>
                </React.Fragment>
                :
                null
              }
              { this.state.project_binding_work_bind_type === '無線綴じ' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>無線綴じ</span>
                  <br />
                  <span className={ 'u-ml-10' }>綴じ: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_radio_stitch }</span>
                  <span className={ 'u-ml-10' }>断裁: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_radio_cut }</span>
                  <span className={ 'u-ml-10' }>カット: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_radio_cut_note }部</span>
                </React.Fragment>
                :
                null
              }
              { this.state.project_binding_work_bind_type === 'その他' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>その他</span>
                  <br />
                  <span className={ 'u-ml-10' }>備考: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_note }</span>
                </React.Fragment>
                :
                null
              }
            </div>
          </div>
          :
          null
        }
        { this.state.project_category === '製本' && this.state.show === true ?
          <div className={ 'c-attention u-fw-bold u-mt-10' }>
            <div className={ 'u-ml-10' } onClick={ ::this._changeShow }>品目を閉じる(ここをクリックしてね(//∇//)</div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>品目名: </span>
              <span className={ 'u-ml-10' }>{ this.state.project.name }</span>
              <span className={ 'u-ml-10' }>案件種別: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_category }</span>
            </div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>概要</span>
              <br />
              <span className={ 'u-ml-10' }>原稿サイズ: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_bind_print_size }</span>
              <span className={ 'u-ml-10' }>入稿状態: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_bind_posting_state }</span>
            </div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>後加工仕様</span>
              <br />
              <span className={ 'u-ml-10' }>後加工作業: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_after_process }</span>
              { this.state.project_after_process === 'なし' ?
                null
                :
                <React.Fragment>
                  <span className={ 'u-ml-10' }>折り: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_folding }</span>
                  <span className={ 'u-ml-10' }>ホチキス留め: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_stapler }</span>
                  <span className={ 'u-ml-10' }>穴あけ: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_hole }</span>
                  { this.state.project_after_process_hole === 'その他' ?
                    <React.Fragment>
                      <span className={ 'u-ml-10' }>{ this.state.project_after_process_hole_note }</span>
                    </React.Fragment>
                    :
                    null
                  }
                  <br />
                  <span className={ 'u-ml-10' }>クリップ留め: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_clip }</span>
                  <span className={ 'u-ml-10' }>ファイル綴じ: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_bind }</span>
                  { this.state.project_after_process_bind === 'なし' ?
                    null
                    :
                    <React.Fragment>
                      <span className={ 'u-ml-10' }>{ this.state.project_after_process_bind_note }</span>
                    </React.Fragment>
                  }
                  <span className={ 'u-ml-10' }>背文字: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_after_process_back_text }</span>
                  { this.state.project_after_process_back_text === 'なし' ?
                    null
                    :
                    <React.Fragment>
                      <span className={ 'u-ml-10' }>{ this.state.project_after_process_back_text_note }</span>
                    </React.Fragment>
                  }
                </React.Fragment>
              }
            </div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>製本仕様</span>
              <br />
              <span className={ 'u-ml-10' }>製本作業: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_binding_work }</span>
              { this.state.project_binding_work === 'あり' ?
                <React.Fragment>
                  <span className={ 'u-ml-10' }>製本方法: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_bind_type }</span>
                </React.Fragment>
                :
                null
              }
              { this.state.project_binding_work_bind_type === 'クロス巻き' ?
                <React.Fragment>
                  <span className={ 'u-ml-10' }>クロス巻き</span>
                  <br />
                  <span className={ 'u-ml-10' }>表紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_cross_front }</span>
                  <br />
                  <span className={ 'u-ml-10' }>裏紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_cross_back }</span>
                  <br />
                  <span className={ 'u-ml-10' }>クロス色: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_cross_color }</span>
                </React.Fragment>
                :
                null
              }
              { this.state.project_binding_work_bind_type === 'くるみ' ?
                <React.Fragment>
                  <span className={ 'u-ml-10' }>くるみ</span>
                  <br />
                  <span className={ 'u-ml-10' }>表紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_wrap_front}</span>
                  <br />
                  <span className={ 'u-ml-10' }>背文字: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_wrap_back_text }</span>
                </React.Fragment>
                :
                null
              }
              { this.state.project_binding_work_bind_type === '中綴じ' ?
                <React.Fragment>
                  <span className={ 'u-ml-10' }>中綴じ</span>
                  <br />
                  <span className={ 'u-ml-10' }>用紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_stitching_paper }</span>
                </React.Fragment>

                :
                null
              }
              { this.state.project_binding_work_bind_type === '袋とじ' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>くるみ</span>
                  <br />
                  <span className={ 'u-ml-10' }>袋とじ: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_secret_stitch }</span>
                  <span className={ 'u-ml-10' }>白紙: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_secret_stitch_paper }</span>
                </React.Fragment>
                :
                null
              }
              { this.state.project_binding_work_bind_type === '無線綴じ' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>無線綴じ</span>
                  <br />
                  <span className={ 'u-ml-10' }>綴じ: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_radio_stitch }</span>
                  <span className={ 'u-ml-10' }>断裁: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_radio_cut }</span>
                  <span className={ 'u-ml-10' }>カット: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_radio_cut_note }部</span>
                </React.Fragment>
                :
                null
              }
              { this.state.project_binding_work_bind_type === 'その他' ?
                <React.Fragment>
                  <br />
                  <span className={ 'u-ml-10' }>その他</span>
                  <br />
                  <span className={ 'u-ml-10' }>備考: </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_binding_work_note }</span>
                </React.Fragment>
                :
                null
              }
            </div>
          </div>
          :
          null
        }
        { this.state.project_category === 'スキャン' && this.state.show === true ?
          <div className={ 'c-attention u-fw-bold u-mt-10' }>
            <div className={ 'u-ml-10' } onClick={ ::this._changeShow }>品目を閉じる(ここをクリックしてね(//∇//)</div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>品目名: </span>
              <span className={ 'u-ml-10' }>{ this.state.project.name }</span>
              <span className={ 'u-ml-10' }>案件種別: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_category }</span>
              <span className={ 'u-ml-10' }>原稿サイズ: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_scan_print_size }</span>
              <span className={ 'u-ml-10' }>入稿状態: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_scan_posting_state }</span>
              { this.state.project_scan_posting_state === 'その他' ?
                <React.Fragment>
                  <span className={ 'u-ml-10' }>{ this.state.project_scan_posting_state_note }</span>
                </React.Fragment>
                :
                null
              }
              <span className={ 'u-ml-10' }>入稿バラシ: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_scan_draft_split }</span>
              <br />
              <span className={ 'u-ml-10' }>入稿もどし: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_scan_draft_restore }</span>
              <span className={ 'u-ml-10' }>背表紙裁断: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_scan_back_cut }</span>
              { this.state.project_scan_back_cut === '不要' ?
                null
                :
                <React.Fragment>
                  <span className={ 'u-ml-10' }>背表紙裁断(備考): </span>
                  <span className={ 'u-ml-10' }>{ this.state.project_scan_back_cut_note }</span>
                </React.Fragment>
              }
            </div>
            <br />
            <div>
              <span className={ 'u-ml-10' }>複写仕様</span>
              <br />
              <span className={ 'u-ml-10' }>カラー区分: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_scan_color }</span>
              <span className={ 'u-ml-10' }>解像度: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_scan_resolution }</span>
              <span className={ 'u-ml-10' }>ファイル形式: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_scan_file_extension }</span>
              <span className={ 'u-ml-10' }>サイズ混合具合: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_scan_size_mix }</span>
              <span className={ 'u-ml-10' }>ADF使用可否: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_scan_adf }</span>
              <span className={ 'u-ml-10' }>OCR: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_scan_odr }</span>
              <br />
              <span className={ 'u-ml-10' }>しおり作成: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_scan_bookmark }</span>
              <span className={ 'u-ml-10' }>ファイル名編集: </span>
              <span className={ 'u-ml-10' }>{ this.state.project_scan_edit_file_name }</span>
            </div>
          </div>
          :
          null
        }
        { this.state.project_category === 'その他' && this.state.show === true ?
          <div className={ 'c-attention u-fw-bold' }>
            <div className={ 'c-ml-10 c-mt-10' } onClick={ ::this._changeShow }>品目を閉じる(ここをクリックしてね(//∇//)</div>
            <span className={ 'c-ml-10' }>品目名: </span>
            <span className={ 'c-ml-10' }>{ this.state.project.name }</span>
            <div>
              <br />
              <span className={ 'c-ml-10' }>案件種別: </span>
              <span className={ 'c-ml-10' }>{ this.state.project_category }</span>
              <span className={ 'c-ml-10' }>備考: </span>
              <span className={ 'c-ml-10' }>{ this.state.project_other_note }</span>
            </div>
          </div>
          :
          null
        }
      </div>
    );
  }
}
