import Globals from "./Globals";

import Store from "./Store";

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
        case "UPLOAD_IMAGE":
            fetch(`${Globals.ApiUrl}/image`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json'
                },
                body: action.data
            }).then((response) => {
                return response.text(); // Because of empty response
            }).then((data) => {
                Store.store.dispatch({
                    type: "IMAGE_UPLOADED",
                    data: data
                });
                action.success(data);
            }).catch((err) => {
                action.failure(err);
            });
            newState.uploadingImage = true;
            return newState;
        case "IMAGE_UPLOADED":
            newState.uploadingImage = false;
            return newState;
        default:
            return state;
    }
};

export default {
    imageService: imageService
}