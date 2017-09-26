import React, {Component} from 'react';
import Globals from './Globals';

class ImageEditView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageLoaded: false
        };
    }

    set image(img) {
        if (img === null) {
            return;
        }
        this._image = img;
    }

    get image() {
        return this._image;
    }

    onImageLoad() {
        this.setState({
            imageLoaded: true
        });
    }

    render() {
        let width = this.image ? this.image.width : 0;
        let height = this.image ? this.image.height : 0;
        let image=this.props.image;
        let currentWidth=width;
        let currentHeight=height;

        return (
            <div>
                <button type="button" className="btn btn-info mb-2" onClick={() => this.props.onBackButtonClicked()}>
                    Back
                </button>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Edit Image</h3>
                    </div>
                    <div className="card-block">
                        <div className="row">
                            <div className="col-sm-3">
                                <form onSubmit={(event) => this.props.onSubmit(event)}>
                                    <section className="form-group">
                                        <label htmlFor="imageName">Name</label>
                                        <input id="imageName" name="name" className="form-control-file" />
                                    </section>
                                    <div className="form-group">
                                        <label>Size</label>
                                        <div>
                                            <p className="form-control-static">{image.size}</p>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-primary">Save</button>
                                </form>
                            </div>
                            <div className="col-sm-9">
                                <div className="pos-rel">
                                    <img onLoad={() => this.onImageLoad()}
                                         ref={(img) => this.image = img}
                                         className="w-100"
                                         src={`${Globals.ImageUrl}/${image.name}`} />
                                    {image.focalPoints.map((point, index) => {
                                        return (
                                            <div key={image.name + "-fp-" + index}
                                                 className="pos-abs dot" style={{
                                                top: point.y * currentHeight,
                                                left: point.x * currentWidth
                                            }}/>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        if (this.canvas) {
            console.log(this.canvas);
        }
    }
}

export default ImageEditView;