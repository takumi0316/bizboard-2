import React   from 'react'
import Icon    from '../../icon'
import Request from 'superagent'
import Style   from './style.sass'

// fileアップロード
import Dropzone from 'react-dropzone'

/**
 *  @version 2018/06/10
 */
export default class Pdf extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      file: null,
      loading: false,
      show: false,
    }
  }

  /**
   *  検索モーダルを表示する
   *  @version 2018/06/10
   */
  _open = () => {

    this.setState({ show: true });
  }

  /**
   *  検索モーダルを閉じる
   *  @version 2018/06/10
   */
  _close = () => {

    this.setState({ show: false });
  }

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  _stopPropagation(event) {

    event.stopPropagation();
  }

  /**
   *  エンター押下時
   *  @version 2018/06/10
   */
  _onEnter = e => {

    if(e.keyCode == 13) this.upload();
  }

  /**
   *  記事の検索
   *  @version 2018/06/10
   */
  upload = () => {

    if (!this.state.file) {
      window.alertable({
        icon: 'warning',
        message: 'PDFを登録してください',
      });
      return false;
    }

    this.setState({loading: true});

    // 登録処理
    Request.post('/works/pdfs/')
      .attach('pdf[file]', this.state.file)
      .field({ 'pdf[name]': this.titleRef.value })
      .set('X-Requested-With', 'XMLHttpRequest')
      .setCsrfToken()
      .end((err, res) => {

				if(err, res.body.status !== 'success') window.alertable({ icon: 'warning', message: res.body.message });

        // window.alertable({
        //   icon: 'success',
        //   message: '保存が完了しました。'
        // });
				this.setState({loading: false});
        location.href = '/works/pdfs/';
      });
  }

  /**
   *  画像変更時
   *  @version 2018/06/10
   */
  _onChangeImage = e => {

    this.setState({ file: e.target.files[0] });
  }

  /**
   *  ファイルドロップ時
   *  @version 2018/06/10
   */
  _onDrop = files => {

    this.setState({ file: files[0] });
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {

    return ( this.state.show ?
      <div className={Style[this.props.devise]}>
        <div className={Style.Uploader} onMouseDown={this._close}>
          <div className={Style.Uploader__body} onMouseDown={this._stopPropagation}>

            <div className={Style.Uploader__main}>
              <div className={Style.Uploader__form}>
                <input type='text' className='c-form-text' placeholder='名称' ref={ node => this.titleRef = node}/>
              </div>

              <div className='u-mt-15'>
                <Dropzone onDrop={this._onDrop}>
                  {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()} className={Style.Uploader__dropzone}>
                      <input {...getInputProps()} />
                      <p>この部分に画像をドラッグ&ドロップしてください</p>
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className='u-mt-10'>
                <label htmlFor='input_file' className='u-td-underline u-fc-blue'>PDFを指定する</label>
                { this.state.file ? <div>PDFがアップロードされています</div> : <div>PDFをアップロードしてください</div>}
              </div>
              <input id='input_file' type='file' accept='image/*' onChange={this._onChangeImage} />

              <div className='u-ta-right'>
                <div onClick={this.upload} className='c-btnMain-standard u-mt-30'>登録する</div>
              </div>
            </div>

            <div className={Style.Uploader__close} onClick={this._close}>
              <Icon name='close' size='l' color='darkGray'/>
            </div>
          </div>

          { this.state.loading ?
            <div className={Style.Uploader__overlay} onClick={this._stopPropagation}>
              Loading
            </div> : null
          }
        </div>
      </div>
      :
      <div className='c-btnMain-standard u-mt-10' onClick={this._open}>PDFをアップロードする</div>
    );
  }
}
