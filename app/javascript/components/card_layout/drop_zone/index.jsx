import React    from 'react';
import Style    from './style.sass';
import Dropzone from 'react-dropzone';

const LayoutDropZone = props => {

  return(
    <div className={ `u-mt-20 ${ Style.Template }` }>
      <div className={ Style.TemplateInfo }>
        <div className={ Style.TemplateInfo__eyecatch }>
          <Dropzone onDrop={ props.addLayout }>
            {({ getRootProps, getInputProps }) => (
              <div { ...getRootProps() } className={ Style.Template__dropzone }>
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

export default LayoutDropZone;