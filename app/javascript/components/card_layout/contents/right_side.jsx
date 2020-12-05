import React, { Fragment, useRef, useState } from 'react';
import Style from './style.sass';

// ライブラリ
import SearchFlag       from './search_flag';
import SearchImg        from './search_img.jsx';
import { generateKey } from '../util';

// import プロパティ
import {
  FontColors,
  FontFamilies, FontWeights,
} from './properties';

const RightSide = props => {

  const init = {
    content_type: props.layout_content.content_type,
    is_reduction_rated: props.layout_content.is_reduction_rated === 'true',
    content_flag_name: props.layout_content.content_flag_name,
    content_flag_id: props.layout_content.content_flag_id,
    uploads: props.layout_content.uploads,
  };

  const [state, setState] = useState(init);

  const name_ref = useRef(null);
  const font_family_ref = useRef(null);
  const font_size_ref = useRef(null);
  const font_color_ref = useRef(null);
  const font_weight_ref = useRef(null);
  const x_coordinate_ref = useRef(null);
  const y_coordinate_ref = useRef(null);
  const reduction_rate_ref = useRef(null);
  const is_reduction_rated_ref = useRef(null);
  const length_ref = useRef(null);
  const logo_width_ref = useRef(null);
  const logo_height_ref = useRef(null);
  const letter_spacing_ref = useRef(null);

  // 論理的に画像を削除
  const destroyUpload = e => {

    e.preventDefault();

    const parse_uploads = [];

    JSON.parse(JSON.stringify(state.uploads)).map((upload, index) => {

      // rails nested_attributesで使用
      if(e.target.dataset.number == index) parse_uploads.push({ ...upload,  _destroy: '1' });
      if(e.target.dataset.number != index) parse_uploads.push(upload);
    });

    setState({ ...state, uploads: parse_uploads });
  };

  // フラグ検索反映
  const applyFlag = flag => setState({ ...state, content_flag_name: flag.name, content_flag_id: flag.id, content_type: flag.content_type });

  // 画像検索反映
  const applyUpload = upload => {

    const parse_uploads = JSON.parse(JSON.stringify(state.uploads));
    parse_uploads.push(upload);
    setState({ ...state, uploads: parse_uploads });
  };

  // 右サイドバー閉じる
  const closeRightSide = e => {

    e.preventDefault();

    // フラグ選択有無
    if(!state.content_flag_id) {

      window.alertable({ icon: 'info', message: 'フラグを登録してください。' });
      return;
    };

    // コンテンツタイトル入力有無
    if(state.content_type != 'image' && !name_ref.current.value) {

      window.alertable({ icon: 'info', message: 'コンテンツタイトルを入力してください。' });
      return
    };

    // 画像選択有無
    if(state.content_type == 'image' && state.uploads.length === 0) {

      window.alertable({ icon: 'info', message: '画像を登録してください。' });
      return;
    };

    // ラスイチの時に削除された時の処理
    if(state.uploads.every(upload => upload._destroy) && state.uploads.length === 1) {

      window.alertable({ icon: 'info', message: '画像を登録してください。' });
      return;
    };

    let content = {
      id: props.layout_content.id,
      x_coordinate: x_coordinate_ref.current.value,
      y_coordinate: y_coordinate_ref.current.value,
      content_flag_name: state.content_flag_name,
      content_flag_id: state.content_flag_id,
      content_type: state.content_type,
      uploads: state.uploads,
    };

    if(state.content_type != 'image') {

      content = { ...content,
        name: name_ref.current.value,
        font_family: font_family_ref.current.value,
        font_size: font_size_ref.current.value,
        font_color:font_color_ref.current.value,
        font_weight:font_weight_ref.current.value,
        letter_spacing: letter_spacing_ref.current.value,
        is_reduction_rated: is_reduction_rated_ref.current.value,
        layout_length: length_ref.current.value,
      };
      if(state.is_reduction_rated) content = { ...content, reduction_rate: reduction_rate_ref.current.value === undefined ? 0 : reduction_rate_ref.current.value };
    };

    if(state.content_type == 'image') {

      content = { ...content,
        logo_height: logo_height_ref.current.value,
        logo_width: logo_width_ref.current.value,
      };
    };

    props.saveContent(content);
  };

  return(
    <div className={ Style.RightSide }>
      <div className='u-mt-30 c-table'>
        <table>
          <thead>
            <tr>
              <th width='35%'>設定</th>
              <th>値</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td className='u-ta-center'><label className='c-form-label'>フラグ</label></td>
              <td><SearchFlag applyFlag={ applyFlag } flag_name={ state.content_flag_name }/></td>
            </tr>

            { state.content_type != 'image' ?
              <Fragment>
                <tr>
                  <td className='u-ta-center'><label className='c-form-label'>コンテンツタイトル</label></td>
                  <td><input className='c-form-text' ref={ name_ref } defaultValue={ props.layout_content.name }/></td>
                </tr>

                <tr>
                  <td className='u-ta-center'><label className='c-form-label'>フォントファミリー</label></td>
                  <td className='c-form-selectWrap'>
                    <select name='font_family' className='c-form-select' ref={ font_family_ref }
                      defaultValue={ props.layout_content.font_family }>
                      { Object.keys(FontFamilies).map((font_family, index) => {

                        const key = `layout_type-${ index }-${ font_family }`;
                        return (
                          <option { ...{ key } } value={ FontFamilies[font_family] }>{ font_family }</option>
                        );
                      }) }
                    </select>
                  </td>
                </tr>

                <tr>
                <td className='u-ta-center'><label className='c-form-label'>フォントサイズ</label></td>
                <td><input className='c-form-text' ref={ font_size_ref } defaultValue={ props.layout_content.font_size }/></td>
                </tr>

                <tr>
                  <td className='u-ta-center'><label className='c-form-label'>フォントカラー</label></td>
                  <td className='c-form-selectWrap'>
                    <select name='font_color' className='c-form-select' ref={ font_color_ref } defaultValue={ props.layout_content.font_color }>
                    { Object.keys(FontColors).map((font_color, index) => {

                      const key = `layout_type-${ index }-${ font_color }`;
                      return (
                        <option { ...{ key } } value={ FontColors[font_color] }>{ font_color }</option>
                      );
                    }) }
                    </select>
                  </td>
                </tr>

                <tr>
                  <td className='u-ta-center'><label className='c-form-label'>フォントウェイト</label></td>
                  <td className='c-form-selectWrap'>
                    <select name='font_color' className='c-form-select' ref={ font_weight_ref } defaultValue={ props.layout_content.font_weight }>
                      { Object.keys(FontWeights).map((font_weight, index) => {

                        const key = `font-weight-${ index }-${ font_weight }`;
                        return (
                          <option { ...{ key } } value={ font_weight }>{ font_weight }</option>
                        );
                      }) }
                    </select>
                  </td>
                </tr>

              </Fragment>
              : null
            }

            <tr>
              <td className='u-ta-center'><label className='c-form-label'>座標(X)</label></td>
              <td><input className='c-form-text' ref={ x_coordinate_ref } defaultValue={ props.layout_content.x_coordinate }/></td>
            </tr>

            <tr>
              <td className='u-ta-center'><label className='c-form-label'>座標(Y)</label></td>
              <td><input className='c-form-text' ref={ y_coordinate_ref } defaultValue={ props.layout_content.y_coordinate }/></td>
            </tr>

            { state.content_type != 'image' ?
              <tr>
                <td className='u-ta-center'><label className='c-form-label'>長さ</label></td>
                <td><input className='c-form-text' ref={ length_ref } defaultValue={ props.layout_content.layout_length } /></td>
              </tr>
              :
              <Fragment>
                <tr>
                  <td className='u-ta-center'><label className='c-form-label'>長さ(縦)</label></td>
                  <td><input className='c-form-text' ref={ logo_height_ref } defaultValue={ props.layout_content.logo_height }/></td>
                </tr>
                <tr>
                  <td className='u-ta-center'><label className='c-form-label'>長さ(横)</label></td>
                  <td><input className='c-form-text' ref={ logo_width_ref } defaultValue={ props.layout_content.logo_width }/></td>
                </tr>
              </Fragment>
            }

            { state.content_type != 'image' ?
              <Fragment>
                <tr>
                  <td className='u-ta-center'><label className='c-form-label'>文字間</label></td>
                  <td><input className='c-form-text' ref={ letter_spacing_ref }
                    defaultValue={ props.layout_content.letter_spacing }/></td>
                </tr>

                <tr>
                  <td className='u-ta-center'><label className='c-form-label'>縮小対応</label></td>
                  <td>
                    <label className='c-form-toggle'>
                      <input name='content_is_reduction_rate' type='hidden' defaultValue='false'/>
                      <input name='content_is_reduction_rate' type='checkbox' ref={ is_reduction_rated_ref }
                            defaultChecked={ state.is_reduction_rated }
                            defaultValue={ state.is_reduction_rated } onClick={ () => setState({
                            ...state, is_reduction_rated: !state.is_reduction_rated }) }
                      />
                      <span data-on='縮小対応' data-off='縮小非対応'/>
                    </label>
                  </td>
                </tr>

                { state.is_reduction_rated ?
                  <tr>
                    <td className='u-ta-center'><label className='c-form-label'>最大縮小率(%)</label></td>
                    <td><input className='c-form-text' ref={ reduction_rate_ref }
                      defaultValue={ props.layout_content.reduction_rate }/></td>
                  </tr>
                  : null
                }
              </Fragment>
              : null
            }

            { state.content_type == 'image' ?
              <tr>
                <td className='u-ta-center'>画像</td>
                <td><SearchImg applyUpload={ applyUpload }/></td>
              </tr>
              : null
            }

          </tbody>
        </table>
      </div>

      { state.content_type == 'image' ?
        <div className='u-mt-20 c-table'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>画像</th>
              </tr>
            </thead>
            <tbody>
              { state.uploads.map((upload, index) => {

                const key = generateKey(`upload-${ index }`);
                return(
                  <Fragment { ...{key} }>
                    { !upload._destroy ?
                      <tr>
                        <td className='u-ta-center u-va-middle'>{ index + 1 }</td>
                        <td className='c-flex__center'>
                          <div className={ `${ Style.Upload__image }` }>
                            <img src={ upload.url }/>
                            <button className={ Style.Upload__button } data-number={ index } onClick={ destroyUpload }>削除</button>
                            <h2 className={ Style.Upload__title }>{ upload.name }</h2>
                          </div>
                        </td>
                      </tr>
                      : null
                    }
                  </Fragment>
                );
              }) }
            </tbody>
          </table>
        </div>
        : null
      }
      <div className='u-mt-30 c-flex__center'>
        <button className='c-btnMain c-btn-blue' onClick={ closeRightSide }>保存する</button>
      </div>
    </div>
  );
};

export default RightSide;
