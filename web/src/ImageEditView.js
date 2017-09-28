import React, {Component} from 'react';
import Globals from './Globals';

const PointRadius = 5;
const PointLineWidth = 1;
const PointDiameter = PointRadius * 2;

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

    onCanvasDown(event) {
        if (!this.canvas) {
            return;
        }

        let canvasBoundingRect = this.canvas.getBoundingClientRect();
        let downX = event.clientX - canvasBoundingRect.left;
        let downY = event.clientY - canvasBoundingRect.top;
        let height = this.canvas.clientHeight;
        let width = this.canvas.clientWidth;
        let selectedPoint = null;
        for (let point of this.props.image.focalPoints) {
            let pointX = width * point.x;
            let pointY = height * point.y;

            let difX = Math.abs(pointX - downX);
            let difY = Math.abs(pointY - downY);

            if (difX <= PointDiameter && difY <= PointDiameter) {
                selectedPoint = point;
            }
        }

        this.setState({
            selectedPoint: selectedPoint
        });
    }

    onCanvasMove(event) {
        if (!this.canvas || !this.state.selectedPoint) {
            return;
        }

        let selectedPoint = this.state.selectedPoint;
        let canvasBoundingRect = this.canvas.getBoundingClientRect();
        let downX = event.clientX - canvasBoundingRect.left;
        let downY = event.clientY - canvasBoundingRect.top;
        let height = this.canvas.clientHeight;
        let width = this.canvas.clientWidth;

        let newX = downX / width;
        let newY = downY / height;

        selectedPoint.x = newX;
        selectedPoint.y = newY;

        this.setState({
            selectedPoint: selectedPoint
        });
    }

    onCanvasUp(event) {
        this.setState({
            selectedPoint: null
        });
    }

    render() {
        let image=this.props.image;

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
                                <div className="image-edit-canvas">
                                    <img onLoad={() => this.onImageLoad()}
                                         alt=""
                                         ref={(img) => this.image = img}
                                         src={`${Globals.ImageUrl}/${image.name}`} />
                                    <canvas ref={(can) => this.canvas = can}
                                            onMouseDown={(event) => this.onCanvasDown(event)}
                                            onMouseMove={(event) => this.onCanvasMove(event)}
                                            onMouseUp={(event) => this.onCanvasUp(event)}/>
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
            let context = this.canvas.getContext('2d');
            let height = this.canvas.clientHeight;
            let width = this.canvas.clientWidth;
            this.canvas.height = height;
            this.canvas.width = width;

            let pointRadius = PointRadius;
            let lineWidth = PointLineWidth;
            context.clearRect(0, 0, width, height);
            for (let point of this.props.image.focalPoints) {
                let pointX = width * point.x;
                let pointY = height * point.y;

                context.beginPath();
                context.arc(pointX, pointY, pointRadius, 0, 2 * Math.PI, false);
                context.fillStyle = '#00FF00';
                context.fill();
                context.lineWidth = lineWidth;
                context.strokeStyle = '#FFFFFF';
                context.stroke();
            }
        }
    }
}

export default ImageEditView;