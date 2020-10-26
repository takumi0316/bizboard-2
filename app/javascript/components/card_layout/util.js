// ライブラリをインポート
const UAParser = require('ua-parser-js');

// プロパティ
import { FontFamilies, FontWeights } from './contents/properties'

/**
 * generate unique key
 * @version 2020/04/04
 *
 **/
export const generateKey = pre => `${ pre }_${ new Date().getTime() }`;

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

    let ctx = canvas.getContext('2d');

    canvas.height = (mmTopx(55 * 3));
    canvas.width = (mmTopx(91 * 3));
    canvas.style.height = (mmTopx(55 * 2)) + 'px';
    canvas.style.width = (mmTopx(91 * 2)) + 'px';

    draw.style = `height: ${ mmTopx(55 * 2) }px; width: ${ mmTopx(91 * 2) }px;`;

    const viewport = page.getViewport({ scale: canvas.width / page.getViewport(1.0).width });

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
      if(!name && content.content_type != 'image') return;

      const y = mmTopx(content.y_coordinate) * 2;
      const x = mmTopx(content.x_coordinate) * 2;
      const fontSize =mmTopx(ptTomm(content.font_size)) * 2;
      const letterSpacing = mmTopx(content.letter_spacing);
      const contentLength = mmTopx(content.layout_length);

      // absoluteするための親div
      let parent_div = document.createElement('div');
      parent_div.id = `parent_div-${ index }`;
      parent_div.style = `position: relative; transform: translate(${ x }px, ${ y }px);`;

      if(content.content_type != 'image') {
  
        const font_family = Object.keys(FontFamilies).find((font_family, index) => index === content.font_family)
        
        let child_p = document.createElement('p');
        child_p.id = `child_p-${ index }`;
        let child_div = document.createElement('div');
        child_div.id = `child_div-${ index }`;
        draw.appendChild(parent_div);
        child_p.textContent = name || '';

        child_p.style = `font-size: ${ fontSize }px; font-family: ${ font_family }; font-weight: ${ FontWeights[content.font_weight] }; letter-spacing: ${ letterSpacing }px; position: absolute;`
        parent_div.appendChild(child_p);
        child_div.style = `width: ${ contentLength }px; height: ${ child_p.clientHeight }px; border: 1px solid; position: absolute;`;
        parent_div.appendChild(child_div);
      } else {

        const logoHeight = mmTopx(content.logo_height);
        const logoWidth = mmTopx(content.logo_width);

        draw.appendChild(parent_div);
        let child_img = document.createElement('img');
        child_img.id = `child_img-${ index }`;
        child_img.src = content.uploads[0].url;
        child_img.style = `height: ${ logoHeight }px; width: ${ logoWidth }px; position: absolute;`;
        parent_div.appendChild(child_img);
      };

    });
  }).catch(error => window.alertable({ icon: 'error', message: error }));
};