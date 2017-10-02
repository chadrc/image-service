import React from 'react';

const FileInput = ({className, multiple, input}) => (
    <input className={className}
           name={input.name}
           onChange={(event) => {
               console.dir(event.target);
               input.onChange(event.target.files)
           }}
           onBlur={input.onBlur}
           onFocus={input.onFocus}
           multiple={multiple}
           type="file"/>
);

export default FileInput;