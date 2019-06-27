import React, { Component } from "react"
import Style from './style.sass'

export default class Target extends Component {

  constructor(props) {

    super(props)
  }

  render() {
    return (
      <div className={Style.Target}>
        目標
      </div>
    );
  }
}
