import React, { Fragment, useEffect, useState, useRef } from 'react';
import Style from './style.sass';

// import ライブラリ
import CompanySearch from './search/company';
import LayoutSearch  from './search/layout';
import LayoutTable   from './layout/table';
import Loading       from '../loading';

const Index = props => {
  
  const title_ref = useRef(null);
  
  const loading_ref = useRef(null)
  
  const init = {
    company: props.company || '',
    heads: props.heads,
    tails: props.tails
  };
  
  const [state, setState] = useState(init);
  
  useEffect(() => {
  }, [props]);
  
  // 検索した会社を反映
  const applyCompany = company => setState({ ...state, company: company });
  
  // 検索したレイアウトを反映
  const applyLayout = layout => {
    
    if(layout.status === 'head') {
      
      const parse_heads = JSON.parse(JSON.stringify(state.heads));
      parse_heads.push({ ...layout, id: '', card_template_id: props.card_template_id, card_layout_id: layout.id, layout_name: layout.name, status: layout.status });
      setState({ ...state, heads: parse_heads });
    };
    
    if(layout.status === 'tail') {
      
      const parse_tails = JSON.parse(JSON.stringify(state.tails));
      parse_tails.push({ ...layout, id: '', card_template_id: props.card_template_id, card_layout_id: layout.id, layout_name: layout.name, status: layout.status });
      setState({ ...state, tails: parse_tails });
    };
  };
  
  // レイアウトの紐付けを解除
  const unlinkLayout = (status, num) => {
  
    if(status === 'head') {
      
      const fil_heads = [];
      state.heads.map((head, index) => {
        
        if(index == num) fil_heads.push({ ...head, _destroy: '1' })
        if(index != num) fil_heads.push(head);
      });
      
      setState({ ...state, heads: fil_heads });
    };
    
    if(status === 'tail') {
      
      const fil_tails = [];
      state.tails.map((tail, index) => {
    
        if(index == num) fil_tails.push({ ...tail, _destroy: '1' })
        if(index != num) fil_tails.push(tail);
      });
  
      setState({ ...state, tails: fil_tails });
    };
  };
  
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
    
    state.heads.map(head => {

      field.append('card_template[template_layouts_attributes][][id]', head.id);
      field.append('card_template[template_layouts_attributes][][card_template_id]', head.card_template_id);
      field.append('card_template[template_layouts_attributes][][card_layout_id]', head.card_layout_id);
      field.append('card_template[template_layouts_attributes][][status]', head.status);
      if(head._destroy) field.append('card_template[template_layouts_attributes][][_destroy]', head._destroy);
    });
  
    state.tails.map(tail => {
    
      field.append('card_template[template_layouts_attributes][][id]', tail.id);
      field.append('card_template[template_layouts_attributes][][card_template_id]', tail.card_template_id);
      field.append('card_template[template_layouts_attributes][][card_layout_id]', tail.card_layout_id);
      field.append('card_template[template_layouts_attributes][][status]', tail.status);
      if(tail._destroy) field.append('card_template[template_layouts_attributes][][_destroy]', tail._destroy);
    });
  
    const request = props.new_record_type ? window.xhrRequest.post(props.action, field) : window.xhrRequest.put(props.action, field);
    request.then(res => {
      
      const redirect = () => location.href = '/card_templates/' + res.data.card_template.id + '/edit';
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
  
      <div className='u-mt-30'>
        <div>
          <label className='c-form-label'>| 表面</label>
        </div>
        <LayoutSearch applyLayout={ applyLayout } status='head'/>
        <LayoutTable unlinkLayout={ unlinkLayout } template_layouts={ state.heads } status={ 'head' }/>
      </div>
  
      <div className='u-mt-30'>
        <div>
          <label className='c-form-label'>| 裏面</label>
        </div>
        <LayoutSearch applyLayout={ applyLayout } status='tail'/>
        <LayoutTable unlinkLayout={ unlinkLayout } template_layouts={ state.tails } status={ 'tail' }/>
      </div>
  
  
      <div className={ Style.CardTemplate__overlay }>
        <button className='c-btnMain-standard' onClick={ saveCardTemplate }>保存する</button>
      </div>
      
      <Loading ref={ loading_ref }/>
    </Fragment>
  );
};

export default Index;