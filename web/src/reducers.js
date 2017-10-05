import {ajax} from 'rxjs/observable/dom/ajax';

import {mergeMap} from 'rxjs/add/operator/mergeMap';
import {map} from 'rxjs/add/operator/map';

import Globals from "./Globals";
import Store from "./Store";

const UPLOAD_IMAGES = "UPLOAD_IMAGES";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const IMAGE_UPLOADED = "IMAGE_UPLOADED";
const IMAGES_UPLOADED = "IMAGES_UPLOADED";

const uploadImagesEpic = (action$) => (
    action$.ofType(UPLOAD_IMAGES)
        .mergeMap((action => {
                let uploads = action.images.slice();
                let nextAction = IMAGES_UPLOADED;
                if (uploads.length > 1) {
                    nextAction = UPLOAD_IMAGES;
                }

                let image = uploads.shift();
                let data = new FormData();
                if (!image.image) {
                    throw new Error("Must provide an image file to upload.");
                }
                data.append("image", image.image);
                if (image.directory) {
                    data.append("directory", image.directory );
                }
                if (image.name) {
                    data.append("name", image.name);
                }
                return ajax.post(`${Globals.ApiUrl}/image`, data, {})
                    .map(response => ({type: nextAction, images: uploads}));
            }
        ))
);

const imageService = (state = {
    loadingImages: false,
    uploadingImage: false,
    dirInfo: {
        name: null,
        path: null,
        items: []
    }
}, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "DIRECTORY_RECEIVED":
            newState.loadingImages = false;
            newState.dirInfo = action.dirInfo;
            return newState;
        case "FETCH_DIRECTORY":
            let path = action.path;
            newState.loadingImages = true;
            fetch(`${Globals.ApiUrl}/m/${path}`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => response.json())
                .then((data) => {
                    Store.store.dispatch({
                        type: "DIRECTORY_RECEIVED",
                        dirInfo: data
                    });
                });
            return newState;
        case "ADD_DIRECTORY":

            return newState;
        case UPLOAD_IMAGES:
            console.log("upload images");
            return newState;
        case UPLOAD_IMAGE:
            console.log("upload image");
            newState.uploadingImage = true;
            return newState;
        case IMAGE_UPLOADED:
            console.log("image uploaded");
            newState.uploadingImage = false;
            return newState;
        case IMAGES_UPLOADED:
            console.log("images uploaded");
            return newState;
        default:
            return state;
    }
};

export default {
    reducers: {
        imageService: imageService,
    },
    epics: [
        uploadImagesEpic
    ]
}