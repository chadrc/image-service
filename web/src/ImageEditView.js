import React, {Component} from 'react';
import Globals from './Globals';

const View = ({image, onImageLoad, setImage, onSubmit, onBackButtonClicked, currentWidth, currentHeight}) => (
    <div>
        <button type="button" className="btn btn-info mb-2" onClick={() => onBackButtonClicked()}>
            Back
        </button>
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Edit Image</h3>
            </div>
            <div className="card-block">
                <div className="row">
                    <div className="col-sm-3">
                        <form onSubmit={(event) => onSubmit(event)}>
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
                            <img onLoad={() => onImageLoad()}
                                 ref={(img) => setImage(img)}
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
        return <View image={this.props.image}
                     currentWidth={width}
                     currentHeight={height}
                     setImage={(img) => this.image = img}
                     onImageLoad={() => this.onImageLoad()}
                     onSubmit={(event) => this.props.onSubmit(event)}
                     onBackButtonClicked={() => this.props.onBackButtonClicked()}/>;
    }

    componentDidUpdate() {
        if (this.canvas) {
            console.log(this.canvas);
        }
    }
}

export default ImageEditView;