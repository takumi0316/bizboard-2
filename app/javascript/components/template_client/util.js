// ライブラリをインポート
const UAParser = require('ua-parser-js');

// プロパティ
import { FontFamilies, FontWeights } from './properties';

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
export const setPDFValue = (file, contents) => {

  const blob = new Blob([file]);
  const blob_path = (window.URL || window.webkitURL).createObjectURL(blob);
  const getPDF = pdfjsLib.getDocument(blob_path);

  getPDF.promise.then(pdf => pdf.getPage(1)).then(page => {

    const canvas = document.getElementById('pdf');
    const draw = document.getElementById('drawer');

    let ctx = canvas.getContext('2d');

    canvas.height = (mmTopx(55 * 4));
    canvas.width = (mmTopx(91 * 4));
    canvas.style.height = (mmTopx(55 * 2)) + 'px';
    canvas.style.width = (mmTopx(91 * 2)) + 'px';

    draw.style = `height: ${ mmTopx(55 * 2) }px; width: ${ mmTopx(91 * 2) }px;`;

    const viewport = page.getViewport({ scale: canvas.width / page.getViewport(1.0).width });

    const renderContext = {
      canvasContext: ctx,
      transform: [1, 0, 0, 1, 0, 0],
      viewport: viewport
    }

    page.render(renderContext)

    if(draw.childElementCount > 0) draw.textContent = null

    contents.map((content, index) => {

      let values = []

      if(content.content_type === 'text') {
        if(!content.text_value) return
        values.push(content.text_value.trim())
      }

      if(content.content_type === 'text_area') {
        if(!content.textarea_value) return
        values = content.textarea_value.split('\n').map(value => value.trim())
      }

      const y = mmTopx(content.y_coordinate) * 2
      const x = mmTopx(content.x_coordinate) * 2
      const fontSize = mmTopx(ptTomm(content.font_size)) * 2
      const letterSpacing = mmTopx(content.letter_spacing)
      const contentLength = mmTopx(content.layout_length)

      let parent_div = document.createElement('div')
      parent_div.id = `parent_div-${ index }`
      parent_div.style = `position: relative; transform: translate(${ x }px, ${ y }px);`

      if(content.content_type !== 'image') {

        const font_family = Object.keys(FontFamilies).find((font_family, index) => index === content.font_family)
        const font_weight = FontWeights[content.font_weight]

        let child_div = document.createElement('div')
        child_div.id = `child_div-${ index }`
        draw.appendChild(parent_div)

        let text_height = 0

        values.map((value, val_index) => {
          if(val_index > 0) {
            const before_child_p = document.getElementById(`child_p-${ index }-${ val_index - 1 }`)
            text_height = text_height + before_child_p.clientHeight
          }

          let child_p = document.createElement('p')
          child_p.id = `child_p-${ index }-${ val_index }`

          child_p.textContent = value || ''

          child_p.style = `white-spae: nowrap; font-size: ${ fontSize }px; font-family: ${ font_family }; font-weight: ${ font_weight }; letter-spacing: ${ letterSpacing }px; position: absolute; top: ${ text_height }px;`
          parent_div.appendChild(child_p)
  
          if((contentLength - child_p.clientWidth) < 0) {

            // 縮小率が指定よりも小さい場合は、最小値を代入
            if(content.is_reduction_rated == 'true') {

              const p_cal = Math.floor((contentLength / child_p.clientWidth) * 100)
              const red_cal =  Math.floor(content.reduction_rate)

              child_p.style = `white-space: nowrap; font-size: ${ fontSize }px; font-family: ${ font_family }; font-weight: ${ font_weight }; letter-spacing: ${ letterSpacing }px; transform: scaleX(${ (contentLength / child_p.clientWidth) }); transform-origin: left center; position: absolute; top: ${ text_height };`

              if((p_cal - red_cal) < 0) {
                child_p.style = `white-space: nowrap; font-size: ${ fontSize }px; font-family: ${ font_family }; font-weight: ${ font_weight }; transform: scaleX(${ (red_cal / 100) }); transform-origin: left center; position: absolute; top: ${ text_height };`
              }
            }
          }

          child_div.style = `width: ${ contentLength }px; height: ${ val_index > 0 ? text_height + child_p.clientHeight : child_p.clientHeight }px; border: 1px solid; position: absolute;`;
        })
        parent_div.appendChild(child_div)
      } else {
        // 画像なしの場合
        if(!content.upload_id) return

        console.log({ ...content })
        console.log({ ...content.uploads.find(upload => upload.id === content.upload_id) })
        draw.appendChild(parent_div)
        const logoHeight = mmTopx(content.logo_height)
        const logoWidth = mmTopx(content.logo_width)
        let child_img = document.createElement('img')
        child_img.id = `child_img-${ index }`
        child_img.src = content.uploads.find(upload => upload.upload_id === content.upload_id).url
        child_img.style = `height: ${ logoHeight }px; width: ${ logoWidth }px; position: absolute;`
        parent_div.appendChild(child_img)

        /*
          画像をbase変換しないと、スクショ時にCORSエラーが出る
          const field = new FormData()
          const upload = () => {

            let re_upload;
            if(content.upload_id) {

              const upload = content.uploads.filter(upload => upload.upload_id === content.upload_id)
              re_upload = upload[0]
            }

            if(!content.upload_id || !re_upload) {

              re_upload = content.uploads[0]
            }

            return re_upload
          }

          field.append('url', upload().url)
          const request = window.xhrRequest.post('/template_clients/image_transfer', field, { responseType: 'blob' })
          request.then(res => {
            const image = new Blob([res.data])
            const blob_path = (window.URL || window.webkitURL).createObjectURL(image)

            draw.appendChild(parent_div)

            const logoHeight = mmTopx(content.logo_height)
            const logoWidth = mmTopx(content.logo_width)

            let child_img = document.createElement('img')

            child_img.id = `child_img-${ index }`
            child_img.src = blob_path
            child_img.style = `height: ${ logoHeight }px; width: ${ logoWidth }px; position: absolute;`

            parent_div.appendChild(child_img)

          }).catch(err => window.mf_like_modal({ icon: 'error', message: '画像を取得できませんでした。', close_callback: () => console.log(err) }))
        */
      }
    })
  }).catch(error => window.mf_like_modal({ icon: 'error', message: error }))
}
