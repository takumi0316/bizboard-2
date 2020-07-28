// ライブラリをインポート
const UAParser = require('ua-parser-js');

/**
 * String => Bool
 * @version 2020/04/30
 *
 */
export const toBoolean = data => data.toLowerCase() === 'true';

/**
 * generate unique key
 * @version 2020/04/04
 *
 **/
export const generateKey = pre => `${ pre }_${ new Date().getTime() }`;

/**
 * valid property
 * @version 2020/04/04
 *
 */
export const validProperty = (value, property) => {

  if(value) return true;
  window.alertable({ icon: 'error', message: `${property}を入力してください。`});
};

/**
 * エラーアラート
 * @version 2020/05/28
 * @param err
 *
 */
export const missTransition = err => {

  console.log(err);
  window.alertable({ icon: 'error', message: 'ページ遷移に失敗しました。' });
};

/**
 * ptをmmに変換
 * @version 2020/05/07
 *
 **/
export const ptTomm = pt => pt * 0.3527777778;

/**
 * OS毎にpx変換を変更
 * @version 2020/05/07
 *
 **/
export const mmTopx = mm => {

  // ブラウザ取得
  const parser = new UAParser();
  const os = parser.getOS().name;

  if(os === 'Windows') return 72 / 25.4 * mm;
  if(os === 'Mac OS') return 72 / 25.4 * mm;
};

/**
 * PDFを展開する
 * @version 2020/03/30
 *
 * サイズ: pt
 * 座標: mm
 * 長さ: mm
 * 行間: mm*
 */
export const setPDF = (file, details, canvas, draw) => {

  const blob = new Blob([file]);
  const blob_path = (window.URL || window.webkitURL).createObjectURL(blob);
  const getPDF = pdfjsLib.getDocument(blob_path);

  getPDF.promise.then(pdf => {
    return pdf.getPage(1);
  }).then(page => {

    // Set scale (zoom) level
    let scale = 2;

    // Get viewport (dimensions)
    let viewport = page.getViewport({ scale: scale, rotate: 1 });

    // Fetch canvas' 2d context
    let ctx = canvas.getContext('2d');

    // Set dimensions to Canvas
    canvas.height = Math.floor(mmTopx(55 * 2));
    canvas.width = Math.floor(mmTopx(91 * 2));

    draw.style = `height: ${ Math.floor(mmTopx(55 * 2)) }px; width: ${ Math.floor(mmTopx(91 * 2)) }px;}}`;

    details.map((detail, index) => {

      const name = detail.name;

      if(!name) return;

      const y = Math.floor(mmTopx(detail.coord_y)) * 2;
      const x = Math.floor(mmTopx(detail.coord_x)) * 2;
      const fontSize = Math.floor(mmTopx(ptTomm(detail.font_size))) * 2;
      const lineSpace = Math.floor(mmTopx(detail.line_space));
      const contentLength = Math.floor(mmTopx(detail.length));

      // absoluteするための親div
      let parent_div = document.createElement('div');
      parent_div.id = `parent_div-${ index }`;

      // 以下、子ども
      let child_p = document.createElement('p');
      child_p.id = `child_p-${ index }`;
      let child_div = document.createElement('div');
      child_div.id = `child_div-${ index }`;

      parent_div.style = `position: relative; transform: translate(${ x }px, ${ y }px);`;
      draw.appendChild(parent_div);

      child_p.textContent = name || '';
      // transform: translate(x, y)
      // ヘッダー表示のためword-wrapはなし
      child_p.style = `font-size: ${ fontSize }px; font-family: ${ detail.font }; letter-spacing: ${ lineSpace }px; position: absolute;`;
      parent_div.appendChild(child_p);

      // 先に描画をしないと高さを取得出来ないため
      child_div.style = `width: ${ contentLength }px; height: ${ child_p.clientHeight }px; border: 1px solid; position: absolute;`;
      parent_div.appendChild(child_div);
    });

    // Prepare object needed by render method
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    // Render PDF page
    page.render(renderContext);
  }).catch(error => window.alertable({ icon: 'error', message: error }));
};

/**
 * PDFを展開する
 * @version 2020/03/30
 *
 * サイズ: pt
 * 座標: mm
 * 長さ: px
 * 行間: px
 */
export const setPDFValue = (file, canvas, draw, values) => {

  const blob = new Blob([file]);
  const blob_path = (window.URL || window.webkitURL).createObjectURL(blob);
  const getPDF = pdfjsLib.getDocument(blob_path);

  getPDF.promise.then(function(pdf) {
    return pdf.getPage(1);
  }).then(function(page) {

    let scale = 2;

    let viewport = page.getViewport({ scale: scale });

    let ctx = canvas.getContext('2d');

    canvas.height = Math.floor(mmTopx(55 * 2));
    canvas.width = Math.floor(mmTopx(91 * 2));
    draw.style = `height: ${ Math.floor(mmTopx(55 * 2)) }px; width: ${ Math.floor(mmTopx(91 * 2)) }px;`;

    values.map((value, index) => {

      const card_value = value.value.split(/\n/);
      const y = Math.floor(mmTopx(value.coord_y) * 2);
      const x = Math.floor(mmTopx(value.coord_x) * 2);
      const fontSize = Math.floor(mmTopx(ptTomm(value.font_size))) * 2;
      const lineSpace = Math.floor(mmTopx(value.line_space));
      const font = value.font;
      const contentLength = Math.floor(mmTopx(value.length));

      // 既にhtmlが描画されているか確認。
      const is_child_present = draw.childElementCount === values.length;

      // absoluteするための親div
      let parent_div, child_p, child_div;

      // 改行するときのheight
      let text_height = 0;

      // CSVアップロード時
      if(is_child_present) {

        ctx.font =  `font-size: ${ fontSize }px; font-family: ${ font }; letter-spacing: ${ lineSpace }px;`;

        parent_div = document.getElementById(`parent_div-${ index }`);
        parent_div.style = `position: relative; transform: translate(${ x }px, ${ y }px);`;

        child_p = document.getElementById(`child_p-${ index }`);
        child_div = document.getElementById(`child_div-${ index }`);

        child_p.textContent = card_value || '';

        // 入力値がなければ、ボーダーを0にする。
        if(card_value) {

          // widthを指定すると折り返さえれるので、あえてwidthは指定しない
          // border: 1px solid分を0.95でかける
          // プラスだった分を割って、かける
          child_p.style = `font-size: ${ fontSize }px; display: inline-block;  transform: scaleX(${ (contentLength / ctx.measureText(card_value).width) * 0.95 }); transform-origin: left center; font-family: ${ value.font }; letter-spacing: ${ lineSpace }px; position: absolute;`;

          // 先に描画をしないと高さを取得出来ないため
          // バリュー値があればプロパティ指定
          child_div.style = `width: ${ contentLength }px; height: ${ child_p.clientHeight }px; border: 1px solid; position: absolute;`;
        } else {

          //  word-wrap: break-word;
          child_p.style = `width: 0px; font-size: 0px; font-family: ${ font }; letter-spacing: 0px; position: absolute;`;
          child_div.style = 'width: 0px; border: 0px solid; position: absolute;';
        };
      } else {

        text_height = 0;
        ctx.font =  `font-size: ${ fontSize }px; font-family: ${ font }; letter-spacing: ${ lineSpace }px;`;
        parent_div = document.createElement('div');
        parent_div.id = `parent_div-${ index }`;

        child_div = document.createElement('div');
        child_div.id = `child_div-${ index }`;

        parent_div.style = `position: relative; transform: translate(${ x }px, ${ y }px);`;
        draw.appendChild(parent_div);

        if(value.item_type === 'text') {

          // 以下、子ども
          child_p = document.createElement('p');
          child_p.id = `child_p-${ index }`;
          parent_div.appendChild(child_p);

          child_p.textContent = card_value[0] || '';
          if(card_value[0]) child_p.style = `font-size: ${ fontSize }px; display: inline-block;  transform: scaleX(${ (contentLength / ctx.measureText(card_value).width) * 0.95 }); transform-origin: left center; font-family: ${ value.font }; letter-spacing: ${ lineSpace }px; position: absolute;`;
          text_height = child_p.clientHeight;
        } else {

          card_value.map((value, index2) => {

            child_p = document.createElement('p');
            child_p.id = `child_p-${ index }-${ index2 }`;

            child_p.style = `font-size: ${ fontSize }px; display: inline-block;  transform: scaleX(${ (contentLength / ctx.measureText(value).width) * 0.95 }) scaleY(${ (contentLength / ctx.measureText(value).width) * 0.95 }); transform-origin: left center; font-family: ${ value.font }; letter-spacing: ${ lineSpace }px; position: absolute;`;
            parent_div.appendChild(child_p);
            child_p.textContent = value;
            child_p.style = `font-size: ${ fontSize }px; display: inline-block;  transform: scaleX(${ (contentLength / ctx.measureText(value).width) * 0.95 }) scaleY(${ (contentLength / ctx.measureText(value).width) * 0.95 }); transform-origin: left center; font-family: ${ value.font }; letter-spacing: ${ lineSpace }px; position: absolute; top: ${ text_height }px; left: 0px;`;
            text_height += child_p.clientHeight;
          });

        };

        // canvasに設定した内容をrestore()
        ctx.restore();

        // 先に描画をしないと高さを取得出来ないため
        if(card_value[0]) child_div.style = `width: ${ contentLength }px; height: ${ text_height }px; border: 1px solid; position: absolute;`;
        // バリュー値があればプロパティ指定
        parent_div.appendChild(child_div);
      };
    });

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    page.render(renderContext);
  }).catch(error => window.alertable({ 'icon': 'error', message: error }));
};

/**
 * PDFにテキストを展開
 * @version 2020/04/06
 *
 * サイズ: pt
 * 座標: mm
 * 長さ: px
 * 行間: px
 */
export const drawText = (detail, draw, index) => {

  const childElement = draw.childElementCount;
  const name = detail.name;
  const y = Math.floor(mmTopx(detail.coord_y)) * 2;
  const x = Math.floor(mmTopx(detail.coord_x)) * 2;
  const fontSize = Math.floor(mmTopx(ptTomm(detail.font_size))) * 2;
  const lineSpace = Math.floor(mmTopx(detail.line_space));
  const contentLength = Math.floor(mmTopx(detail.length));
  const font = detail.font;

  let parent_div, child_div, child_p;
  // 既に作成済みどうか
  if(index < childElement) {

    parent_div = document.getElementById(`parent_div-${ index }`);
    parent_div.style = `position: relative; transform: translate(${ x }px, ${ y }px);`;

    child_p = document.getElementById(`child_p-${ index }`);
    child_p.textContent = name || '';
    child_p.style = `font-size: ${ fontSize }px; font-family: ${ font }; letter-spacing: ${ lineSpace }px; position: absolute;`;

    child_div = document.getElementById(`child_div-${ index }`);
    child_div.style = `width: ${ contentLength }px; height: ${ child_p.clientHeight }px; border: 1px solid; position: absolute;`;
  } else {

    // absoluteするための親div
    parent_div = document.createElement('div');
    parent_div.id = `parent_div-${ index }`;
    // 以下、子ども
    child_p = document.createElement('p');
    child_p.id = `child_p-${ index }`;
    child_div = document.createElement('div');
    child_div.id = `child_div-${ index }`;

    parent_div.style = `position: relative; transform: translate(${ x }px, ${ y }px);`;
    draw.appendChild(parent_div);

    child_p.textContent = name;
    // transform: translate(x, y)
    // ヘッダー表示のためword-wrapはなし
    child_p.style = `font-size: ${ fontSize }px; font-family: ${ font }; letter-spacing: ${ lineSpace }px; position: absolute;`;
    parent_div.appendChild(child_p);

    // 先に描画をしないと高さを取得出来ないため
    child_div.style = `width: ${ contentLength }px; height: ${ child_p.clientHeight }px; border: 1px solid; position: absolute;`;
    parent_div.appendChild(child_div);
  };
};

/**
 * PDFにテキストを展開
 * @version 2020/04/06
 *
 * サイズ: pt
 * 座標: mm
 * 長さ: px
 * 行間: px
 */
export const drawTextValue = (value, canvas, draw, index) => {

  let ctx = canvas.getContext('2d');
  const card_value = value.value.split(/\n/);
  const y = Math.floor(mmTopx(value.coord_y) * 2);
  const x = Math.floor(mmTopx(value.coord_x) * 2);
  const fontSize = Math.floor(mmTopx(ptTomm(value.font_size))) * 2;
  const lineSpace = Math.floor(mmTopx(value.line_space));
  const contentLength = Math.floor(mmTopx(value.length));
  const font = value.font;

  let parent_div, child_div, child_p;
  let text_height = 0;

  ctx.font = `font-size: ${ fontSize }px; font-family: ${ font }; letter-spacing: ${ lineSpace }px;`;

  // absoluteするための親div
  parent_div = document.getElementById(`parent_div-${ index }`);

  parent_div.style = `position: relative; transform: translate(${ x }px, ${ y }px);`;

  child_div = document.getElementById(`child_div-${ index }`);
  if(value.item_type === 'text') {

    // 以下、子ども
    child_p = document.getElementById(`child_p-${ index }`);

    child_p.textContent = card_value[0] || '';
    if(card_value[0]) child_p.style = `font-size: ${ fontSize }px; display: inline-block;  transform: scaleX(${ (contentLength / ctx.measureText(card_value).width) * 0.95 }); transform-origin: left center; font-family: ${ value.font }; letter-spacing: ${ lineSpace }px; position: absolute;`;

    text_height = child_p.clientHeight;
  } else {

    let childs_p = parent_div.getElementsByTagName('p');

    // 文章の変更だけかチェックする
    if(card_value.length === childs_p) {
      card_value.map((value, index2) => {

        child_p = document.getElementById(`child_p-${ index }-${ index2 }`);

        if(value) {

          child_p.style = `font-size: ${ fontSize }px; display: inline-block;  transform: scaleX(${ (contentLength / ctx.measureText(value).width) * 0.95 }) scaleY(${ (contentLength / ctx.measureText(value).width) * 0.95 }); transform-origin: left center; font-family: ${ value.font }; letter-spacing: ${ lineSpace }px; position: absolute;`;
          child_p.textContent = value;
          text_height += child_p.clientHeight;
        };
      });
    } else {

      // めんどくさんので一括削除
      parent_div.parentNode.removeChild(parent_div);

      // もう一度親divから作り直し
      parent_div = document.createElement('div');
      parent_div.id = `parent_div-${ index }`;
      draw.appendChild(parent_div);

      card_value.map((value, index2) => {

        child_p = document.createElement('p');
        child_p.id = `child_p-${ index }-${ index2 }`;
        parent_div.style = `position: relative; transform: translate(${ x }px, ${ y }px);`;
        parent_div.appendChild(child_p);

        child_div = document.createElement('div');
        child_div.id = `child_div-${ index }`;
        parent_div.appendChild(child_div);

        if(value) {

          child_p.style = `font-size: ${ fontSize }px; display: inline-block;  transform: scaleX(${ (contentLength / ctx.measureText(value).width) * 0.95 }) scaleY(${ (contentLength / ctx.measureText(value).width) * 0.95 }); transform-origin: left center; font-family: ${ value.font }; letter-spacing: ${ lineSpace }px; position: absolute;`;
          // 高さを取得したいので、先にvalueを突っ込む
          child_p.textContent = value;
          child_p.style = `font-size: ${ fontSize }px; display: inline-block;  transform: scaleX(${ (contentLength / ctx.measureText(value).width) * 0.95 }) scaleY(${ (contentLength / ctx.measureText(value).width) * 0.95 }); transform-origin: left center; font-family: ${ value.font }; letter-spacing: ${ lineSpace }px; position: absolute; top: ${ text_height }px; left: 0px;`;
          text_height += child_p.clientHeight;
        };
      });
    };
  };

  // canvasに設定した内容をrestore()
  ctx.restore();
  child_div.style = `width: ${ contentLength }px; height: ${ text_height }px; border: 1px solid; position: absolute;`;
};

/**
 *  ファイルドロップ時
 *  @version 2018/06/10
 *
 * サイズ: pt
 * 座標: mm
 * 長さ: px
 * 行間: px
 */
export const onDrop = (files, templates, front_file, reverse_file, status) => {

  const file = files[0];
  let parse_templates = JSON.parse(JSON.stringify(templates));

  parse_templates[status ? 0 : 1].file = file;
  status ? front_file : reverse_file = file;

  setState({ templates: parse_templates });
};
