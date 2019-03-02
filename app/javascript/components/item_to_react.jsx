import React, { Component } from "react"
import PropTypes from "prop-types"

// Ajax
import Request from "superagent"
require("superagent-rails-csrf")(Request);

export default class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  onSubmit = () => {
    let field = {
      "item[division_id]": this.refs.division_id.value,
      "item[name]": this.refs.name.value,
      "item[code]": this.refs.code.value,
      "item[note]": this.refs.note.value,
      "item[quantity]": this.refs.quantity.value,
      "item[unit_price]": this.refs.unit_price.value,
      "item[unit]": this.refs.unit.value,
      "item[excise]": this.refs.excise.value,
    };
    let url = "http://localhost:3000/items/" + this.props.id;
    Request.put(url)
      .field(field) // postでリクエストをする際はsendではなく、fieldで送る
      .set('X-Requested-With', 'XMLHttpRequest') // railsにajax通信であることを教える
      .setCsrfToken()
      .end(function(err, res){ 
        console.log(res.body);
      });
  }

  sub = () => {
    this.refs.name.value = "kkkkkkkkk"
  }


  render() {
    return (
      <div>
        <h1>取引先{ this.props.division_id }</h1>
        <br />
        部署
        <br />
        <input type="text" autoComplete="off" ref="division_id" defaultValue={ this.props.division_id } />
        <br />
        名称
        <br />
        <input type="text" autoComplete="off" spellCheck="off" ref="name" defaultValue={ this.props.name } />
        <br />
        品目コード
        <br />
        <input type="text" autoComplete="off" ref="code" defaultValue={ this.props.code } />
        <br />
        単価
        <br />
        <input type="text" ref="unit_price" defaultValue={ this.props.unit_price } />
        <br />
        単位
        <br />
        <input type="text" ref="unit" defaultValue={ this.props.unit } />
        数量
        <br />
        <input type="text" ref="quantity" defaultValue={ this.props.quantity } />
        消費税
        <br />
          <select ref="excise" defaultValue={ this.props.excise }>
            <option></option> 
            <option value={ true }>税込</option> 
            <option value={ false }>税別</option>
          </select>
        <br />
        詳細
        <br />
        <input type="text_area" ref="note" defaultValue={ this.props.note } />
        <br />
        <button onClick={ this.onSubmit }>更新</button>
      </div>
    )
  }
}
