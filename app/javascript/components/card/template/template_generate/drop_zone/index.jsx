import React    from 'react';
import Style    from './style.sass';
import Dropzone from 'react-dropzone';

const DropZone = props => {

  return(
    <div className={ Style.Template}>
      <div className={ Style.TemplateInfo }>
        <div className={ Style.TemplateInfo__eyecatch }>
          <Dropzone onDrop={ props.onDrop }>
            {({getRootProps, getInputProps}) => (
              <div { ...getRootProps() } className={Style.Template__dropzone}>
                <input { ...getInputProps() } />
                <p>この部分にテンプレートをドラッグ&ドロップしてください</p>
              </div>
            )}
          </Dropzone>
        </div>
      </div>
    </div>
  );
};

export default DropZone;