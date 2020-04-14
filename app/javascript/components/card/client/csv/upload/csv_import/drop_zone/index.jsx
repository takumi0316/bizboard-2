import React, { useCallback } from 'react';
import Style                  from './style.sass';
import { useDropzone }        from 'react-dropzone';

const DropZone = props => {

  const onDrop = useCallback(acceptedFiles => {

    if(acceptedFiles.length == 0) window.alertable({ icon:'error', message: 'このファイルタイプはアップロードできません。'});
    if(acceptedFiles.length == 1) props.parseCSV(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({ onDrop: onDrop, accept: 'text/csv, application/vnd.ms-excel' });

  return(
    <div className={ Style.Template}>
      <div className={ Style.TemplateInfo }>
        <div className={ Style.TemplateInfo__eyecatch }>
          <div { ...getRootProps() } className={Style.Template__dropzone}>
            <input { ...getInputProps() }/>
            { !isDragActive && 'この部分にCSVをドラッグ&ドロップしてください' }
            { isDragReject && 'このファイルタイプはアップロードできません。' }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
