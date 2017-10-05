import React from 'react';

const FileInput = ({
                       className,
                       input,
                       imgRef,
                       inputRef,
                       value,
                       pickImage,
                       onChange
}) => (
    <label className={`file-input${className ? " " + className : ""}`}>
        {value ? (
            <img alt="" className="file-input-img" ref={imgRef} />
        ) : (
            <button type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => pickImage()}>
                Pick
            </button>
        )}
        <input name={input.name}
               ref={inputRef}
               onChange={(event) => {
                   onChange(event);
               }}
               onBlur={input.onBlur}
               onFocus={input.onFocus}
               multiple={false}
               style={{display: "none"}}
               type="file"/>
    </label>
);

class FileInputContainer extends React.Component {
    imgRef(img) {
        this.img = img;
    }

    inputRef(input) {
        this.input = input;
    }

    onChange(event) {
        let file = null;
        if (event.target.files
            && event.target.files.length === 1) {
            file = event.target.files[0];
        }
        this.props.input.onChange(file);
    }

    pickImage() {
        if (this.input) {
            this.input.click();
        }
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
                       pickImage={() => this.pickImage()}
                       inputRef={(input) => this.inputRef(input)}
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
    }
}

export default FileInputContainer;