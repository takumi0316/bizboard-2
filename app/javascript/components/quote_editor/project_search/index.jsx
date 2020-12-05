import React from 'react';
import Style from '../style.sass';

/**
 *  @version 2018/06/10
 */
export default class AddProject extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    // キーバインドイベントを一時保存用
    this.previousKeyDownEvent = null;

    this.state = {
      show: false,
      projects: [],
      body: null
    };
  };


  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   */
  _open = () => {

    this._search('');

    this.setState({ show: true });
  };

  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   */
  _close = () => this.setState({ show: false, projects: [] });

  _onChange = () => {

    if (this.refs.word.value == '') {

      this.setState({ projects: [] });
      return false
    };

    this._search(this.refs.word.value);
  };

  /**
   *  フリーワード検索
   *  @version 2018/06/10
   */
  _search = search => {

    // 記事内容を送信
    const request = window.xhrRequest.get(`/projects.json?free_word=${search}`);
    request.then(res => {

      if(res.data.status == 'success') this.setState({ projects: res.data.projects });
      if(res.data.status != 'success') window.alertable({ icon: 'error', message: '品目を取得できませんでした。' });
    }).catch(err => window.alertable({ icon: 'error', message: err }));
  };

  /**
   *  親要素のクリックイベントを引き継がない
   *  @version 2018/06/10
   */
  _stopPropagation = e => e.stopPropagation();

  /**
   *  選択時
   *  @version 2018/06/10
   */
  _onSelect = e => {

    const project = this.state.projects[e.target.dataset.number];

    this.props.applyProject(project);
    this._close();
  };

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render () {

    return (this.state.show ?
      <div className={Style.ProjectSearch} onMouseDown={ e => this._close(e) }>
        <div className={Style.ProjectSearch__inner} onMouseDown={ e => this._stopPropagation(e) }>
          <div>
            <div className={Style.ProjectSearch__form}>
              <input type='text' className={Style.ProjectSearch__input} placeholder='品目名で検索' ref='word' onChange={ e => this._onChange(e) }/>
              <div onClick={ e => this._onChange(e) } className='c-btnMain u-ml-10'>検索</div>
            </div>
            { this.state.projects ?
              <ul className={Style.ProjectSearch__list}>
                {this.state.projects.map((project, i) => {
                  var key = `projects-${i}`;
                  return (
                    <li {...{key}} className={ Style.ProjectSearch__item }>
                      <h2 className={ Style.ProjectSearch__itemName } data-number={ i } onClick={ e => this._onSelect(e) }>{ project.name }：{ project.price }円</h2>
                    </li>
                  );
                })}
              </ul>
              :
              <div className='c-attention u-mt-30'>品目が見つかりませんでした</div>
            }
          </div>
          <div onClick={ e => this._close(e) } className={Style.ProjectSearch__closeIcon}>×</div>
        </div>
      </div>
      :
      <div className='c-btnMain c-btn-blue' onClick={ e => this._open(e) }>行を追加</div>
    );
  }
}
