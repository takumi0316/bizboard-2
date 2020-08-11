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
    const draw_canvas = document.getElementById('drawer');
  
    // Fetch canvas' 2d context
    let ctx = canvas.getContext('2d');
    let draw_ctx = draw_canvas.getContext('2d');
  
    // Set dimensions to Canvas
    canvas.height = (mmTopx(55 * 2));
    canvas.width = (mmTopx(91 * 2));
  
    draw_canvas.height = (mmTopx(55 * 2));
    draw_canvas.width = (mmTopx(91 * 2));
  
    // Set scale (zoom) level
    const scale = 2;
  
    // Get viewport (dimensions)
    console.log(page.getViewport({ scale: page.getViewport(2.0).width / canvas.width, width: canvas.width, height: canvas.height }))
    console.log(page.getViewport({ scale: scale, width: canvas.width, height: canvas.height }))
    console.log(page.getViewport({ scale: scale }))
    let viewport = page.getViewport({ scale: page.getViewport(2.0).width / canvas.width, width: canvas.width, height: canvas.height });
    
    // Prepare object needed by render method
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    
    // Render PDF page
    page.render(renderContext);
  }).catch(error => window.alertable({ icon: 'error', message: error }));
};