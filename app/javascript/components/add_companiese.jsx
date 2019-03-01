import React, { Component } from "react"
import PropTypes from "prop-types"

// Ajax
import Request from 'superagent'
require('superagent-rails-csrf')(Request);

export default class Button extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.id,
      name: "",
      kana: "",
      note: ""
    }
  }

  update_name(e) {
    this.setState({ name: e.target.value })
  }

  update_kana(e) {
    this.setState({ kana: e.target.value })
  }

  update_note(e) {
    this.setState({ note: e.target.value })
  }

  submit = () => {
    var url = "http://localhost:3000/companies/" + this.state.id
    Request.put(url)
      .send({id: this.state.id, name: this.state.name, kana: this.state.kana, note: this.state.note})
      .setCsrfToken()
      .end(function(err, res){ 
        console.log(res.body);
      });
  }

  render() {
    return (
      <div> 
        名称<input type="text" value={ this.state.name } onChange={ e => this.update_name(e) } />
        <br />
        名称(カナ)<input type="text" value={ this.state.kana } onChange={ e => this.update_kana(e) } />
        <br />
        メモ<input type="text" value={ this.state.note } onChange={ e => this.update_note(e) } />
        <br />
        <button onClick={ this.submit }>変更</button>
      </div>
    )
  }
}



