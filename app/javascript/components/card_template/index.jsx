import React, { Fragment, useEffect, useState, useRef } from 'react';
import Style from './style.sass';

// import ライブラリ
import CompanySearch from './company/search';
import Loading       from '../loading';

const Index = props => {
  
  const title_ref = useRef(null);
  
  const loading_ref = useRef(null)
  
  const init = {
    layouts: props.layouts,
    company: props.company || '',
    heads: props.heads,
    tails: props.tails
  };
  
  const [state, setState] = useState(init);
  
  useEffect(() => {
  }, [props]);
  
  const applyCompany = company => setState({ ...state, company: company });
  
  const saveCardTemplate = e => {
    
    e.preventDefault();
    
    if(!title_ref.current.value) {
      
      window.alertable({ icon: 'info', message: 'テンプレート名を入力してください。' });
      return;
    };
    
    if(!state.company) {
      
      window.alertable({ icon: 'info', message: '取引先を選択してください。' })
      return;
    };
  
    const field = new FormData();
    
    field.append('card_template[name]', title_ref.current.value);
    field.append('card_template[company_id]', state.company.id);
    
    const request = props.new_record_type ? window.xhrRequest.post(props.action, field) : window.xhrRequest.put(props.action, field);
    request.then(res => {
      
      const redirect = () => location.href = '/card_template/edit/' + res.card_template.id;
      window.alertable({ icon: res.data.status, message: 'テンプレートを作成しました。', close_callback: () => props.new_record_type ? redirect() : null });
    }).catch(err => window.alertable({ icon: 'error', message: 'テンプレート作成に失敗しました。', close_callback: () => console.log(err) }));
  };
  
  return(
    <Fragment>
      
      <div className='u-mt-20'>
        <label name='template_name' className='c-form-label'>テンプレート名</label>
        <input type='text' name='template_name' className='c-form-text' ref={ title_ref } defaultValue={ props.card_template ? props.card_template.name : '' } placeholder='テンプレテンプレ'/>
      </div>
      
      <div className='u-mt-20'>
        <div className='c-form-label'>
          <label>お客様情報</label>
        </div>
        <div className='c-attention'>
          <div>{ state.company ? state.company.name || '会社名なし' : '会社はまだ選択されていません。' }</div>
        </div>
      </div>
      
      <CompanySearch applyCompany={ applyCompany }/>
  
      <div className={ Style.CardTemplate__overlay }>
        <button className='c-btnMain-standard' onClick={ saveCardTemplate }>保存する</button>
      </div>
      
      <Loading ref={ loading_ref }/>
    </Fragment>
  );
};

export default Index;