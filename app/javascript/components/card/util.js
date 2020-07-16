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

  if(os == 'Windows') return 72 / 25.4 * mm;
  if(os == 'Mac OS') return 72 / 25.4 * mm;
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
  
    /*
    let draw_ctx = draw.getContext('2d');
    canvas.height = (mmTopx(55 * 2));
    canvas.width = (mmTopx(91 * 2));
    draw_canvas.height = (mmTopx(55 * 2));
    draw_canvas.width = (mmTopx(91 * 2));
 
     details.map((detail, index) => {
 
     const name = detail.name;
 
     if(!name) return;
 
     const y = (mmTopx(detail.coord_y)) * 2;
     const x =	(mmTopx(detail.coord_x)) * 2;
     const fontSize = (mmTopx(ptTomm(detail.font_size))) * 2;
     const lineSpace = (mmTopx(detail.line_space));
     const contentLength = (mmTopx(detail.length));
 
     // 自動組版
     // draw_ctx.canvas.style.letterSpacing = lineSpace + 'px';
     // draw_ctx.font = `${ fontSize }px ${ detail.font }`;
     // draw_ctx.fillText(name, x, y, contentLength, 400);
     });
     */
  
    // Set dimensions to Canvas
    canvas.height = Math.floor(mmTopx(55 * 2));
    canvas.width = Math.floor(mmTopx(91 * 2));
 
    draw.style = `height: ${ Math.floor(mmTopx(55 * 2)) }px; width: ${ Math.floor(mmTopx(91 * 2)) }px;}}`;
    
    details.map((detail, index) => {
  
      const name = detail.name;
      
      if(!name) return;
      
      const y = Math.floor(mmTopx(detail.coord_y)) * 2;
      const x =	Math.floor(mmTopx(detail.coord_x)) * 2;
      const fontSize = Math.floor(mmTopx(ptTomm(detail.font_size))) * 2;
      const lineSpace = Math.floor(mmTopx(detail.line_space));
      
      let p = document.createElement('p');
      
      p.textContent = name;
      p.id = `draw-${ index }`;
      // transform: translate(x, y)
      // ヘッダー表示のためword-wrapはなし
      p.style = `font-size: ${ fontSize }px; font-family: ${ detail.font }; letter-spacing: ${ lineSpace }px; transform: translate(${ x }px, ${ y }px)`;
      draw.appendChild(p);
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
  
    /*
    let draw_ctx = draw_canvas.getContext('2d');
    canvas.height = (mmTopx(55 * 2));
    canvas.width = (mmTopx(91 * 2));
    draw_canvas.height = (mmTopx(55 * 2));
    draw_canvas.width = (mmTopx(91 * 2));
  
    values.map(value => {
    
      const card_value = value.value;
    
      if(!card_value) return;
    
      const y = mmTopx(value.coord_y) * 2;
      const x =	mmTopx(value.coord_x) * 2;
      const fontSize = mmTopx(ptTomm(value.font_size)) * 2;
      const lineSpace = mmTopx(value.line_space);
    
      draw_ctx.font = `${ fontSize }px ${ value.font }`;
    
      for(let lines = card_value.split('\n'), i = 0, l = lines.length; l > i; i++) {
      
        let line = lines[i] ;
        let addY = fontSize ;
        if (i) addY += fontSize * lineSpace * i ;
        draw_ctx.fillText(line, x, y + addY);
      };
    
      // 自動組版
      // draw_ctx.canvas.style.letterSpacing = lineSpace + 'px';
      // draw_ctx.font = `${ fontSize }px ${ value.font }`;
      // draw_ctx.fillText(card_value, x, y);
    });
     */
    
    canvas.height = Math.floor(mmTopx(55 * 2));
    canvas.width = Math.floor(mmTopx(91 * 2));
    draw.style = `height: ${ Math.floor(mmTopx(55 * 2)) }px; width: ${ Math.floor(mmTopx(91 * 2)) }px;`;
    
    values.map((value, index) => {
    
      const card_value = value.value;
      const y = Math.floor(mmTopx(value.coord_y) * 2);
      const x =	Math.floor(mmTopx(value.coord_x) * 2);
      const fontSize = Math.floor(mmTopx(ptTomm(value.font_size))) * 2;
      const lineSpace = Math.floor(mmTopx(value.line_space));
      const contentLength = Math.floor(mmTopx(value.length));
  
      let p = document.createElement('p');
  
      p.textContent = card_value || '';
      p.id = `draw-${ index }`;
      p.style = `width: ${ contentLength }px; word-wrap: break-word; border: 1px dotted;font-size: ${ fontSize }px; font-family: ${ value.font }; letter-spacing: ${ lineSpace }px; transform: translate(${ x }px, ${ y }px)`;
      draw.appendChild(p);
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
  
  /*
   let draw_ctx = draw_canvas.getContext('2d')
   draw_ctx.beginPath();
   draw_ctx.clearRect(0, 0, draw_canvas.width, draw_canvas.height);
   draw_ctx.save();
   draw_ctx.setTransform(1, 0, 0, 1, 0, 0);
   draw_ctx.restore();
   
   details.map(detail => {
   
   const name = detail.name;
   
   if(!name) return;
   
   const y = (mmTopx(detail.coord_y)) * 2;
   const x =	(mmTopx(detail.coord_x)) * 2;
   const fontSize =  (mmTopx(ptTomm(detail.font_size))) * 2;
   const lineSpace = (mmTopx(detail.line_space));
   
   draw_ctx.font = `${ fontSize }px ${ detail.font }`;
   
   // 自動組版
   // draw_ctx.canvas.style.letterSpacing = lineSpace + 'px';
   // draw_ctx.font = `${ fontSize }px ${ detail.font }`;
   // draw_ctx.fillText(name, x, y);
   });
   */

  const childElement = draw.childElementCount;
  const name = detail.name;
  const y = Math.floor(mmTopx(detail.coord_y)) * 2;
  const x =	Math.floor(mmTopx(detail.coord_x)) * 2;
  const fontSize = Math.floor(mmTopx(ptTomm(detail.font_size))) * 2;
  const lineSpace = Math.floor(mmTopx(detail.line_space));
  
  let p;
  // 既に作成済み
  if(index < childElement) {
    
    p = document.getElementById(`draw-${ index }`);
  } else {
    
    p = document.createElement('p');
    p.id = `draw-${ index }`;
    draw.appendChild(p);
  };
  
  p.textContent = name || '';
  p.style = `font-size: ${ fontSize }px; font-family: ${ detail.font }; letter-spacing: ${ lineSpace }px; transform: translate(${ x }px, ${ y }px)`;
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
export const drawTextValue = (value, draw, index) => {

  /*
  let draw_ctx = draw_canvas.getContext('2d');

  draw_ctx.beginPath();
  draw_ctx.clearRect(0,0,draw_canvas.width,draw_canvas.height);
  draw_ctx.save();
  draw_ctx.setTransform(1,0,0,1,0,0);
  draw_ctx.restore();
 
   values.map(value => {
 
   const card_value = value.value;
 
   if(!card_value) return;
 
   const y = mmTopx(value.coord_y) * 2;
   const x =	mmTopx(value.coord_x) * 2;
   const fontSize = mmTopx(ptTomm(value.font_size)) * 2;
   const lineSpace = mmTopx(value.line_space);
 
   draw_ctx.font = `${ fontSize }px ${ value.font }`;
 
   for(let lines = card_value.split('\n'), i = 0, l = lines.length; l > i; i++) {
 
   let line = lines[i] ;
   let addY = fontSize ;
   if (i) addY += fontSize * lineSpace * i ;
   draw_ctx.fillText(line, x, y + addY);
   };
 
   // 自動組版
   // draw_ctx.canvas.style.letterSpacing = lineSpace + 'px';
   // draw_ctx.font = `${ fontSize }px ${ value.font }`;
   // draw_ctx.fillText(card_value, x, y);
   });
   */
  
  const childElement = draw.childElementCount;
  const card_value = value.value;
  const y = Math.floor(mmTopx(value.coord_y) * 2);
  const x =	Math.floor(mmTopx(value.coord_x) * 2);
  const fontSize = Math.floor(mmTopx(ptTomm(value.font_size))) * 2;
  const lineSpace = Math.floor(mmTopx(value.line_space));
  const contentLength = Math.floor(mmTopx(value.length));
  
  let p = document.getElementById(`draw-${ index }`);
  p.textContent = card_value || '';
  p.style = `width: ${ contentLength }px; word-wrap: break-word; border: 1px dotted; font-size: ${ fontSize }px; font-family: ${ value.font }; letter-spacing: ${ lineSpace }px; transform: translate(${ x }px, ${ y }px)`;
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