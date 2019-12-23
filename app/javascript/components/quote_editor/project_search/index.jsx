import React from 'react';
import Style from '../style.sass';

// Ajax
import Request from 'superagent';
require('superagent-rails-csrf')(Request);

/**
 *  @version 2018/06/10
 */
export default class ProjectSearch extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor (props) {

    super(props);

    // キーバインドイベントを一時保存用
    this.previousKeyDownEvent = null;

    this.state = { show: false, projects: [], body: null };
  }


  /**
   *  モーダルを表示する
   *  @version 2018/06/10
   */
  _open() {

    this._search('');

    this.setState({ show: true }, () => {

    });
  }

  /**
   *  モーダルを閉じる
   *  @version 2018/06/10
   */
  _close() {

    this.setState({ show: false, projects: [] });
  }

  _onChange() {

    if (this.refs.word.value == '') {

      this.setState({projects: []});
      return false
    }

    this._search(this.refs.word.value);
  }

  /**
   *  フリーワード検索
   *  @version 2018/06/10
   */
  _search(search) {

    // 記事内容を送信
    Request.get('/projects.json?free_word=' + search)
      .end((error, response) => {

        if (error) return false;
        this.setState({projects: response.body.projects});
      });
  }

  /**
   *  日時を適用する
   *  @version 2018/06/10
   */
  _apply(e) {

    e.stopPropagation();

    let client = {};

    this.props.apply({ project: project });

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
   *  選択時
   *  @version 2018/06/10
   */
  _onSelect(e) {

    const project = this.state.projects[e.target.dataset.number];

    this.props.applyProject(project);
    this._close();
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render () {

    return (this.state.show ?
      <div className={Style.ProjectSearch} onMouseDown={::this._close}>

        <div className={Style.ProjectSearch__inner} onMouseDown={this._stopPropagation}>

          { this.state.body == null ?
            <div>
              <div className={Style.ProjectSearch__form}>
                <input type='text' className={Style.ProjectSearch__input} placeholder='品目名で検索' ref='word' onChange={::this._onChange}/>
                <div onClick={::this._onChange} className='c-btnMain-standard u-ml-10'>検索</div>
              </div>

              { this.state.projects.length > 0 ?

                <ul className={Style.ProjectSearch__list}>
                  {this.state.projects.map((project, i) => {
                    var key = `projects-${i}`;
                    return (
                      <li {...{key}} className={Style.ProjectSearch__item}>
                        <h2 className={Style.ProjectSearch__itemName} data-number={i} onClick={::this._onSelect}>{project.name}：{project.price}円</h2>
                      </li>
                    );
                  })}
                </ul>
                :
                <div className='c-attention u-mt-30'>品目が見つかりませんでした</div>
              }
            </div>
            :
            <div dangerouslySetInnerHTML={{__html : this.state.body}} />
          }
          <div onClick={::this._close} className={Style.ProjectSearch__closeIcon}>×</div>
        </div>
      </div>
      :
      <div className='c-btnMain-standard' onClick={::this._open}>品目を検索</div>
    );
  }
}
