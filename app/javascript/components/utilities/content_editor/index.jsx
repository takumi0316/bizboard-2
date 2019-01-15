import React from 'react'
import Style from './style.sass'
import Modal from '../../utilities/modal'

import { Editor, EditorState, RichUtils, CompositeDecorator, Entity } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'

/**
 *  モーダル
 *  @version 2018/06/10
 */
export default class ContentEditor extends React.Component {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  constructor(props) {

    super(props);

    const decorator = new CompositeDecorator([
      {
        strategy: ::this.findLinkEntities,
        component: ::this.Link,
      },
    ]);

    this.state = {
      editorState: props.content ? EditorState.createWithContent(stateFromHTML(props.content), decorator) : EditorState.createEmpty(decorator),
    }
  }

  /**
   *  レンダリング成功時
   *  @version 2018/06/10
   */
  componentDidMount() {

  }

  /**
   *  エディタをフォーカスする
   *  @version 2018/06/10
   */
  focusEditor() {

    setTimeout(() => this.editor.focus(), 0);
  }

  /**
   *  入力時
   *  @version 2018/06/10
   */
  onChange(editorState) {

    this.setState({editorState});
  }

  /**
   *  テキストのスタイル
   *  @version 2018/06/10
   */
  customBlockStyleFn(contentBlock) {

    return Style.publicDraftStyleDefaultBlock;
  }

  /**
   *  内容を取得
   *  @version 2018/06/10
   */
  content() {

    const { editorState } = this.state;

    if (!editorState.getCurrentContent().hasText()) return '';

    // 本文を取得
    let html = stateToHTML(editorState.getCurrentContent());
    // 本文から空行を除去
    html = html.replace(/<p><br><\/p>/g, '\r\n');
    // aタグをtarget=_blankに
    html = html.replace(/<a /g, "<a target='_blank' rel='nofollow' ");

    return html;
  }

  Link(props) {
    const {url} = Entity.get(props.entityKey).getData();
    return (
      <a href={url}>
        {props.children}
      </a>
    );
  };

  /**
   *  リンク
   *  @version 2018/06/10
   */
  findLinkEntities(contentBlock, callback) {

    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return entityKey !== null && Entity.get(entityKey).getType() === 'LINK';
      },
      callback
    );
  }

  /**
   *  リンク入力モーダルを表示
   *  @version 2018/06/10
   */
  promptForLink(e) {

    e.preventDefault();

    const {editorState} = this.state;
    const selection = editorState.getSelection();

    if (!editorState.getCurrentContent().hasText()) return '';

    if (!selection.isCollapsed() && editorState.getCurrentContent().hasText()) {

      this.setState({editorState: RichUtils.toggleLink(editorState, selection, null)}, () => {
        this.refs.link_url.open();
      });
    }
  }

  /**
   *  入力したリンクを適用する
   *  @version 2018/06/10
   */
  applyLink(e) {

    e.preventDefault();

    const {editorState} = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: this.refs.url.value });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    this.setState({
      editorState: RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey
      ),
    }, () => {
      this.refs.link_url.close();
      ::this.focusEditor();
    });
  }

  /**
   *  リンク入力
   *  @version 2018/06/10
   */
  link_modal_content() {

    return (
      <div className={Style.Palette__others}>

        <label className='u-fc-thinBlack u-fs-small'>リンク先のURL</label>
        <input type='text' ref='url' placeholder='httpsから始まるURLを入力してください' />

        <div className='c-btnMain-standard u-mt-15' onClick={::this.applyLink}>適用する</div>
      </div>
    );
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {

    const { editorState } = this.state;

    return (
      <div>
        <button className={Style.ContentEditor__button} onMouseDown={(e) => {
          this.onChange(
            RichUtils.toggleInlineStyle(editorState, 'BOLD')
          )
          e.preventDefault()
        }}>太字</button>
        <button className={Style.ContentEditor__button} onMouseDown={::this.promptForLink}>リンク</button>
        <div className={`${Style.ContentEditor} u-mt-10`} onClick={::this.focusEditor}>
          <Editor
            ref={(editor) => this.editor = editor}
            editorState={editorState}
            onChange={::this.onChange}
            blockStyleFn={this.customBlockStyleFn}
          />
        </div>
        <Modal ref='link_url' yield={this.link_modal_content()} />
      </div>
    );
  }
}
