import React from 'react'
import Style from './style.sass'

const EditingViewer = props => {

  return (
    <div className={ Style.EditingViewer }>
      <div className={ Style.EditingViewer__header }>見積書編集</div>
      <div className={ Style.EditingViewer__inner }>

        <div className={ Style.EditingViewer__innerColumn }>
          <div>
            <strong>
              お客様情報
              <div className={ Style.EditingViewer__innerColumn__must }>必須</div>
            </strong>
          </div>
          <div className='u-mt-5'>
            <input className='c-form-text'/>
          </div>
        </div>

        <div className={ Style.EditingViewer__innerColumn }>
          <div>
            <strong>
              売上部署
              <div className={ Style.EditingViewer__innerColumn__must }>必須</div>
            </strong>
          </div>
          <div className='u-mt-5'>
            <input className='c-form-text'/>
          </div>
        </div>

        <div className={ Style.EditingViewer__innerColumn }>
          <div className={ Style.EditingViewer__innerColumn__three }>
            <strong>見積書番号</strong>
            <input className='c-form-text' readOnly='readonly'/>
          </div>
          <div
            className={ `${ Style.EditingViewer__innerColumn__three } ${ Style.EditingViewer__innerColumn__threeDate }` }>
            <strong>発行日</strong>
            <input className='c-form-text'/>
          </div>
          <div
            className={ `${ Style.EditingViewer__innerColumn__three } ${ Style.EditingViewer__innerColumn__threeDate }` }>
            <strong>有効期限</strong>
            <div>
              <input className='c-form-text'/>
              <div className='u-mt-5 c-flex__between'>
                <span className={ Style.EditingViewer__btnFreeze }>今月末</span>
                <span className={ Style.EditingViewer__btnFreeze }>来月末</span>
              </div>
            </div>
          </div>
        </div>

        <div className={ Style.EditingViewer__innerColumn }>
          <div>
            <strong>
              件名
              <div className={ Style.EditingViewer__innerColumn__must }>必須</div>
            </strong>
            <div className='u-mt-5'>
              <input className='c-form-text'/>
            </div>
          </div>
        </div>

        <div className={ Style.EditingViewer__innerColumn }>
          <div>
            <strong>明細</strong>
          </div>
          <table className={ Style.EditingViewer__table }>
            <colgroup>
              <col width='32%'/>
              <col width='16%'/>
              <col width='14%'/>
              <col width='16%'/>
              <col width='11%'/>
              <col width='11%'/>
            </colgroup>
            <thead>
              <tr>
                <th>品目</th>
                <th>単価</th>
                <th>数量</th>
                <th>価格</th>
                <th>詳細</th>
                <th>削除</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input className='c-form-text'/></td>
                <td><input className='c-form-text'/></td>
                <td><input className='c-form-text'/></td>
                <td><input className='c-form-text' readOnly='readonly'/></td>
                <td/>
                <td/>
              </tr>
            </tbody>
          </table>
          <div className='u-ta-right u-mt-5'>
            <div className={ Style.EditingViewer__btnNormal }>
              <i></i>
              行を追加
            </div>
          </div>
        </div>

        <div className={ Style.EditingViewer__innerColumn }>
          <div>
            <strong>備考</strong>
            <div className='u-mt-5'>
              <textarea className='c-form-textarea'/>
            </div>
          </div>
        </div>

        <div className={ Style.EditingViewer__innerColumn }>
          <div>
            <strong>メモ</strong>
            <div className='u-mt-5'>
              <textarea className='c-form-textarea'/>
            </div>
          </div>
        </div>

        <div className='u-ta-center u-mt-5'>
          <button className='c-btnMain'>詳細設定</button>
          <button className='c-btnMain c-btn-blue'>保存</button>
        </div>
      </div>
    </div>
  )
}

export default EditingViewer
