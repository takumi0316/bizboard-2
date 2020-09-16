import React from 'react';

// React Component
import DatetimePicker from '../datetime_picker';
// datetime
import Dayjs from 'dayjs';

import {
  QUOTE_TYPES,
  CHANNELS
} from '../properties.es6';

const CaseDetails = (props) => {

  return(
    <div className='u-mt-30 c-table'>
      <table>
        <tbody>
          <tr>
            <td className='u-fw-bold'>案件作成日</td>
            <td>
              <span className='u-mr-30'>{ props.date ? Dayjs(props.date).format('YYYY年MM月DD日') : '未定' }</span>
              <DatetimePicker apply={ props.setDate } defaultDatetime={ props.date } />
            </td>
          </tr>
          <tr>
            <td className='u-fw-bold'>見積もり発行日</td>
            <td>
              <span className='u-mr-30'>{ props.issues_date ? Dayjs(props.issues_date).format('YYYY年MM月DD日') : '未定' }</span>
              <DatetimePicker apply={ props.setIssuesDate } defaultDatetime={ props.issues_date } />
            </td>
          </tr>
          <tr>
            <td className='u-fw-bold'>見積もり有効期間</td>
            <td>
              <span className='u-mr-30'>{ props.expiration ? Dayjs(props.expiration).format('YYYY年MM月DD日') : '未定' }</span>
              <DatetimePicker apply={ props.setExpiration } defaultDatetime={ props.expiration } />
            </td>
          </tr>
          <tr>
            <td className='u-fw-bold'>納品日</td>
            <td>
              <span className='u-mr-30'>{ props.delivery_note_date ? Dayjs(props.delivery_note_date).format('YYYY年MM月DD日') : '未定' }</span>
              <DatetimePicker apply={ props.setDeliveryNoteDate } defaultDatetime={ props.delivery_note_date } />
            </td>
          </tr>
          <tr>
            <td className='u-fw-bold'>
              納期
              <br></br>
              <span>※製作発送の場合は出荷日を入力</span>
            </td>
            <td>
              <span className='u-mr-30'>{ props.deliver_at ? Dayjs(props.deliver_at).format('YYYY年MM月DD日 HH時mm分') : '未定' }</span>
              <DatetimePicker apply={ props.setDeliverAt } defaultDatetime={ props.deliver_at } />
            </td>
          </tr>
          <tr>
            <td className='u-fw-bold'>納品方法</td>
            <td>
              <div className='u-mt-15'>
                <label className='c-form-radioLabel'>
                  <input type='radio' value='seat' checked={ props.deliver_type === 'seat' } onChange={ e => props.setDeliverType(e.target.value) } className='c-form-radio' />
                  <i className='c-form-radioIcon' />
                  <span>席まで配達</span>
                </label>
                <label className='c-form-radioLabel u-ml-15'>
                  <input type='radio' value='location' checked={ props.deliver_type === 'location'} onChange={ e => props.setDeliverType(e.target.value) } className='c-form-radio' />
                  <i className='c-form-radioIcon' />
                  <span>指定場所に配達</span>
                </label>
                <label className='c-form-radioLabel u-ml-15'>
                  <input type='radio' value='pickup' checked={ props.deliver_type === 'pickup' } onChange={ e => props.setDeliverType(e.target.value) } className='c-form-radio' />
                  <i className='c-form-radioIcon' />
                  <span>引取り</span>
                </label>
                <label className='c-form-radioLabel u-ml-15'>
                  <input type='radio' value='bizstant' checked={ props.deliver_type === 'bizstant' } onChange={ e => props.setDeliverType(e.target.value) } className='c-form-radio' />
                  <i className='c-form-radioIcon' />
                  <span>ビジスタント部</span>
                </label>
                <label className='c-form-radioLabel u-ml-15'>
                  <input type='radio' value='other' checked={ props.deliver_type === 'other' } onChange={ e => props.setDeliverType(e.target.value) } className='c-form-radio' />
                  <i className='c-form-radioIcon' />
                  <span>その他</span>
                </label>
              </div>
              <div className='u-mt-15'>
                { props.deliver_type === 'location' || props.deliver_type === 'other' ?
                  <textarea placeholder='納品方法を記入てください' className='c-form-textarea' row={5} autoComplete='off' spellCheck='false' type='text' defaultValue={ props.deliver_type_note } onBlur={ e => props.setDeliverTypeNote(e.target.value) }></textarea>
                  : null
                }
              </div>
            </td>
          </tr>
          <tr>
            <td className='u-fw-bold'>受注経路</td>
            <td>
              <div className='c-form-selectWrap'>
                <select className='c-form-select' defaultValue={ props.channel } onChange={ e => props.setChannel(e.target.value) }>
                  { Object.keys(CHANNELS).map((item, index) => {

                    const key = 'channel-'+index;
                    return (
                      <option {...{key}} value={CHANNELS[item]}>{item}</option>
                    );
                  })}
                </select>
              </div>
            </td>
          </tr>
          { props.show_quote_number ?
            <tr>
              <td className='u-fw-bold'>案件番号</td>
              <td>
                <textarea placeholder='BPR・ERP番号入れてね' className='c-form-text' type='text' onChange={ e  => props.setQuoteNumber(e.target.value) } defaultValue={ props.quote_number }></textarea>
              </td>
            </tr>
            : null
          }
          { props.show_quote_number ?
            <tr>
              <td className='u-fw-bold'>合計金額 ※金額を入力する場合は品目は選択しないでください</td>
              <td>
                <textarea placeholder='BPRとERPで確定した金額を入力してください' className='c-form-text' onChange={ e => props.setTemporaryPrice(e.target.value) } type='text' defaultValue={ props.temporary_price } />
              </td>
            </tr>
            : null
          }
          <tr>
            <td className='u-fw-bold'>受注方法</td>
            <td>
              <div className='u-mt-15'>
                <label className='c-form-radioLabel'>
                  <input type='radio' value='acceptance' checked={ props.reception === 'acceptance' || props.reception === null } onChange={ e => props.setReception(e.target.value) } className='c-form-radio' />
                  <i className='c-form-radioIcon'/>
                  <span>受付</span>
                </label>
                <label className='c-form-radioLabel u-ml-15'>
                  <input type='radio' value='mail' checked={ props.reception === 'mail' } onChange={ e => props.setReception(e.target.value) } className='c-form-radio'/>
                  <i className='c-form-radioIcon'/>
                  <span>メール</span>
                </label>
                <label className='c-form-radioLabel u-ml-15'>
                  <input type='radio' value='delivery' checked={ props.reception === 'delivery' } onChange={ e => props.setReception(e.target.value) } className='c-form-radio'/>
                  <i className='c-form-radioIcon'/>
                  <span>集配</span>
                </label>
                <label className='c-form-radioLabel u-ml-15'>
                  <input type='radio' value='reservation' checked={ props.reception === 'reservation' } onChange={ e => props.setReception(e.target.value) } className='c-form-radio'/>
                  <i className='c-form-radioIcon'/>
                  <span>予約</span>
                </label>
                <label className='c-form-radioLabel u-ml-15'>
                  <input type='radio' value='konpro' checked={ props.reception === 'konpro' } onChange={ e => props.setReception(e.target.value) } className='c-form-radio'/>
                  <i className='c-form-radioIcon'/>
                  <span>コンプロ！</span>
                </label>
                <label className='c-form-radioLabel u-ml-15'>
                  <input type='radio' value='reception_other' checked={ props.reception === 'reception_other' } onChange={ e => props.setReception(e.target.value) } className='c-form-radio'/>
                  <i className='c-form-radioIcon'/>
                  <span>その他</span>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td className='u-fw-bold'>受注区分</td>
            <td>
              <div className='c-form-selectWrap'>
                <select className='c-form-select' defaultValue={ props.quote_type } onChange={ e => props.setQuoteType(e.target.value) }>
                  { Object.keys(QUOTE_TYPES).map((item, index) => {

                    const key = 'quote_type-'+index;
                    return (
                      <option {...{key}} value={QUOTE_TYPES[item]}>{item}</option>
                    );
                  })}
                </select>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CaseDetails;
