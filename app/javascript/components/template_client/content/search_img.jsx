import React from 'react';
import Style from './style.sass';

/**
 *  @version 2018/06/10
 */
export default class Uploads extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    this.state = {
      images: props.uploads,
      loading: false,
      show: false,
    }
  }

  /**
   *  検索モーダルを表示する
   *  @version 2018/06/10
   */
  open = () => this.setState({ show: true });

  /**
   *  検索モーダルを閉じる
   *  @version 2018/06/10
   */
  close = () => this.setState({ images: [], show: false });

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  stopPropagation = e => event.stopPropagation();

  /**
   *  エンター押下時
   *  @version 2018/06/10
   */
  onEnter = e => e.keyCode == 13 ? this.search(1) : null;

  /**
   *  画像の選択
   *  @version 2018/06/10
   */
  onSelect = e => {

    const upload = {
      index: this.props.index,
      upload_id: JSON.parse(e.target.dataset.upload).upload_id,
      name: JSON.parse(e.target.dataset.upload).name,
      url: e.target.src
    };

    this.props.applyUpload(upload);
    this.close();
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {

    return ( this.state.show ?
      <div>
        <div className={ Style.SearchLogo }>
          <div className={ Style.SearchLogo__body } onMouseDown={ e => this.stopPropagation(e) }>
            { this.state.images.length > 0 ?
              <div className={ Style.SearchLogo__items }>
                <ul className={ Style.SearchLogo__images }>
                  {this.state.images.map((image, i) => {
                    const key = `upload-${i}`;
                    return (
                      <li {...{key}} className={ Style.SearchLogo__image }>
                        <div className={ `${ Style.Upload__image }` }>
                          <img src={ image.url } data-upload={ JSON.stringify(image) } onClick={ e => this.onSelect(e) }/>
                          <h2 className={ Style.Upload__title }>{ image.name }</h2>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              : <div className='c-attention u-mt-30'>画像が存在しません。</div>
            }
          </div>

          { this.state.loading ?
            <div className={Style.SearchLogo__overlay} onClick={ this.stopPropagation }>
              Loading
            </div> : null
          }
        </div>
      </div>
      :
      <div className='c-btnMain-standard' onClick={ this.open }>画像検索</div>
    );
  }
}
