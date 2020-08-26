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

    this.page = 1;
    this.total_pages = 1;

    this.state = {
      images: [],
      loading: false,
      show: false,
    }
  }

  /**
   *  検索モーダルを表示する
   *  @version 2018/06/10
   */
  open = () => this.setState({ images: [], show: true }, this.search);

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
   *  次のページ
   *  @version 2018/06/10
   */
  next = () => {

    this.page++;
    this.search(this.page);
  };

  /**
   *  前のページ
   *  @version 2018/06/10
   */
  prev = () => {

    if(this.page <= 1) return;
    this.page--;
    this.search(this.page);
  };

  /**
   *  画像の検索
   *  @version 2018/06/10
   */
  search = (page=1) => {

    this.page = page;

    let url = `/uploads.json?page=${ this.page }`;
    if(this.wordRef.value != '') url += `&name=${ this.wordRef.value }`;

    const request = window.xhrRequest.get(url);
    request.then(res => {

      this.total_pages = res.data.pagination.last;

      this.setState({ images: res.data.uploads });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 500);

    }).catch(err => this.setState({ images: [], loading: false }));

    this.setState({ loading: true });
  }

  /**
   *  画像の選択
   *  @version 2018/06/10
   */
  onSelect = e => {

    const upload = {
      id: '',
      upload_id: JSON.parse(e.target.dataset.upload).id,
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
            <div className={ Style.SearchLogo__form }>
              <input type='text' className={ Style.SearchLogo__input } placeholder='画像名で検索' ref={ node => this.wordRef = node} onKeyDown={ e => this.onEnter(e) }/>
              <div onClick={ this.search.bind(this, 1) } className='c-btnMain-standard u-ml-10'>検索</div>
              { this.page > 1 ? <div className={ Style.SearchLogo__prev } onClick={ e => this.prev(e) }></div> : null }
              <div className={ Style.SearchLogo__pages }>{ this.page } / { this.total_pages }</div>
              { this.page < this.total_pages ? <div className={ Style.SearchLogo__next } onClick={ e => this.next(e) }></div> : null }
            </div>

            { this.state.images.length > 0 ?
              <div className={ Style.SearchLogo__items }>
                <ul className={ Style.SearchLogo__images }>
                  {this.state.images.map((image, i) => {
                    const key = `upload-${i}`;
                    return (
                      <li {...{key}} className={ Style.SearchLogo__image }>
                        <img src={ image.url } data-upload={ JSON.stringify(image) } onClick={ e => this.onSelect(e) } />
                      </li>
                    );
                  })}
                </ul>
              </div>
              :
              <div className='c-attention u-mt-30'>
                ファイルが存在しません
              </div>
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
      <div className='c-btnMain-standard' onClick={ this.open }>画像・ロゴ検索</div>
    );
  }
}
