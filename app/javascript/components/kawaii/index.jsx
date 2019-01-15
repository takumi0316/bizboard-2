import React      from 'react'

import { Cat } from 'react-kawaii'

import { COLORS } from './properties.es6'

/**
 *  記事エディター
 *  @version 2018/06/10
 */
export default class Kawaii extends React.Component {

  /**
   *  キャラクターのDOMを生成する
   *  @version 2018/06/10
   */
  _setComponent() {

    const charactors = [
      Cat,
    ];

    // ランダムなキャラクター
    const charactor = charactors[Math.floor(Math.random() * charactors.length)];
    // ランダムな色
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    return React.createElement(charactor, { size: 100, mood: this.props.mood || 'blissful', color: color });
  }

  /**
   *  表示処理
   *  @version 2018/06/10
   */
  render() {

    return ::this._setComponent();
  }
}
