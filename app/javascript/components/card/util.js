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
export function generateKey(pre) {

  return `${ pre }_${ new Date().getTime() }`;
};

/**
 * valid property 
 * @version 2020/04/04
 * 
 */
export function validProperty(value, property) {

  if(value) return true;
  window.alertable({ icon: 'error', message: `${property}を入力してください。`});
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

/**
 * PDFを展開する
 * @version 2020/03/30
 * 
 */
export const setPDF = (file, details, canvas, draw_canvas) => {

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
    let draw_ctx = draw_canvas.getContext('2d');

    // Set dimensions to Canvas
    canvas.height = (mmTopx(55 * 2));
    canvas.width = (mmTopx(91 * 2));

    draw_canvas.height = (mmTopx(55 * 2));
    draw_canvas.width = (mmTopx(91 * 2));

    details.forEach(detail => {

      draw_ctx.font = `${mmTopx(ptTomm(detail.font_size)) * 2}px ${detail.font}`;
      const y = mmTopx(detail.coord_y) * 2;
      const x =	mmTopx(detail.coord_x) * 2;
      const fontSize = mmTopx(ptTomm(detail.font_size)) * 2;
      const lineSpace = mmTopx(detail.line_space);
      const name = detail.name;

      for(let lines = name.split('\n'), i = 0, l = lines.length; l > i; i++) {
        let line = lines[i];
        let addY = fontSize;
        if(i) addY += fontSize * lineSpace * i;
        draw_ctx.fillText(line, x, y + addY);
      }
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
 */
export const setPDFValue = (file, canvas, draw_canvas, values) => {

  const blob = new Blob([file]);
  const blob_path = (window.URL || window.webkitURL).createObjectURL(blob);
  const getPDF = pdfjsLib.getDocument(blob_path);

  getPDF.promise.then(function(pdf) {
    return pdf.getPage(1);
  }).then(function(page) {

    let scale = 2;

    let viewport = page.getViewport({ scale: scale });

    let ctx = canvas.getContext('2d');
    let draw_ctx = draw_canvas.getContext('2d');

    canvas.height = (mmTopx(55 * 2));
    canvas.width = (mmTopx(91 * 2));

    draw_canvas.height = (mmTopx(55 * 2));
    draw_canvas.width = (mmTopx(91 * 2));

    values.map(value => {

      draw_ctx.font = `${mmTopx(ptTomm(value.font_size)) * 2}px ${value.font}`;
      const y = mmTopx(value.coord_y) * 2;
      const x =	mmTopx(value.coord_x) * 2;
      const fontSize = mmTopx(ptTomm(value.font_size)) * 2;
      const lineSpace = mmTopx(value.line_space);
      const card_value = value.value;

      if(!card_value) return;
      for(let lines = card_value.split("\n"), i = 0, l = lines.length; l > i; i++) {
        let line = lines[i] ;
        let addY = fontSize ;
        if (i) addY += fontSize * lineSpace * i ;
        draw_ctx.fillText(line, x, y + addY);
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
 */
export const drawText = (details, draw_canvas) => {

  let draw_ctx = draw_canvas.getContext('2d')
  draw_ctx.beginPath();
  draw_ctx.clearRect(0, 0, draw_canvas.width, draw_canvas.height);
  draw_ctx.save();
  draw_ctx.setTransform(1, 0, 0, 1, 0, 0);
  draw_ctx.restore();

  details.forEach(detail => {

    draw_ctx.font = `${mmTopx(ptTomm(detail.font_size)) * 2}px ${detail.font}`;
    const y = mmTopx(detail.coord_y) * 2;
    const x =	mmTopx(detail.coord_x) * 2;
    const fontSize = mmTopx(ptTomm(detail.font_size)) * 2;
    const lineSpace = mmTopx(detail.line_space);
    const name = detail.name;

    for(let lines = name.split('\n'), i = 0, l = lines.length; l > i; i++) {
      let line = lines[i];
      let addY = fontSize;
      if(i) addY += fontSize * lineSpace * i;
      draw_ctx.fillText(line, x, y + addY);
    };
  });
};

/**
 * PDFにテキストを展開
 * @version 2020/04/06
 *
 */
export const drawTextValue = (values, draw_canvas) => {

  let draw_ctx = draw_canvas.getContext('2d');

  draw_ctx.beginPath();
  draw_ctx.clearRect(0,0,draw_canvas.width,draw_canvas.height);
  draw_ctx.save();
  draw_ctx.setTransform(1,0,0,1,0,0);
  draw_ctx.restore();

  values.map(value => {

    draw_ctx.font = `${mmTopx(ptTomm(value.font_size)) * 2}px ${value.font}`;
    const y = mmTopx(value.coord_y) * 2;
    const x =	mmTopx(value.coord_x) * 2;
    const fontSize = mmTopx(ptTomm(value.font_size)) * 2;
    const lineSpace = mmTopx(value.line_space);
    const card_value = value.value;

    if(!card_value) return;
    for(let lines = card_value.split("\n"), i = 0, l = lines.length; l > i; i++) {
      let line = lines[i] ;
      let addY = fontSize ;
      if (i) addY += fontSize * lineSpace * i ;
      draw_ctx.fillText(line, x, y + addY);
    };
  });
};

/**
 *  ファイルドロップ時
 *  @version 2018/06/10
 * 
 */
export const onDrop = (files, templates, front_file, reverse_file, status) => {

  const file = files[0];
  let parse_templates = JSON.parse(JSON.stringify(templates));

  parse_templates[status ? 0 : 1].file = file;
  status ? front_file : reverse_file = file;

  setState({ templates: parse_templates });
};