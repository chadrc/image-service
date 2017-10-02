import React from 'react';

const FileInput = ({className, multiple, input}) => (
    <input className={className}
           name={input.name}
           onChange={(event) => {
               if (event.target.files
               && event.target.files.length === 1) {
                   let file = event.target.files[0];
                   input.onChange(file);
               } else {
                   input.onChange(null);
               }
           }}
           onBlur={input.onBlur}
           onFocus={input.onFocus}
           multiple={false}
           type="file"/>
);

export default FileInput;