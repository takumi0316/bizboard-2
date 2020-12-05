import React from 'react';

// Libraries
import Icon  from '../icon';
import Style from './style.sass';
import Dropzone from 'react-dropzone';

const IMAGE_MAX_WIDTH = 840;
const IMAGE_MAX_HEIGHT = 560;

/**
 *  @version 2018/06/10
 */
export default class Uploader extends React.Component {
  
  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {
    
    super(props);
    
    this.state = {
      image: null,
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
  _onEnter(e) {
    
    if(e.keyCode == 13) this.upload();
  }
  
  /**
   *  記事の検索
   *  @version 2018/06/10
   */
  upload = () => {
    
    if (!this.state.image) {
      window.alertable({
        icon: 'warning',
        message: '画像を登録してください',
      });
      return false;
    }
    
    this.setState({ loading: true });
    
    // 画像をリサイズ
    window.ImageConverter.imageUriToResizedBlob({
      uri: this.state.image,
    }, blob => {
  
      const field = new FormData();
      field.append('upload[name]', this.titleRef.value);
      field.append('upload[status]', 'card');
      field.append('upload[image]', blob);
      const result = window.xhrRequest.post('/uploads', field)
      result.then(res => {
        this.setState({ loading: false });
        location.href = '/uploads/';
      });
    });
  }
  
  /**
   *  画像変更時
   *  @version 2018/06/10
   */
  _onChangeImage = e => {
    
    this.setState({ image: (window.URL || window.webkitURL).createObjectURL(e.target.files[0]) });
  }
  
  /**
   *  ファイルドロップ時
   *  @version 2018/06/10
   */
  _onDrop = files => {
    
    this.setState({ image: (window.URL || window.webkitURL).createObjectURL(files[0]) });
  }
  
  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {
    
    return ( this.state.show ?
        <div>
          <div className={Style.Uploader} onMouseDown={this._close}>
            <div className={Style.Uploader__body} onMouseDown={this._stopPropagation}>
              
              <div className={Style.Uploader__main}>
                <div className={Style.Uploader__form}>
                  <input type='text' className='c-form-text' placeholder='画像のタイトル' ref={ node => this.titleRef = node}/>
                </div>
                
                <div className='u-mt-15'>
                  <Dropzone onDrop={this._onDrop}>
                    {({getRootProps, getInputProps}) => (
                      <div {...getRootProps()} className={Style.Uploader__dropzone}>
                        <input {...getInputProps()} />
                        <p>この部分に画像をドラッグ&ドロップしてください</p>
                        <img src={this.state.image} />
                      </div>
                    )}
                  </Dropzone>
                </div>
                
                <div className='u-mt-10'>
                  <label htmlFor='input_file' className='u-td-underline u-fc-blue'>ファイルを指定する</label>
                </div>
                <input id='input_file' type='file' accept='image/*' onChange={this._onChangeImage} />
                
                <div className='u-ta-right'>
                  <button onClick={this.upload} className='c-btnMain c-btn-blue'>登録する</button>
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
        <div className='c-btnMain c-btn-blue' onClick={this._open}>画像をアップロード</div>
    );
  }
}
