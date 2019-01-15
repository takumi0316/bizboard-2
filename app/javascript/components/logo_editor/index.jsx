import React      from 'react'

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

import { OGIMAGE_WIDTH, OGIMAGE_HEIGHT, WEBCLIP_WIDTH, WEBCLIP_HEIGHT } from './properties.es6'

/**
 *  記事エディター
 *  @version 2018/06/10
 */
export default class LogoEditor extends React.Component {

  /**
   *  submit処理
   *  @version 2018/06/10
   */
  _onSubmitLogo(e) {

    // ロゴが指定されていない場合はキャンセル or 初期化
    if (!this.fileNode.files[0]) {

      if (window.confirm('ロゴが指定されていませんが、ロゴを初期化しますか?')) {

        // ロゴを送信
        Request.post('/configs/create_logo')
          .set('X-Requested-With', 'XMLHttpRequest')
          .setCsrfToken()
          .end((error, response) => {
            
            if (response.body.status == 'success') {

              alert('ロゴを初期化しました');
              window.location.reload();
            } else {

              alert(response.body.message);
            }
          });
      }
      return false;
    }

    let promises = [];

    const uri = (window.URL || window.webkitURL).createObjectURL(this.fileNode.files[0]);
    const mimetype = this.fileNode.files[0].type;

    // ロゴの生成
    promises.push(

      new Promise((resolve, reject) => {

        window.ImageConverter.imageUriToResizedBlob({
          uri,
          mimetype: mimetype,
          is_fill: false,
        }, (blob) => {

          resolve({name: 'logo', blob: blob});
        });
      })
    );

    // webclipの生成
    promises.push(

      new Promise((resolve, reject) => {

        // 画像をリサイズ
        window.ImageConverter.imageUriToResizedBlob({
          uri,
          max_width: OGIMAGE_WIDTH - 10,
          max_height: OGIMAGE_HEIGHT - 10,
          canvas_width: OGIMAGE_WIDTH,
          canvas_height: OGIMAGE_HEIGHT,
          mimetype: 'image/png',
        }, (blob) => {

          this.refs.ogimage.value = blob;
          resolve({name: 'ogimage', blob: blob});
        });
      })
    );

    // ogimageの生成
    promises.push(

      new Promise((resolve, reject) => {

        // 画像をリサイズ
        window.ImageConverter.imageUriToResizedBlob({
          uri,
          max_width: WEBCLIP_WIDTH - 10,
          max_height: WEBCLIP_HEIGHT - 10,
          canvas_width: WEBCLIP_WIDTH,
          canvas_height: WEBCLIP_HEIGHT,
          mimetype: 'image/png',
        }, (blob) => {

          resolve({name: 'webclip', blob: blob});
        });
      })
    );

    // 画像が全て変換できた際に実施
    Promise.all(promises).then((results) => {

      // ロゴを送信
      Request.post('/configs/create_logo')
        .attach(results[0].name, results[0].blob)
        .attach(results[1].name, results[1].blob)
        .attach(results[2].name, results[2].blob)
        .set('X-Requested-With', 'XMLHttpRequest')
        .setCsrfToken()
        .end((error, response) => {
          
          if (response.body.status == 'success') {

            alert('ロゴを更新しました');
            window.location.reload();
          } else {

            alert(response.body.message);
          }
        });
    });
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {

    return (
      <div>
        <input accept='image' type='file' ref={(node) => this.fileNode = node} />
        <input type='hidden' ref='ogimage' />
        <input type='hidden' ref='webclip' />
        <div className='u-ta-right u-mt-20'>
          <div className='c-btnMain-standard' onClick={::this._onSubmitLogo}>更新する</div>
        </div>
      </div>
    );
  }
}
