import React, { Component } from "react"
import PropTypes from "prop-types"

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

export default class Counter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  submit = () => {
    this.setState({ count: this.state.count + 1 });
    Request.post("/companies")
      .send({name: "sample", kana: "サンプル", note: ""})
      .setCsrfToken()
      .end(function(err, res){
        console.log(res.body);
    });
  }


  render() {
    return(
      <div>
        <span>{this.state.count}</span>
        <button onClick={ this.submit }>送信</button>
      </div>
    )
  }
}

