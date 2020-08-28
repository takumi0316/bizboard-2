// ライブラリをインポート
const UAParser = require('ua-parser-js');

// プロパティ
import { FontFamilies } from './properties';

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

  if(os == 'Windows') return 72 / 25.4 * mm;
  if(os == 'Mac OS') return 72 / 25.4 * mm;
};

const readFileAsync = file => {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

// PDFをcanvasに展開して、画像に変換する
async function uploadPDF(e) {

  // PDFファイルデータをArrayBuffer型で取得
  const fileData = await readFileAsync(e)

  // PDFファイルのパース
  const pdf = await pdfjsLib.getDocument({
    data: fileData,
    cMapUrl: '/cmaps/',
    cMapPacked: true,
  })

  // 1ページ目をcanvasにレンダリング
  const page = await pdf.getPage(1)
  const canvas = document.createElement('canvas');
  const viewport = page.getViewport({ scale: 2 })
  canvas.height = viewport.height
  canvas.width = viewport.width
  const context = canvas.getContext('2d')
  let task = page.render({
    canvasContext: context,
    viewport: viewport,
  });

  await task.promise

  // canvasにレンダリングされた画像をファイル化
  const base64 = canvas.toDataURL('image/png')
  const tmp = base64.split(',')
  const data = atob(tmp[1])
  const mime = tmp[0].split(':')[1].split(';')[0]
  const buf = new Uint8Array(data.length)
  for(let i = 0; i < data.length; i++) buf[i] = data.charCodeAt(i);

  const blob = new Blob([buf], { type: mime })
  const imageFile = new File([blob], 'layout.png', {
    lastModified: new Date().getTime(),
  })

  return imageFile;
};

export const convertPDFtoPNG = pdf => uploadPDF(pdf);

/**
 * PDFを展開する
 * @version 2020/03/30
 *
 */
export const setPDF = (file, contents) => {

  const blob = new Blob([file]);
  const blob_path = (window.URL || window.webkitURL).createObjectURL(blob);
  const getPDF = pdfjsLib.getDocument(blob_path);

  getPDF.promise.then(pdf => {
    return pdf.getPage(1);
  }).then(page => {

    const canvas = document.getElementById('pdf');
    const draw = document.getElementById('drawer');

    // Fetch canvas' 2d context
    let ctx = canvas.getContext('2d');

    // Set dimensions to Canvas
    // 画像をスケールさせて、解像度をあげる
    canvas.height = (mmTopx(55 * 4));
    canvas.width = (mmTopx(91 * 4));
    canvas.style.height = (mmTopx(55 * 2)) + 'px';
    // canvas.style.height = (mmTopx(55 * (canvas.width / page.getViewport(1.0).width))) + 'px';
    canvas.style.width = (mmTopx(91 * 2)) + 'px';
    // canvas.style.width = (mmTopx(91 * (canvas.width / page.getViewport(1.0).width))) + 'px';

    draw.style = `height: ${ Math.floor(mmTopx(55 * 2)) }px; width: ${ Math.floor(mmTopx(91 * 2)) }px;`;
    // draw.style = `height: ${ Math.floor(mmTopx(55 * (canvas.width / page.getViewport(1.0).width))) }px; width: ${ Math.floor(mmTopx(91 * (canvas.width / page.getViewport(1.0).width))) }px;`;

    // Get viewport (dimensions)
    // 描画範囲にPDFをまとめる
    const viewport = page.getViewport({ scale: canvas.width / page.getViewport(1.0).width });

    // Prepare object needed by render method
    const renderContext = {
      canvasContext: ctx,
      transform: [1, 0, 0, 1, 0, 0],
      viewport: viewport
    };

    // Render PDF page
    page.render(renderContext);

    // 前回のデータを引き継がないようにする
    if(draw.childElementCount > 0) draw.textContent = null;

    contents.map((content, index) => {

      // 削除予定のコンテンツ
      if(content._destroy) return;

      const name = content.name;

      // 入力値が空欄だったらやめる
      if(!name && content.layout_type != 'image') return;

      const y = Math.floor(mmTopx(content.y_coordinate)) * 2;
      // const y = Math.floor(mmTopx(content.y_coordinate)) * (canvas.width / page.getViewport(1.0).width);
      const x = Math.floor(mmTopx(content.x_coordinate)) * 2;
      // const x = Math.floor(mmTopx(content.x_coordinate)) * (canvas.width / page.getViewport(1.0).width);
      const fontSize = Math.floor(mmTopx(ptTomm(content.font_size))) * 2;
      // const fontSize = Math.floor(mmTopx(ptTomm(content.font_size))) * (canvas.width / page.getViewport(1.0).width);
      const letterSpacing = Math.floor(mmTopx(content.letter_spacing));
      const contentLength = Math.floor(mmTopx(content.layout_length));

      // absoluteするための親div
      let parent_div = document.createElement('div');
      parent_div.id = `parent_div-${ index }`;
      parent_div.style = `position: relative; transform: translate(${ x }px, ${ y }px);`;

      if(content.layout_type != 'image') {

        // 以下、子ども
        let child_p = document.createElement('p');
        child_p.id = `child_p-${ index }`;
        let child_div = document.createElement('div');
        child_div.id = `child_div-${ index }`;
        draw.appendChild(parent_div);
        child_p.textContent = name || '';
        // transform: translate(x, y)
        // ヘッダー表示のためword-wrapはなし
        child_p.style = `font-size: ${ fontSize }px; font-family: ${ FontFamilies[content.font_family] }; letter-spacing: ${ letterSpacing }px; position: absolute;`;
        parent_div.appendChild(child_p);
        // 先に描画をしないと高さを取得出来ないため
        child_div.style = `width: ${ contentLength }px; height: ${ child_p.clientHeight }px; border: 1px solid; position: absolute;`;
        parent_div.appendChild(child_div);
      } else {

        draw.appendChild(parent_div);
        let child_img = document.createElement('img');
        child_img.id = `child_img-${ index }`;
        child_img.src = content.uploads[0].url;
        child_img.style = `width: ${ contentLength }px; position: absolute;`;
        parent_div.appendChild(child_img);
      };

    });
  }).catch(error => window.alertable({ icon: 'error', message: error }));
};

/**
 * PDFを展開する
 * @version 2020/03/30
 *
 */
export const setPDFValue = (file, contents) => {

  const blob = new Blob([file]);
  const blob_path = (window.URL || window.webkitURL).createObjectURL(blob);
  const getPDF = pdfjsLib.getDocument(blob_path);

  getPDF.promise.then(pdf => {
    return pdf.getPage(1);
  }).then(page => {

    const canvas = document.getElementById('pdf');
    const draw = document.getElementById('drawer');

    let ctx = canvas.getContext('2d');

    canvas.height = (mmTopx(55 * 4));
    canvas.width = (mmTopx(91 * 4));
    canvas.style.height = (mmTopx(55 * 2)) + 'px';
    canvas.style.width = (mmTopx(91 * 2)) + 'px';

    draw.style = `height: ${ Math.floor(mmTopx(55 * 2)) }px; width: ${ Math.floor(mmTopx(91 * 2)) }px;`;

    const viewport = page.getViewport({ scale: canvas.width / page.getViewport(1.0).width });

    const renderContext = {
      canvasContext: ctx,
      transform: [1, 0, 0, 1, 0, 0],
      viewport: viewport
    };

    page.render(renderContext);

    if(draw.childElementCount > 0) draw.textContent = null;

    contents.map((content, index) => {

      let values = [];

      if(content.content_type === 'text') {

        if(!content.text_value) return;
        values.push(content.text_value.trim());
      };

      if(content.content_type === 'text_area') {

        if(!content.textarea_value) return;
        values = content.textarea_value.split('\n').map(value => value.trim());
      };

      const y = Math.floor(mmTopx(content.y_coordinate)) * 2;
      const x = Math.floor(mmTopx(content.x_coordinate)) * 2;
      const fontSize = Math.floor(mmTopx(ptTomm(content.font_size))) * 2;
      const letterSpacing = Math.floor(mmTopx(content.letter_spacing));
      const contentLength = Math.floor(mmTopx(content.layout_length));

      let parent_div = document.createElement('div');
      parent_div.id = `parent_div-${ index }`;
      parent_div.style = `position: relative; transform: translate(${ x }px, ${ y }px);`;

      if(content.content_type != 'image') {

        const font_family = Object.keys(FontFamilies).map(font_family => font_family).find(fam => FontFamilies[fam] == content.font_family);

        let child_div = document.createElement('div');
        child_div.id = `child_div-${ index }`;
        draw.appendChild(parent_div);

        let text_height = 0;

        values.map((value, val_index) => {

          if(val_index > 0) {

            const before_child_p = document.getElementById(`child_p-${ index }-${ val_index - 1 }`);
            text_height = text_height + before_child_p.clientHeight;
          };

          let child_p = document.createElement('p');
          child_p.id = `child_p-${ index }-${ val_index }`;

          child_p.textContent = value || '';

          child_p.style = `white-spae: nowrap; font-size: ${ fontSize }px; font-family: ${ font_family }; letter-spacing: ${ letterSpacing }px; position: absolute; top: ${ text_height }px;`;
          parent_div.appendChild(child_p);

          if((contentLength - child_p.clientWidth) < 0) {

            const p_cal = Math.floor((contentLength / child_p.clientWidth) * 100);
            const red_cal =  Math.floor(content.reduction_rate);

            child_p.style = `white-space: nowrap; font-size: ${ fontSize }px; font-family: ${ font_family }; letter-spacing: ${ letterSpacing }px; transform: scaleX(${ (contentLength / child_p.clientWidth) }); transform-origin: left center; position: absolute; top: ${ text_height };`;

            // 縮小率が指定よりも小さい場合は、最小値を代入
            if(content.is_reduction_rated == 'true' && (p_cal - red_cal) < 0) {

              child_p.style = `white-space: nowrap; font-size: ${ fontSize }px; font-family: ${ font_family }; transform: scaleX(${ (red_cal / 100) }); transform-origin: left center; position: absolute; top: ${ text_height };`;
            };
          };

          child_div.style = `width: ${ contentLength }px; height: ${ val_index > 0 ? text_height + child_p.clientHeight : child_p.clientHeight }px; border: 1px solid; position: absolute;`;
        });

        parent_div.appendChild(child_div);
      } else {

        // 画像をbase変換しないと、スクショ時にCORSエラーが出る
        const field = new FormData();
        const upload = () => {

          let re_upload;
          if(content.upload_id) {

            const upload = content.uploads.filter(upload => upload.upload_id === content.upload_id);
            re_upload = upload[0];
          };

          if(!content.upload_id || !re_upload) {

            re_upload = content.uploads[0];
          };

          return re_upload;
        };

        field.append('url', upload().url);
        const request = window.xhrRequest.post('/template_clients/image_transfer', field, { responseType: 'blob' });
        request.then(res => {

          const image = new Blob([res.data]);
          const blob_path = (window.URL || window.webkitURL).createObjectURL(image);

          draw.appendChild(parent_div);

          const logoHeight = Math.floor(mmTopx(content.logo_height));
          const logoWidth = Math.floor(mmTopx(content.logo_width));

          let child_img = document.createElement('img');

          child_img.id = `child_img-${ index }`;
          child_img.src = blob_path;
          child_img.style = `height: ${ logoHeight }px; width: ${ logoWidth }px; position: absolute;`;

          parent_div.appendChild(child_img);

        }).catch(err => window.alertable({ icon: 'error', message: 'レイアウトを取得できませんでした。', close_callback: () => console.log(err) }));
      };

    });
  }).catch(error => window.alertable({ icon: 'error', message: error }));
};
