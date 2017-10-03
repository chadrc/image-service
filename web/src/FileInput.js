import React from 'react';

const FileInput = ({className, input, imgRef, value, onChange}) => (
    <label className={`file-input${className ? " " + className : ""}`}>
        {value ? (
            <img className="file-input-img" ref={imgRef} />
        ) : (
            <input name={input.name}
                   onChange={(event) => {
                       onChange(event);
                   }}
                   onBlur={input.onBlur}
                   onFocus={input.onFocus}
                   multiple={false}
                   type="file"/>
        )}
    </label>
);

class FileInputContainer extends React.Component {
    imgRef(img) {
        this.img = img;
    }

    onChange(event) {
        let file = null;
        if (event.target.files
            && event.target.files.length === 1) {
            file = event.target.files[0];
        }
        this.props.input.onChange(file);
    }

    get value() {
        let value = null;
        if (this.props.input.value
            && this.props.input.value.name) {
            value = this.props.input.value;
        }
        return value
    }

    render() {
        return (
            <FileInput {...this.props}
                       value={this.value}
                       onChange={(event) => this.onChange(event)}
                       imgRef={(img) => this.imgRef(img)}/>
        );
    }

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        if (this.value && this.img) {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
                this.img.src = reader.result;
            }, false);
            reader.readAsDataURL(this.value)
        }

        console.log(this.props.input.name);
        console.log(this.value);
    }
}

export default FileInputContainer;